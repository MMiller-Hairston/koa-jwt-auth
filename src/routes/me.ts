import Router from 'koa-router';
import { User } from '../db/models';

export const Me = (router: Router) => {
  router.get('/api/v1/me', async (ctx, next) => {
    const { id } = ctx.state.user.id;
    const { salted_password, ...userData } = await User.query()
      .where('id', id)
      .first();
    ctx.status = 200;
    ctx.body = {
      ...userData
    };
  });
};
