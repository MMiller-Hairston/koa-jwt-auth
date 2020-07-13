import { Context, Next } from "koa";
import Router, { RouterContext } from "koa-router";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../db/models";

const secret = process.env.JWT_SECRET || "jwt_secret";

export default async (ctx: Context & RouterContext, next: Next) => {
  const { email, password } = ctx.request.body;
  if (!email || !password) {
    ctx.throw(400, "Parameters 'email' and 'password' are required");
  }
  const user = await User.query().where("email", email).first();
  if (!user) {
    ctx.throw(401, "Invalid email/password combination.");
  }
  const { salted_password, id, username, full_name } = user;
  const match = await bcrypt.compare(password, salted_password);
  if (match) {
    ctx.status = 200;
    ctx.body = {
      token: jwt.sign(
        {
          data: { id, username, full_name },
        },
        secret,
        { expiresIn: "7d" }
      ),
    };
  } else {
    ctx.throw(401, "Invalid email/password combination.");
  }
};
