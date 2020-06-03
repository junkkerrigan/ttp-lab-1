import express from 'express';
import cors from 'cors';
import jwtAuth from 'express-jwt';

import { models } from '../db';
import { apiRouter, authRouter, registerRouter } from './routers';
import { UserModel } from '../db/models/UserModel';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static('./dist'));

app.use(async (req, res, next) => {
  req.context = {
    ...req.context,
    jwtSecret: process.env.JWT_SECRET || 'MY_JWT_SECRET',
    models,
  };
  next();
});

const injectUserToContext = async (req: express.Request, id: number) => {
  const user = await req.context.models.User.findOne<UserModel>({
    where: {
      id,
    },
  });
  if (!user) {
    throw new Error('No such username');
  }

  req.context = {
    ...req.context,
    user,
  };
};

const secretCallback = async (
  req: express.Request,
  payload: { id: number },
  done: (err: any, secret?: string) => void,
) => {
  try {
    await injectUserToContext(req, payload.id);
    done(null, req.context.jwtSecret);
  } catch (err) {
    done(err);
  }
};

app.use('/_register', registerRouter);
app.use('/_auth', authRouter);
app.use(
  '/_api',
  jwtAuth({
    secret: secretCallback,
    getToken: (req) => req.headers.token,
  }),
  apiRouter,
);

const external = /^\/(?!_)/;
app.get(external, (req, res) => {
  res.status(200).sendFile('index.html', { root: __dirname });
});

export { app };
