import express from 'express';
import '#db';
import { postRouter, authRouter, aiRouter } from '#routers';
import { errorHandler } from '#middlewares';
import cookieParser from 'cookie-parser';
// TODO (step 1): import the cors package here

const app = express();
const port = 3000;

// ───────────────────────────────────────────────────────────────────────
// TODO (step 1): CORS
//
// Reminder, what is CORS?
//   Browsers block a page on ONE origin from calling an API on a DIFFERENT
//   origin, unless that API says "it's fine". An "origin" is protocol + host
//   + PORT, so http://localhost:3001 (our Next frontend) and
//   http://localhost:3000 (this server) are DIFFERENT origins. Without CORS
//   the browser will refuse every fetch our frontend makes.
//
//   The cors() middleware adds the response headers that tell the browser
//   "yes, this origin is allowed".
//
// What to do:
//   - app.use(cors({ ... })) BELOW, BEFORE the routes.
//   - origin: 'http://localhost:3001'   (our frontend's origin)
//   - credentials: true                 (so the httpOnly auth cookies can
//                                          travel back and forth)
//
// note: `cors` is already in package.json, just run `npm install`.
// ───────────────────────────────────────────────────────────────────────

app.use(express.json()); // req.body
app.use(cookieParser()); // req.cookie

app.use('/auth', authRouter);
app.use('/posts', postRouter);
app.use('/ai', aiRouter);

app.use(errorHandler);

app.listen(port, () =>
  console.log(`\x1b[31m📡 Server is running at http://localhost:${port}\x1b`),
);
