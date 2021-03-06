import Koa from "koa";
import Router from "koa-router";
import logger from "koa-logger";
import json from "koa-json";
import bodyparser from "koa-bodyparser";
import jwt from "koa-jwt";

import { Login, Me, Register } from "./routes";

const secret = process.env.JWT_SECRET || "jwt_secret";

const app = new Koa();
const router = new Router();

app.use(async (ctx, next) => {
  return next().catch((err) => {
    if (err.status === 401) {
      ctx.status = 401;
      ctx.body = {
        error: err.originalError ? err.originalError.message : err.message,
      };
    } else {
      throw err;
    }
  });
});

app.use(logger());
app.use(json());
app.use(bodyparser());

app.use(
  jwt({ secret }).unless({
    path: [/^\/api\/v1\/auth/, "/api/v1/"],
  })
);

app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  ctx.set("X-Response-Time", `${ms}ms`);
});

router.get("/api/v1/auth", async (ctx, next) => {
  ctx.body = "Hello";
  await next();
});

router.post("/api/v1/auth/login", Login);
router.post("/api/v1/auth/register", Register);
router.get("/api/v1/me", Me);

app.use(router.routes()).use(router.allowedMethods());

export default app;
