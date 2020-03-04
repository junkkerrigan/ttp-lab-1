import express from 'express';
import cors from 'cors';


const app = express();

app.use(cors());
app.use(express.static('./dist'));

app.get('/', (req, res) => {
    res.status(200).sendFile('index.html');
});


export { app };