import express from 'express';
import '#db';
import { postRouter, userRouter } from '#routers';
import { errorHandler } from '#middlewares';

const app = express();
const port = 3000;

app.use(express.json());

app.use('/auth', userRouter);
app.use('/posts', postRouter);

app.use(errorHandler);

app.listen(port, () =>
  console.log(`\x1b[31m📡 Server is running at http://localhost:${port}\x1b`),
);
