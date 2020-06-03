import { Router } from 'express';
import { FindOptions } from 'sequelize';
import { GuildModel } from '../../db/models/GuildModel';

const router = Router();

router.get('/', async (req, res) => {
  const options: FindOptions = {};
  const { fields } = req.query;
  if (fields) {
    options.attributes = fields as string[];
  }

  res.status(200).send(await req.context.models.Guild.findAll(options));
});

router.get('/userGuild', async (req, res) => {
  const { guildId } = req.context.user;
  if (!guildId) {
    return res.sendStatus(400);
  }

  const options: FindOptions = {
    where: {
      id: guildId,
    },
  };
  const { fields } = req.query;
  if (fields) {
    options.attributes = fields as string[];
  }

  res.status(200).send(await req.context.models.Guild.findOne(options));
});

router.post('/', async (req, res) => {
  try {
    const {
      user,
      models: { Guild },
    } = req.context;

    const { id } = await Guild.create<GuildModel>(req.body);
    await user.set('guildId', id);
    await user.save();

    res.sendStatus(201);
  } catch (e) {
    const message: string = (e.errors?.length && e.errors[0].message) || '';

    if (message.includes('nameTooLong')) {
      return res.status(400).send('nameTooLong');
    }
    if (message.includes('descriptionTooLong')) {
      return res.status(400).send('descriptionTooLong');
    }
    if (message.includes('name')) {
      return res.status(400).send('name');
    }

    return res.sendStatus(400);
  }
});

export { router as guildsRouter };
