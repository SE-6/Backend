import express from 'express';
import '#db';
import { postRouter, authRouter } from '#routers';
import { errorHandler } from '#middlewares';
import cookieParser from 'cookie-parser';

const app = express();
const port = 3000;

app.use(express.json()); // req.body
app.use(cookieParser()); // req.cookie

app.use('/auth', authRouter);
app.use('/posts', postRouter);

app.use(errorHandler);

app.listen(port, () =>
  console.log(`\x1b[31m📡 Server is running at http://localhost:${port}\x1b`),
);
