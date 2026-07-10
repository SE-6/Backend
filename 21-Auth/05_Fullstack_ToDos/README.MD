# BlogAPI Frontend Assignment

The BlogAPI is right where we left it, inside the `server/` folder. Nothing to do there except one
small thing (step 1). Now we build a frontend for it with **Next.js** (App Router), and that lives
in `client/`.

The basic UI and styling are already ready, so you can put your full focus on the frontend logic.
The pages and the components are there, and the home page already fetches and shows the posts. So you
start with something on the screen. Your job is to fill the missing logic. Look for the `// TODO`
comments and follow them.

## Run it

Two terminals:

```bash
# terminal 1: the API
cd server
cp .env.example .env     # put your Mongo / OpenAI / Cloudinary values in it
npm install
npm run dev              # http://localhost:3000

# terminal 2: the frontend
cd client
npm install
npm run dev              # http://localhost:3001
```

Open http://localhost:3001. The two apps run on different ports = different origins, so the browser
wont let the frontend call the API until you do the CORS step. That's why it's step 1.

## Do it in this order

here is the whole path, start at the top and
work your way down:

1. `server/src/app.ts` (CORS, the only backend task, do this first)
2. `client/src/context/AuthContext.js` (login / register / logout)
3. just test your Context, no code
4. `client/src/app/actions/posts.js` → `getPost` (opens a single post)
5. `client/src/components/PostActions.js` + `client/src/app/actions/posts.js` (edit & delete)
6. `client/src/app/actions/posts.js` → `createPostAction` (create a post + AI cover)

Now the details for each step:

**1. CORS** in `server/src/app.ts`
Add the `cors` middleware so `localhost:3001` is allowed to talk to the API. The what-and-why is
written in the file. (`cors` is already in package.json, just `npm install`.) After this the posts
should still show up with no CORS error in the console.

**2. Login / Register / Logout** in `client/src/context/AuthContext.js`
This little Context remembers who is logged in. Fill the 4 TODOs (`me`, `login`, `register`,
`logout`). They all call the backend with `credentials:'include'`. The login/register pages and the
navbar are already done, and once the Context works the navbar shows your name on its own.

**3. Check your Context**
Nothing new to write. Just register, you should see your name in the navbar, and logout puts you
back. If yes, your user works everywhere. Keep going.

**4. Single post page** in `client/src/app/actions/posts.js`, the `getPost(id)` function
Every card on the home page links to `/posts/<id>`. That page is built already, it just needs the
fetch. Fill `getPost`, then clicking a card opens the post.

**5. Edit & Delete (owner or admin only)** in `PostActions.js` and `app/actions/posts.js`

- In `components/PostActions.js` decide **who** sees the Edit/Delete buttons (the owner, or an admin).
- In `app/actions/posts.js` fill `updatePostAction` and `deletePostAction`. These are Server Actions,
  they forward the cookie to the API. The edit page + form are already wired.

**6. Create a post (with optional AI cover)** in `app/actions/posts.js`, the `createPostAction`
The create page + form (with the "let AI paint a cover" checkbox) are ready. You write the Server
Action. If the user picked an image we send it, if not the backend makes an AI one from the title
(takes about 15 to 40 seconds, so the button says "Working...").

## Security

- The auth tokens live in **httpOnly cookies**. httpOnly means JS **cannot** read them
  (`document.cookie` sees nothing). So the secret never touches your client code, and that's good.
  Anything that must be secure stays on the server side.
- What we do on the client (hiding the Edit/Delete buttons, bouncing you to /login) is **only for
  UX**, its not real protection. Someone could fake it in the browser.
- The real gate is the **backend middleware** (`authenticate` + `authorize`). Even if someone forces
  the delete button to show, the API still checks the cookie and the owner/admin rule and says no.
  So the client-side checks and the server-side checks do two different jobs, and you need both.

## Done when

1. Register, your name shows in the navbar.
2. Home shows posts, clicking one opens it.
3. Create a post with no image + tick the AI box, after a few seconds you land on it with an AI cover.
4. On your own post you can Edit / Delete, on someone else's you can't.
5. Logout, the Write link and the edit/delete buttons are gone.

<details>

<summary> 🧩🧩🧩 BONUS </summary>

## Bonus: collect your requests (optional)

Once everything works you'll notice the auth calls in `AuthContext.js` keep repeating the same
things: the base url, `credentials:'include'`, the JSON header. You can collect all of that in one
small helper so you dont write it every time.

First `npm install axios` inside `client/`, then make `client/src/lib/api.js`:

```js
import axios from 'axios';

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL, // http://localhost:3000
  withCredentials: true, // same as credentials:'include'
});
```

Now the Context gets a lot shorter:

```js
// instead of the long fetch(...) version:
const { data } = await api.post('/auth/login', { email, password });
setUser(data.user);
```

Heads up: this helper is for the **client side** (the Context, or any `'use client'` component). The
Server Actions in `app/actions/posts.js` stay on `fetch`, because there we forward the cookie by hand
with the `Cookie` header (there's no browser doing it for us).

### Advanced (only if you're curious)

Add a response interceptor that catches a `401`, calls `/auth/refresh`, and retries the request once.
That's exactly the refresh-token flow you built on the backend last week, just living on the frontend
now, so a user with an expired access token doesn't get kicked out.

```js
api.interceptors.response.use(
  (res) => res,
  async (error) => {
    if (error.response?.status === 401 && !error.config._retried) {
      error.config._retried = true;
      await api.post('/auth/refresh'); // get a fresh access cookie
      return api(error.config); // retry the original request
    }
    throw error;
  },
);
```

Prefer not to add a dependency? The same "collect it in one place" idea works with a tiny `fetch`
wrapper, no axios needed. Up to you.

</details>
