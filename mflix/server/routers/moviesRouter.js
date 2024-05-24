import express from 'express';
import db from '../db/index.js';

const moviesRouter = express.Router();
const DEFAULT_PAGE_LIMIT = 20;
const DEFAULT_PAGE_NUMBER = 0;

moviesRouter.get('/', async (req,res,next) => {
    if (!db) {
        next('Something really bad happened!');
        return;
    }
    
    const limit = +req.query.limit || DEFAULT_PAGE_LIMIT;
    const page = +req.query.page || DEFAULT_PAGE_NUMBER;
    const cursor = db.collection('movies').find({}).limit(limit).skip(page*limit);
    let moviesList = await cursor.toArray();
    await cursor.close();

    let jsonResponse = {};
    jsonResponse.totalCount = await db.collection('movies').count();
    jsonResponse.page = page;
    jsonResponse.resultCount = Math.min(limit, moviesList.length);
    jsonResponse.data = moviesList;

    res.json(jsonResponse);
});

export default moviesRouter;