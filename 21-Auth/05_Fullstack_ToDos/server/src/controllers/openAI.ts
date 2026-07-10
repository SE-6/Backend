import type { RequestHandler } from 'express';
import OpenAI from 'openai';
import { v2 as cloudinary } from 'cloudinary';

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// POST /ai/chat  → a simple text response
export const responseApi: RequestHandler = async (req, res) => {
  const { prompt } = req.body as { prompt: string };

  const response = await client.responses.create({
    model: 'gpt-4o-mini',
    instructions: 'You are a concise assistant',
    input: prompt,
  });

  res.json({ result: response.output_text });
};

/**
 * Generate an image from a text prompt and store it permanently on Cloudinary.
 * Returns the permanent Cloudinary url + public_id (ready to save on a Post).
 */
export const generateAndStoreImage = async (prompt: string) => {
  // 1) ask OpenAI for an image, gpt-image-* models return BASE64 (b64_json), not a url
  const response = await client.images.generate({
    model: 'gpt-image-1',
    prompt: `Flat vector illustration blog cover about: ${prompt}. Modern minimalist editorial style, bold flat colors, clean geometric shapes, warm vibrant palette, soft gradients, no text, no words.`,
    n: 1,
    size: '1024x1024',
    quality: 'low', // 'low' is much faster & cheaper (bump to 'medium'/'high' for nicer images)
  });

  const b64 = response.data?.[0]?.b64_json;
  if (!b64) {
    throw new Error('AI image generation failed', { cause: { status: 502 } });
  }

  // 2) upload the base64 image straight to Cloudinary (as a data URI) → permanent hosted url
  const uploaded = await cloudinary.uploader.upload(
    `data:image/png;base64,${b64}`,
    { folder: 'recap_posts' },
  );

  return {
    image_url: uploaded.secure_url,
    image_public_id: uploaded.public_id,
  };
};

// POST /ai/image  → standalone demo endpoint for image generation
export const generateImage: RequestHandler = async (req, res) => {
  const { prompt } = req.body as { prompt: string };

  const { image_url } = await generateAndStoreImage(prompt);
  res.json({ image_url });
};
