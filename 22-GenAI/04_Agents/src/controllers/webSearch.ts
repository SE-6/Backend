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

const model = 'llama3.1:8b';

const webSearch = async ({ query }: { query: string }) => {
  const res = await fetch('https://api.tavily.com/search', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      api_key: process.env.TAVILY_API_KEY,
      query,
    }),
  });

  const data: any = await res.json();
  return { answer: data?.answer, result: data?.results };
};

const tools: ChatCompletionTool[] = [
  {
    type: 'function',
    function: {
      name: 'web_search',
      description: 'search the web',
      parameters: {
        type: 'object',
        properties: {
          query: { type: 'string', description: 'The search query' },
        },
        required: ['query'],
      },
    },
  },
];

export const webSearchToolCall: RequestHandler = async (req, res) => {
  const { prompt } = req.body as { prompt: string };

  const messages: ChatCompletionMessageParam[] = [
    {
      role: 'system',
      content:
        'You are a helpful assitant. If a question needs a websearch, call web_search tool before answering',
    },
    { role: 'user', content: prompt },
  ];

  const first = await client.chat.completions.create({
    model,
    messages,
    tools,
    tool_choice: 'required',
  });

  const reply = first.choices[0]?.message;

  if (!reply?.tool_calls) {
    res.json({ result: reply?.content });
    return;
  }

  messages.push(reply);

  for (const call of reply.tool_calls) {
    if (call.type !== 'function') continue;

    const args = JSON.parse(call.function.arguments) as { query: string };

    const result = await webSearch(args);

    messages.push({
      role: 'tool',
      tool_call_id: call.id,
      content: JSON.stringify(result),
    });
  }

  const second = await client.chat.completions.create({ model, messages });
  res.json({ result: second.choices[0]?.message.content });
};
