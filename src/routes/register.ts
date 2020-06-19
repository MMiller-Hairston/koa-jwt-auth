import Router from 'koa-router';
import bcrypt from 'bcrypt';
import { User } from '../db/models';

export const Register = (router: Router) => {
  router.post('/api/v1/auth/register', async (ctx, next) => {
    const { email, password, username, full_name } = ctx.request.body;
    if (!email || !password || !username || !full_name) {
      ctx.throw(
        400,
        "The parameters 'email', 'password', 'username', 'full_name' are required."
      );
      return;
    }

    const salted_password = await bcrypt.hash(password, 10);
    const user = await User.query()
      .where('username', username)
      .orWhere('email', email)
      .first();
    if (user) {
      ctx.throw(
        409,
        'The provided username or email is currently unavailable.'
      );
      return;
    }
    const createdUser = await User.query().insert({
      email,
      salted_password,
      username,
      full_name
    });
    ctx.status = 201;
    ctx.body = {};
    return;
  });
};
