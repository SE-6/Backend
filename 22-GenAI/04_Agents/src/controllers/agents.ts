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

const assistant = new Agent({
  name: 'Assistant',
  instructions: 'You are a concise, friendly assistant',
  model,
});

export const agentChat: RequestHandler = async (req, res) => {
  const { prompt } = req.body as { prompt: string };

  const result = await run(assistant, prompt);
  res.json({ result: result.finalOutput });
};

// TOOLS
const weatherTool = tool({
  name: 'get_weather',
  description: 'get the current weather for a city',
  parameters: z.object({
    city: z.string().describe('city name e.g. "Berlin"'),
  }),
  execute: async ({ city }) => {
    return { city, tempC: 18, conditions: 'cloudy' };
  },
});

const weatherAgent = new Agent({
  name: 'Weather Agent',
  instructions:
    'Help with weather, use get_weather when the user asks about a city',
  model,
  tools: [weatherTool],
});

export const agentWeather: RequestHandler = async (req, res) => {
  const { prompt } = req.body as { prompt: string };

  const result = await run(weatherAgent, prompt);
  res.json({ result: result.finalOutput });
};
