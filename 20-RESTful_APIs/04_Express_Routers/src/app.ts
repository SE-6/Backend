import express from 'express';
import '#db';
import { postRouter, userRouter } from '#routers';

const app = express();

app.use(express.json());

const port = 3000;

app.use('/users', userRouter);
app.use('/posts', postRouter);

app.listen(port, () =>
  console.log(`Server is running on port: http://localhost:${port}`),
);
