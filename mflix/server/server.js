import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import moviesRouter from './routers/moviesRouter.js';

const app = express();
const port = 3000;

app.use((req,res,next) => {
    console.log(`[INFO] Request Url: ${req.url}. Method: ${req.method}`);
    next();
});

app.get('/', (req, res, next) => {
    res.send('<h1>I am powered by Express!</h1>');
});

app.use(bodyParser.json());
app.use(cors());
app.use('/movies', moviesRouter);

export const server = app.listen(port, () => {
    console.log(`Server is listening to port ${port}`);
});

export default app;