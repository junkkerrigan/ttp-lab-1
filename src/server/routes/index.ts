import { Router } from 'express';

import { usersRouter } from './users';
import { productsRouter } from './products';
import { openSourceProjectsRouter } from './open-source-projects';
import { guildsRouter } from './guilds';
import { companiesRouter } from './companies';
import { eventsRouter } from './events';

const router = Router();

router.use('/users', usersRouter);
router.use('/products', productsRouter);
router.use('/open-source-projects', openSourceProjectsRouter);
router.use('/guilds', guildsRouter);
router.use('/companies', companiesRouter);
router.use('/events', eventsRouter);

export { router as apiRouter };
