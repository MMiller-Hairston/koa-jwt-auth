import { Context, Next } from "koa";
import Router, { RouterContext } from "koa-router";
import { User } from "../db/models";

export default async (ctx: Context & RouterContext, next: Next) => {
  const { id } = ctx.state.user.id;
  const { salted_password, ...userData } = await User.query()
    .where("id", id)
    .first();
  ctx.status = 200;
  ctx.body = {
    ...userData,
  };
};
