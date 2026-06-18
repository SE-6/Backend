import express from 'express';

const app = express();

const port = 3000;

app.get('/statuscode', (req, res) => res.status(201).send('ending request'));

app.post('/logger', (req, res) => {
  //   console.log(req);

  const { url, method } = req;

  res.send(`a ${method} request was made to ${url} endpoint`);
});

app.listen(port, () =>
  console.log(`Server is running on port: http://localhost:${port}`),
);
