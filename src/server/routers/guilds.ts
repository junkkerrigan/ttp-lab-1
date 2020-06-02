import { Router } from 'express';

const router = Router();

router.get('/', async (req, res) => {
  const { fields } = req.query;
  res.status(200).send(
    await req.context.models.Guild.findAll({
      attributes: fields as string[],
    }),
  );
});

export { router as guildsRouter };
