import express from 'express';
import '#db';
import { errorHandler, timeLogger } from '#middlewares';
import { blogPostRouter } from '#routers';

const app = express();
const port = 3000;

app.use(express.json()); // parse JSON bodies
app.use(timeLogger);

app.use('/posts', blogPostRouter);

app.use(errorHandler);

app.listen(port, () =>
  console.log(`🚀 Server is running on http://localhost:${port}`),
);
