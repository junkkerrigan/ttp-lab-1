import { Router } from 'express';

const router = Router();

router.get('/', async (req, res) => {
  // await req.context.models.Guild.create({ name: 'Data science' });
  const { fields } = req.query;
  console.log(fields);
  res.status(200).send(
    await req.context.models.Guild.findAll({
      attributes: fields as string[],
    }),
  );
});

export { router as guildsRouter };
