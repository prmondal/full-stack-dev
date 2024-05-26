import express from 'express';
import db from '../db/index.js';
import { ObjectId } from 'mongodb';

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
    jsonResponse.noOfResults = Math.min(limit, moviesList.length);
    jsonResponse.data = moviesList;

    res.json(jsonResponse);
});

moviesRouter.put('/:id/wish', async (req,res,next) => {
    const result = await db.collection('movies').updateOne({ _id: ObjectId.createFromHexString(req.params.id) }, { $set: { wishlisted: true}});
    if (result.modifiedCount) {
        console.log(`Successfully wished movie with _id: ${req.params.id}`);
        res.sendStatus(200);
    } else {
        console.log("Failed to update.");
        res.sendStatus(500);
    }
});

moviesRouter.put('/:id/unwish', async (req,res,next) => {
    const result = await db.collection('movies').updateOne({ _id: ObjectId.createFromHexString(req.params.id) }, { $set: { wishlisted: false}});
    if (result.modifiedCount) {
        console.log(`Successfully unwished movie with _id: ${req.params.id}`);
        res.sendStatus(200);
    } else {
        console.log("Failed to update.");
        res.sendStatus(500);
    }
});

export default moviesRouter;