import { errorHandler } from '#middlewares';
import { claudeRouter, geminiRouter, openAIRouter } from '#routers';
import express from 'express';

const app = express();
const port = 3000;

app.use(express.json());

app.use('/api/openai', openAIRouter);
app.use('/api/gemini', geminiRouter);
app.use('/api/claude', claudeRouter);

app.use(errorHandler);

app.listen(port, () =>
  console.log(`\x1b[31m📡 Server is running at http://localhost:${port}\x1b`),
);
