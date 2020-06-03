import { Router } from 'express';
import { EventModel } from '../../db/models/EventModel';
import { FindOptions, Op } from 'sequelize';

const router = Router();

router.get('/getByUser', async (req, res) => {
  const { id } = req.context.user;
  const options: FindOptions = {
    where: {
      userId: id,
    },
  };

  const { fields } = req.query;
  if (fields) {
    options.attributes = fields as string[];
  }

  res
    .status(200)
    .send(await req.context.models.Event.findAll<EventModel>(options));
});

router.get('/getByIds', async (req, res) => {
  /* eslint-disable-next-line */
  let { eventId, fields } = req.query;
  if (!Array.isArray(eventId)) {
    eventId = [eventId];
  }

  const options: FindOptions = {
    where: {
      id: {
        [Op.in]: eventId,
      },
    },
  };
  if (fields) {
    options.attributes = fields as string[];
  }

  res
    .status(200)
    .send(await req.context.models.Event.findAll<EventModel>(options));
});

router.post('/', async (req, res) => {
  try {
    const {
      user: { id },
      models: { Event },
    } = req.context;

    await Event.create(
      {
        ...req.body,
        userId: id,
      },
      {
        include: [
          {
            association: Event.associations.User,
          },
        ],
      },
    );

    res.sendStatus(201);
  } catch (e) {
    const message: string = (e.errors?.length && e.errors[0].message) || '';

    if (message.includes('name')) {
      return res.status(400).send('name');
    }
    if (message.includes('description')) {
      return res.status(400).send('description');
    }

    return res.sendStatus(400);
  }
});

export { router as eventsRouter };
