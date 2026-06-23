import express from 'express';
import '#db';
import { articleRouter, postRouter, userRouter } from '#routers';
import {
  errorHandler,
  maintenanceMode,
  methodLogger,
  payWall,
  timeLogger,
} from '#middlewares';

const app = express();
const port = 3000;

app.use(express.json()); // parses incomming JSON bodies => req.body
// morgan

app.use(timeLogger);
app.use(methodLogger);

// app.use(maintenanceMode);

app.use('/article', articleRouter);
app.use('/users', userRouter);
app.use('/posts', postRouter);

app.use(errorHandler);

app.listen(port, () =>
  console.log(`Server is running on port: http://localhost:${port}`),
);
