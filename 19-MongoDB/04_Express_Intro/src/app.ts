import { products } from '#data';
import express from 'express';

const app = express();

const port = 3000;

app.get('/products', (req, res) => res.json(products));

app.get('/products/:id', (req, res) => {
  const { id } = req.params;
  //   console.log(id);

  const product = products.find((p) => p.id === Number(id));

  if (!product)
    return res
      .status(404)
      .json({ message: `Product with ${id} was not found` });

  res.json(product);
});

app.all('/test', (req, res) => {
  const { method } = req;

  if (method === 'GET') {
    return res.json({ message: 'GET request on /test}' });
  }

  if (method === 'POST') {
    return res.status(201).json({ message: 'POST request on /test' });
  }

  return res.status(405).json({ message: 'Method not allowed' });
});

app.listen(port, () =>
  console.log(`Server is running on port: http://localhost:${port}`),
);
