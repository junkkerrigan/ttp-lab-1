// import path from 'path';
import express from 'express';

const app = express();

app.use(express.static('./dist'));

app.get('/', (req, res) => {
    res.status(200).sendFile('index.html');
});

app.listen(8080);
