import express from 'express';

const app = express();

const port = 3000;

// REST STYLE: POSTS (without DB, just placeholders)
app.get('/posts', (req, res) => res.json({ message: 'GET all posts' }));
app.post('/posts', (req, res) => res.json({ message: 'Create a POST' }));
app.put('/posts/:id', (req, res) => res.json({ message: 'UPDATE a POST' }));

app.get('/posts/:id', (req, res) => {
  const { id } = req.params;

  // const find = User.findByIdDelete(id);
  // res.json({message: 'user was deleted'});

  res.json({ message: `post with ${id} was deleted` });
});

app.delete('/posts/:id', (req, res) =>
  res.json({ message: 'DELETE A POST BY ID' }),
);

// USERS (same principle)
app.get('/users', (req, res) => res.json({ message: 'GET all users' }));
app.get('/users/:id', (req, res) => res.json({ message: 'GET user by ID' }));
app.post('/users', (req, res) => res.json({ message: 'Create a user' }));
app.put('/users/:id', (req, res) =>
  res.json({ message: 'UPDATE an existing user' }),
);
app.delete('/users/:id', (req, res) =>
  res.json({ message: 'DELETE a user by ID' }),
);

app.listen(port, () =>
  console.log(`Server is running on port: http://localhost:${port}`),
);
