import {
  Agent,
  OpenAIChatCompletionsModel,
  run,
  setDefaultOpenAIClient,
  tool,
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

const supportAgent = new Agent({
  name: 'Support Agent',
  instructions:
    'You help customers of a fluffy-pillow shop. Always start with "[Support Agent]". Be friendly and concise',
  model,
});

const escalationAgent = new Agent({
  name: 'Escalation Agent',
  instructions: `
You handle upset customers.
Always start with "[Escalation Agent]".

If the customer is upset and provides an email address, use the send_apology_email tool.
Write a short, polite apology email.
After using the tool, tell the user that an apology email has been prepared.

If the customer does not provide an email address, apologize and ask for their email address.
Be friendly and concise.
`,
  model,
  tools: [], // sendApologyEmailTool?
});

// the triage
const triageAgent = Agent.create({
  name: 'Triage Agent',
  instructions: `Only handle pillow-shop topics.
    - Alway start with [Triage Agent]:
    - Normal pillow question => hand off to Support Agent.
    - Upset /negative tone => hand off to Escalation Agent.`,
  model,
  handoffs: [supportAgent, escalationAgent],
});

export const agentSupport: RequestHandler = async (req, res) => {
  const { prompt } = req.body as { prompt: string };

  const result = await run(triageAgent, prompt);
  res.json({ result: result.finalOutput });
};

// const sendApologyEmailTool = tool({
//   name: 'send_apology_email',
//   description: 'Prepare and log an apology email for an upset customer',
//   parameters: z.object({
//     customerEmail: z.string().email(),
//     subject: z.string(),
//     body: z.string(),
//   }),
//   execute: async ({ customerEmail, subject, body }) => {
//     const email = {
//       to: customerEmail,
//       subject,
//       body,
//       sentAt: new Date().toISOString(),
//     };

//     console.log('APOLOGY EMAIL PREPARED:');
//     console.log(email);

//     return {
//       success: true,
//       message: `Apology email prepared for ${customerEmail}`,
//       email,
//     };
//   },
// });
