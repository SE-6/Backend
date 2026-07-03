import type { RequestHandler } from 'express';
import Anthropic from '@anthropic-ai/sdk';

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

export const claudeChat: RequestHandler = async (req, res) => {
  const { prompt } = req.body as { prompt: string };

  const message = await client.messages.create({
    model: 'claude-haiku-4-5-20251001', // fast & cheap
    max_tokens: 1024, // always required
    system: 'You are a concise assistant.', // top-level, not inside messages
    messages: [{ role: 'user', content: prompt }],
  });

  // response text sits inside content[0]
  const text =
    message.content[0]?.type === 'text' ? message.content[0].text : '';
  res.json({ result: text });
};
