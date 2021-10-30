import express, { Application } from 'express';

const app: Application = express();
const port = 3001;

app.get('/', (req, res) => {
    res.send('The sedulous hyena ate the antelope!');
});

app.listen(port, () => {
    return console.log(`server is listening on ${port}`);
});
