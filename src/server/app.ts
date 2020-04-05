import express from 'express';
import cors from 'cors';

import { models } from '../models';

export const app = express();

app.use(cors());
app.use(express.static('./dist'));

app.use(async (req, res, next) => {
    req.context = {
        models,
    };
    next();
});

app.get('/', (req, res) => {
    res.status(200).sendFile('index.html');
});

app.get('/users', async (req, res) => {
    res.status(200).send(await req.context.models.User.findAll());
});
