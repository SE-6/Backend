import type { RequestHandler } from 'express';
import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export const geminiChat: RequestHandler = async (req, res) => {
  const { prompt } = req.body as { prompt: string };

  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: prompt,
  });

  res.json({ result: response.text });
};
