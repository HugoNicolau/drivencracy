import dayjs from "dayjs";
import { Router } from "express";
import { ObjectId } from "mongodb";
import { choicesCollection, pollsCollection } from "../database/db.js";



const router = Router();

router.post("/choice", async(req, res) => {
    const choice = req.body;
    const { title, pollId} = choice;

    const findPoll = await pollsCollection.findOne({_id:ObjectId(pollId)})
    if(!findPoll){
        return res.sendStatus(404);
    }
    if(!title){
        return res.sendStatus(422);
    }
    const findTitle = await choicesCollection.findOne({title})
    console.log(findTitle);
    if(findTitle){
        return res.sendStatus(409)
    }

    const isExpired = dayjs().isAfter(findPoll.expireAt)
    if(isExpired){
        return res.sendStatus(403);
    }

    try{
        await choicesCollection.insertOne(choice)
        return res.status(201).send(choice)
    }catch(err){
        console.log(err);
        return res.sendStatus(500);
    }
})

export default router;