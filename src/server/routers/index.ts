import { Router } from 'express';

import { authRouter } from './auth';
import { registerRouter } from './register';
import { usersRouter } from './users';
import { productsRouter } from './products';
import { openSourceProjectsRouter } from './open-source-projects';
import { guildsRouter } from './guilds';
import { companiesRouter } from './companies';
import { eventsRouter } from './events';

const v1Router = Router();

v1Router.use('/users', usersRouter);
v1Router.use('/products', productsRouter);
v1Router.use('/open-source-projects', openSourceProjectsRouter);
v1Router.use('/guilds', guildsRouter);
v1Router.use('/companies', companiesRouter);
v1Router.use('/events', eventsRouter);

const router = Router().use('/v1', v1Router);

export { registerRouter };
export { authRouter };
export { router as apiRouter };
