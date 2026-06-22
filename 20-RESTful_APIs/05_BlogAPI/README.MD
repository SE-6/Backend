# Express Router, Controllers and a Real API

<details>
<summary>1️⃣ What is the Router?</summary>

## The problem

So far, we've defined all our routes directly in `app.ts`:

```ts
// src/app.ts
app.get('/users', (req, res) => { ... });
app.post('/users', (req, res) => { ... });
app.get('/posts', (req, res) => { ... });
app.post('/posts', (req, res) => { ... });
```

The more routes we add, the messier `app.ts` becomes. We want to split routes up — one file for Users, one for Posts.

---

## The Router — a "mini app"

The `Router` from Express lets us organize routes in a modular way. A Router is essentially a small standalone app that we attach to the main app.

```ts
// src/routes/userRouter.ts
import { Router } from 'express';

const userRouter = Router();

userRouter.get('/', (req, res) => {
  res.json({ message: 'List of users' });
});

userRouter.post('/', (req, res) => {
  res.json({ message: 'User created successfully', user: req.body });
});

export default userRoutes;
```

```ts
// src/routes/index.ts
export { default as userRoutes } from './userRoutes.ts';
```

```ts
// src/app.ts
import express from 'express';
import { userRoutes } from '#routes';

const app = express();
const port = 3000;

// any path starting with /users goes to userRoutes
app.use('/users', userRoutes);

app.listen(port, () => console.log(`Server running on port ${port}`));
```

`app.use('/users', userRoutes)` tells Express: "anything under `/users` is handled by `userRoutes`." A `GET` request to `/users` hits `userRoutes.get('/', ...)`.

---

## Why use a Router?

```
Modularity        → app.ts stays small and readable
Reusability        → routers can be reused across apps
Maintainability     → easier to find and change things when everything is separated
```

</details>

<details>
<summary>2️⃣ Controllers — separating the logic</summary>

## The idea

We don't want logic inside the router itself — only the route definition and which function handles it. The actual logic lives in a **controller**.

```
Router       → "which URL triggers what?"
Controller   → "what actually happens?"
```

---

## Project structure

```
src/
├── app.ts
├── controllers/
│   ├── userController.ts
│   ├── postController.ts
│   └── index.ts
├── routes/
│   ├── userRoutes.ts
│   ├── postRoutes.ts
│   └── index.ts
└── models/
    ├── User.ts
    ├── Post.ts
    └── index.ts
```

---

## Controller — first version (no database yet)

We'll build the structure first with placeholder responses — the real database logic comes right after.

```ts
// src/controllers/userController.ts
import type { RequestHandler } from 'express';

export const getAllUsers: RequestHandler = (req, res) => {
  res.json({ message: 'List of users' });
};

export const getUserById: RequestHandler = (req, res) => {
  const { id } = req.params;
  res.json({ message: `Get user with id ${id}` });
};

export const createUser: RequestHandler = (req, res) => {
  res.json({ message: 'User created successfully', user: req.body });
};

export const updateUser: RequestHandler = (req, res) => {
  const { id } = req.params;
  res.json({ message: `Update user with id ${id}`, updates: req.body });
};

export const deleteUser: RequestHandler = (req, res) => {
  const { id } = req.params;
  res.json({ message: `Delete user with id ${id}` });
};
```

```ts
// src/controllers/index.ts
export * from './userController.ts';
export * from './postController.ts';
```

> `RequestHandler` is the type for an Express route function — `(req, res) => void`. It comes with all the types for `req` and `res` already built in.

---

## Router — connects URL to controller

```ts
// src/routes/userRoutes.ts
import { Router } from 'express';
import {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} from '#controllers';

const userRoutes = Router();

userRoutes.get('/', getAllUsers);
userRoutes.post('/', createUser);
userRoutes.get('/:id', getUserById);
userRoutes.put('/:id', updateUser);
userRoutes.delete('/:id', deleteUser);

export default userRoutes;
```

The router now reads like a list — no logic, just "this URL → this function."

---

## Same thing for Posts

```ts
// src/controllers/postController.ts
import type { RequestHandler } from 'express';

export const getAllPosts: RequestHandler = (req, res) => {
  res.json({ message: 'List of posts' });
};

export const getPostById: RequestHandler = (req, res) => {
  const { id } = req.params;
  res.json({ message: `Get post with id ${id}` });
};

export const createPost: RequestHandler = (req, res) => {
  res.json({ message: 'Post created successfully', post: req.body });
};

export const updatePost: RequestHandler = (req, res) => {
  const { id } = req.params;
  res.json({ message: `Update post with id ${id}`, updates: req.body });
};

export const deletePost: RequestHandler = (req, res) => {
  const { id } = req.params;
  res.json({ message: `Delete post with id ${id}` });
};
```

```ts
// src/routes/postRoutes.ts
import { Router } from 'express';
import {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
} from '#controllers';

const postRoutes = Router();

postRoutes.get('/', getAllPosts);
postRoutes.post('/', createPost);
postRoutes.get('/:id', getPostById);
postRoutes.put('/:id', updatePost);
postRoutes.delete('/:id', deletePost);

export default postRoutes;
```

```ts
// src/routes/index.ts
export { default as userRoutes } from './userRoutes.ts';
export { default as postRoutes } from './postRoutes.ts';
```

---

## Registering everything in app.ts

```ts
// src/app.ts
import '#db'; // database connection — from last session
import express from 'express';
import { userRoutes, postRoutes } from '#routes';

const app = express();
const port = 3000;

// makes req.body readable — without this, req.body is undefined on POST/PUT
app.use(express.json());

app.use('/users', userRoutes);
app.use('/posts', postRoutes);

app.listen(port, () => console.log(`Server running on port ${port}`));
```

