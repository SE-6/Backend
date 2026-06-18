import express from 'express';

const app = express();

const port = 3000;

app.get('/', (req, res) => res.send('hello'));
app.get('/something', (req, res) => res.send('something'));
app.post('/trypost', (req, res) => res.send('testing post request'));

app.listen(port, () =>
  console.log(`Server is running on port: http://localhost:${port}`),
);
