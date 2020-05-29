import { Router } from 'express';

const router = Router();

router.get('/', async (req, res) => {
  res.status(200).send(await req.context.models.Event.findAll());
});

router.post('/', async (req, res) => {
  try {
    await req.context.models.Event.create(req.body);
    res.sendStatus(201);
  } catch ({ message }) {
    res.status(400).send(message);
  }
});

export { router as eventsRouter };
