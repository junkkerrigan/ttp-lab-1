import { Router } from 'express';

const router = Router();

router.get('/', async (req, res) => {
  res.status(200).send(await req.context.models.OpenSourceProject.findAll());
});

export { router as openSourceProjectsRouter };