> `express.json()` is middleware — it parses incoming JSON bodies before they reach our controller. Without it, `req.body` would be `undefined` on POST/PUT requests.

The whole structure now works — still with placeholder responses. Next, we'll replace the placeholders with real Mongoose queries.

</details>

<details>
<summary>3️⃣ From Placeholders to Real Database Queries</summary>

## What we already know from last session

We've already seen how to do CRUD operations with Mongoose — `User.find()`, `User.create()`, `User.findByIdAndUpdate()` and so on. Now we plug that into our controllers.

---

## userController.ts — with real Mongoose queries

```ts
// src/controllers/userController.ts
import type { RequestHandler } from 'express';
import { User } from '#models';

// GET /users
export const getAllUsers: RequestHandler = async (req, res) => {
  const users = await User.find();
  res.json(users);
};

// GET /users/:id
export const getUserById: RequestHandler = async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id);

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  res.json(user);
};

// POST /users
export const createUser: RequestHandler = async (req, res) => {
  // req.body comes from the JSON body of the request — e.g. from Insomnia
  const newUser = await User.create(req.body);
  res.status(201).json(newUser);
};

// PUT /users/:id
export const updateUser: RequestHandler = async (req, res) => {
  const { id } = req.params;

  const updatedUser = await User.findByIdAndUpdate(id, req.body, {
    new: true, // return the updated document, not the old one
    runValidators: true, // schema validation also runs on updates
  });

  if (!updatedUser) {
    return res.status(404).json({ message: 'User not found' });
  }

  res.json(updatedUser);
};

// DELETE /users/:id
export const deleteUser: RequestHandler = async (req, res) => {
  const { id } = req.params;
  const deletedUser = await User.findByIdAndDelete(id);

  if (!deletedUser) {
    return res.status(404).json({ message: 'User not found' });
  }

  res.json({ message: 'User deleted successfully', user: deletedUser });
};
```

---

## postController.ts — with real Mongoose queries

```ts
// src/controllers/postController.ts
import type { RequestHandler } from 'express';
import { Post } from '#models';

// GET /posts
export const getAllPosts: RequestHandler = async (req, res) => {
  // populate('author', ...) loads the User data instead of just showing the ObjectId
  const posts = await Post.find().populate('author', 'firstName lastName');
  res.json(posts);
};

// GET /posts/:id
export const getPostById: RequestHandler = async (req, res) => {
  const { id } = req.params;
  const post = await Post.findById(id).populate('author', 'firstName lastName');

  if (!post) {
    return res.status(404).json({ message: 'Post not found' });
  }

  res.json(post);
};

// POST /posts
export const createPost: RequestHandler = async (req, res) => {
  const newPost = await Post.create(req.body);
  res.status(201).json(newPost);
};

// PUT /posts/:id
export const updatePost: RequestHandler = async (req, res) => {
  const { id } = req.params;

  const updatedPost = await Post.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!updatedPost) {
    return res.status(404).json({ message: 'Post not found' });
  }

  res.json(updatedPost);
};

// DELETE /posts/:id
export const deletePost: RequestHandler = async (req, res) => {
  const { id } = req.params;
  const deletedPost = await Post.findByIdAndDelete(id);

  if (!deletedPost) {
    return res.status(404).json({ message: 'Post not found' });
  }

  res.json({ message: 'Post deleted successfully', post: deletedPost });
};
```

> The router files (`userRoutes.ts`, `postRoutes.ts`) and `app.ts` stay unchanged — we only swapped out the contents of the controller functions. That's the benefit of separation: the structure stays stable, only the logic changes.

</details>

<details>
<summary>4️⃣ Testing with Insomnia — req.body examples</summary>

## Create a user

```
POST http://localhost:3000/users
```

Body (JSON):

```json
{
  "firstName": "Ada",
  "lastName": "Lovelace",
  "email": "ada@example.com"
}
```

---

## Update a user

```
PUT http://localhost:3000/users/<USER_ID>
```

Body (JSON):

```json
{
  "firstName": "Ada Updated"
}
```

> With `PUT` and `findByIdAndUpdate`, we don't need to send every field — only the ones we want to change.

---

## Create a post

```
POST http://localhost:3000/posts
```

Body (JSON):

```json
{
  "title": "My First Blog Post",
  "body": "This is some content...",
  "author": "<USER_ID>"
}
```

> `author` needs to be a real ObjectId of an existing user — otherwise validation fails (`required: true` in the schema).

---

## Update a post

```
PUT http://localhost:3000/posts/<POST_ID>
```

Body (JSON):

```json
{
  "title": "Updated Title"
}
```

---

## All routes at a glance

```
GET    /users         → all users
GET    /users/:id     → one user
POST   /users         → create a user (body required)
PUT    /users/:id     → update a user (body required)
DELETE /users/:id     → delete a user

GET    /posts         → all posts (with populated author)
GET    /posts/:id     → one post (with populated author)
POST   /posts         → create a post (body required, author = User ObjectId)
PUT    /posts/:id     → update a post (body required)
DELETE /posts/:id     → delete a post
```

---

## Summary

```
Router       → defines which URL triggers which function
Controller   → contains the actual logic (database queries)
Model        → defines the shape of the data (Mongoose schema)

app.ts       → registers all routers with app.use('/path', router)
```

This separation keeps our API organized and easy to extend — new resources (e.g. Comments) follow the same pattern: Model → Controller → Router → register in `app.ts`.

</details>
