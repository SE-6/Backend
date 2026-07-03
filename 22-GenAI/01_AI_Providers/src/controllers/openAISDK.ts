import type { RequestHandler } from 'express';
import OpenAI from 'openai';

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export const responseApi: RequestHandler = async (req, res) => {
  const { prompt } = req.body as { prompt: string };

  const response = await client.responses.create({
    model: 'gpt-4o-mini',
    instructions: 'You are a concise assistant',
    input: prompt,
  });

  res.json({ result: response.output_text });
};

export const generateImage: RequestHandler = async (req, res) => {
  const { prompt } = req.body as { prompt: string };

  const response = await client.images.generate({
    model: 'chatgpt-image-latest',
    prompt,
    n: 1,
    size: 'auto',
  });

  const imageUrl = response.data?.[0]?.url;

  if (!imageUrl) {
    return res.status(500).json({ error: 'Image generation failed' });
  }

  return res.json({ imageUrl });
};
