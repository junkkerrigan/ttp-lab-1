import express from 'express';
import cors from 'cors';

import { models } from '../models';
import { apiRouter } from './routes';

const app = express();

app.use(cors());
app.use(express.static('./dist'));

app.use(async (req, res, next) => {
    req.context = {
        models,
    };
    next();
});

app.use('/api/v1', apiRouter);

app.get('/', (req, res) => {
    res.status(200).sendFile('index.html');
});

export { app };
