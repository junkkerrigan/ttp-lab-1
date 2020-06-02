import express from 'express';
import cors from 'cors';
import jwtAuth from 'express-jwt';

import { models } from '../db';
import { apiRouter, authRouter } from './routers';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static('./dist'));

app.use(async (req, res, next) => {
  req.context = {
    jwtSecret: process.env.JWT_SECRET || 'MY_JWT_SECRET',
    models,
  };
  next();
});

app.use('/_auth', authRouter);
app.use(
  '/_api',
  (...args) => jwtAuth({ secret: args[0].context.jwtSecret })(...args),
  apiRouter,
);

const external = /^(?!\/_)/;
app.get(external, (req, res) => {
  res.status(200).sendFile('index.html', { root: __dirname });
});

export { app };
