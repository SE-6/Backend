import { errorHandler } from '#middlewares';
import { agentRouter } from '#routers';

import express from 'express';

const app = express();
const port = 3000;

app.use(express.json());

app.use('/api/agent', agentRouter);

app.use(errorHandler);

app.listen(port, () =>
  console.log(`\x1b[31m📡 Server is running at http://localhost:${port}\x1b`),
);
