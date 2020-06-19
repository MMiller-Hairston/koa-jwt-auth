import Router from 'koa-router';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '../db/models';

const secret = process.env.JWT_SECRET || 'jwt_secret';

export const Login = (router: Router) => {
  router.post('/api/v1/auth/login', async (ctx, next) => {
    const { email, password } = ctx.request.body;
    if (!email || !password) {
      ctx.throw(400, "Parameters 'email' and 'password' are required");
    }
    console.log(password);
    const user = await User.query()
      .where('email', email)
      .first();
    if (!user) {
      ctx.throw(401, 'Invalid email/password combination.');
      return;
    }
    const { salted_password, id, username, full_name } = user;
    console.log(user);
    const match = await bcrypt.compare(password, salted_password);
    if (match) {
      ctx.body = {
        token: jwt.sign(
          {
            data: { id, username, full_name },
            exp: Math.floor(Date.now() / 1000) - 60 * 60
          },
          secret
        )
      };
    } else {
      ctx.throw(401, 'Invalid email/password combination.');
      return;
    }
    next();
  });
};
