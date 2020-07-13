import { Context, Next } from "koa";
import Router, { RouterContext } from "koa-router";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import jwt from "jsonwebtoken";
import { User } from "../db/models";

const secret = process.env.JWT_SECRET || "jwt_secret";

export default async (ctx: Context & RouterContext, next: Next) => {
  const { email, password, username, full_name } = ctx.request.body;
  if (!email || !password || !username || !full_name) {
    ctx.throw(
      400,
      "The parameters 'email', 'password', 'username', 'full_name' are required."
    );
  }

  const salted_password = await bcrypt.hash(password, 10);
  const user = await User.query()
    .where("username", username)
    .orWhere("email", email)
    .first();
  if (user) {
    ctx.throw(409, "The provided username or email is currently unavailable.");
  }
  const createdUser = await User.query().insert({
    id: process.env.NODE_ENV === "development" ? uuidv4() : undefined,
    email,
    salted_password,
    username,
    full_name,
  });
  ctx.status = 201;
  ctx.body = {
    token: jwt.sign(
      {
        data: {
          id: createdUser.id,
          username: createdUser.username,
          full_name: createdUser.full_name,
        },
      },
      secret,
      { expiresIn: "7d" }
    ),
  };
};
