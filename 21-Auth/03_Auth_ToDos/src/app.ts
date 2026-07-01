import express from 'express';
import '#db'; // connects to MongoDB (don't remove)

const app = express();
const port = 3000;

// TODO: wire up the GLOBAL middleware IN ORDER (must run BEFORE the routes):
//   1) express.json()   -> parses a JSON body into req.body
//   2) cookieParser()   -> parses cookies into req.cookies

// TODO: mount the routers:
//   '/auth'  -> authRouter
//   '/posts' -> postRouter

// TODO: register the errorHandler LAST (after all the routes)

app.listen(port, () =>
  console.log(`📡 Server is running at http://localhost:${port}`),
);
