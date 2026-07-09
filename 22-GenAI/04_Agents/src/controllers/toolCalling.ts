import type { RequestHandler } from 'express';
import OpenAI from 'openai';
import type {
  ChatCompletionMessageParam,
  ChatCompletionTool,
} from 'openai/resources';

const client = new OpenAI({
  baseURL: 'http://localhost:11434/v1',
  apiKey: 'ollama',
});

const model = 'gpt-oss:120b-cloud';

const getTime = () => {
  return { now: new Date().toLocaleDateString() };
};

const tools: ChatCompletionTool[] = [
  {
    type: 'function',
    function: {
      name: 'get_time',
      description: 'Get the current time',
      parameters: {
        type: 'object',
        properties: {},
        required: [],
      },
    },
  },
];

export const timeToolCall: RequestHandler = async (req, res) => {
  const { prompt } = req.body as { prompt: string };

  // the conversation starts with users question

  const messages: ChatCompletionMessageParam[] = [
    {
      role: 'system',
      content:
        'You have access to tools. When asked about the date, always call get_time',
    },
    { role: 'user', content: prompt },
  ];

  const first = await client.chat.completions.create({
    model,
    messages,
    tools,
    tool_choice: 'required',
    temperature: 0,
  });

  const reply = first.choices[0]?.message;

  if (!reply?.tool_calls) {
    res.json({ result: reply?.content });
    return;
  }

  messages.push(reply);

  for (const call of reply.tool_calls) {
    if (call.type !== 'function') continue;

    const result = getTime();

    messages.push({
      role: 'tool',
      tool_call_id: call.id,
      content: JSON.stringify(result),
    });
  }

  const second = await client.chat.completions.create({ model, messages });
  res.json({ result: second.choices[0]?.message.content });
};
