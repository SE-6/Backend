# Auth Day 3 — Your Turn (Zod, Cookies, Refresh & Security)

## Where to start => work in this order

Build bottom-up, so each piece exists before the thing that uses it. Open each file and follow its
`// TODO`s top to bottom.

1. **`src/schemas/`** — `authSchema.ts`, `postSchema.ts`
2. **`src/controllers/`** — `authController.ts`, `postController.ts`
3. **`src/middlewares/`** — `authenticate.ts`, `authorize.ts`, `validateBodyZod.ts`, `refresh.ts`
4. **`src/routers/`** — `authRouter.ts`, `postRouter.ts`
5. **`src/app.ts`** — wire the global middleware + mount the routers

---

## Quick test (Insomnia / Postman)

The cookie jar handles auth for you — no manual `Bearer` header.

1. `POST /auth/register` or `/auth/login` → you get two cookies (access + refresh).
2. `GET /auth/me` → works automatically.
3. Let the access token expire → `/auth/me` returns **401**.
4. `POST /auth/refresh` → new access cookie → `/auth/me` works again, no re-login.
5. `DELETE /auth/logout` → cookies cleared.
