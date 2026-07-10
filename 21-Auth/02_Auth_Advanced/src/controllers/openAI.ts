import OpenAI from 'openai';
import { v2 as cloudinary } from 'cloudinary';
import type { RequestHandler } from 'express';

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export const generateAndStoreImage = async (prompt: string) => {
  const response = await client.images.generate({
    model: 'gpt-image-1',
    prompt: `
    Flat vector illustration blog cover about: ${prompt}. 
    Modern minimalist editorial style, bold flat colors, 
    clean geometric shapes, warm vibrant palette, soft gradients,
    no text, no words.`,
    n: 1,
    size: '1024x1024',
    quality: 'low',
  });

  const b64 = response.data?.[0]?.b64_json;
  //   console.log(b64);

  if (!b64) {
    throw new Error('AI Image generation failed', { cause: { status: 502 } });
  }

  const uploaded = await cloudinary.uploader.upload(
    `data:image/png;base64,${b64}`,
    { folder: 'blogAPI_final' },
  );

  return {
    image_url: uploaded.secure_url,
    image_public_id: uploaded.public_id,
  };
};

export const generateImage: RequestHandler = async (req, res) => {
  const { prompt } = req.body as { prompt: string };

  const { image_url } = await generateAndStoreImage(prompt);
  res.json({ image_url });
};
