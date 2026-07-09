import {
  Agent,
  InputGuardrailTripwireTriggered,
  OpenAIChatCompletionsModel,
  run,
  setDefaultOpenAIClient,
  tool,
  type InputGuardrail,
} from '@openai/agents';
import type { RequestHandler } from 'express';
import OpenAI from 'openai';
import z from 'zod';

const client = new OpenAI({
  baseURL: 'http://localhost:11434/v1',
  apiKey: 'ollama',
});

setDefaultOpenAIClient(client);

const model = new OpenAIChatCompletionsModel(client, 'gpt-oss:120b-cloud');

const sendApologyEmailTool = tool({
  name: 'send_apology_email',
  description: 'Prepares and send an apology email to an upset customer',
  parameters: z.object({
    customerEmail: z.string().email(),
    subject: z.string(),
    body: z.string(),
  }),
  execute: async ({ customerEmail, subject, body }) => {
    // a real app would call "nodemailer / sendGrid here"
    const email = {
      to: customerEmail,
      subject,
      body,
      sentAt: new Date().toISOString(),
    };
    console.log('APOLOGY EMAIL PREPARED:', email);
    return {
      success: true,
      message: `Apology email prepeared for: ${customerEmail} `,
    };
  },
});

const checkOrderStatusTool = tool({
  name: 'check_order_status',
  description: 'Look up the status of a customer order by its ID',
  parameters: z.object({
    orderId: z.string().describe('The order ID e.g. O-1234'),
  }),

  execute: async ({ orderId }) => {
    // a real app would query a DB /orders here
    return { orderId, status: 'shipped', carrier: 'DHL', eta: '2 days' };
  },
});

const supportAgent = new Agent({
  name: 'Support Agent',
  instructions: `
  You help customers of a fluffy-pillow shop:

    - Always start with "[Support Agent]"
    - If the user asks about an order gives an order Id, use the check_order_status tool.
    - After using the tool, summarize the result.
    - Be friendly and concise`,
  model,
  tools: [checkOrderStatusTool],
});

const escalationAgent = new Agent({
  name: 'Escalation Agent',
  instructions: `
You handle upset customers.
Always start with "[Escalation Agent]".

Important:
  - If the customer is upset and provides an email address, you MUST call the send_apology_email tool.
  - Do not say the email was prepared unless the tool was actually called.
  - Do not pretend to send or prepare an email in normal text.
  - After the tool returns success, tell the user that the apology email was prepared.

  - If the customer does not provide an email address, apologize and ask for their email address.
  - Be friendly and concise.`,

  model,
  tools: [sendApologyEmailTool],
});

const guardRailAgent = new Agent({
  name: 'Guardrail check',
  instructions: `
  We sell pillows
    - If the input is about pillows, isOffTopic = false, otherwise true.
    - Respond with ONLY the raw JSON object => no markdown, no extra text.`,
  model,
  outputType: z.object({
    isOffTopic: z.boolean(),
    reasoning: z.string().nullish(),
  }),
});

const pillowGuardRail: InputGuardrail = {
  name: 'Pillow topic guardrail',
  execute: async ({ input, context }) => {
    const result = await run(guardRailAgent, input, { context });

    return {
      outputInfo: result.finalOutput,
      tripwireTriggered: result.finalOutput?.isOffTopic ?? false,
    };
  },
};

// the triage
const triageAgent = Agent.create({
  name: 'Triage Agent',
  instructions: `
You are a routing agent only

  - Do not answer the user directly.
  - Do not print tool names.
  - Do not say "[Triage Agent]"
  - Do not say "I will transfer you".

Important: 
  - If the customer is upset, angry, disappointed or complaining, hand off to Escalation Agent.
  - Otherwise, if the message is about pillows, orders, shipping, returns or the pillow shop, hand off to the Support Agent.
  - If its not related to the pillow shop, say exactly: "Sorry, i can only help with pillow-shop questions".
`,
  model,
  inputGuardrails: [pillowGuardRail],
  handoffs: [supportAgent, escalationAgent],
});

export const agentSupport: RequestHandler = async (req, res) => {
  const { prompt } = req.body as { prompt: string };

  try {
    const result = await run(triageAgent, prompt);
    res.json({ result: result.finalOutput });
  } catch (error) {
    if (error instanceof InputGuardrailTripwireTriggered) {
      res
        .status(400)
        .json({ result: 'Sorry, i can only help with pillow question' });
      return;
    }
    throw error;
  }
};
