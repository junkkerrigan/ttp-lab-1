import express, { Request } from 'express';
import cors from 'cors';

import { models } from '../models';

export const app = express();

app.use(cors());
app.use(express.static('./dist'));

interface RequestWithContext extends Request {
    context: {
        models: typeof models
    }
}

app.use(async (req, res, next) => {
    (req as RequestWithContext).context = {
        models,
    };
    next();
});

app.get('/', (req, res) => {
    res.status(200).sendFile('index.html');
});

app.get('/users', async (req, res) => {
    res.send(await (req as RequestWithContext).context.models.User.findAll());
});