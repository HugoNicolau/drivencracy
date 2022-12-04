import { choicesCollection, pollsCollection } from "../database/db.js";
import dayjs from "dayjs";
import { ObjectId } from "mongodb";

export async function voteValidation(req, res, next){
    const id = req.params.id;

    const findChoice = await choicesCollection.findOne({_id:ObjectId(id)});
    if(!findChoice){
        return res.sendStatus(404);
    }

    const findPoll = await pollsCollection.find({_id:findChoice.pollId}).toArray();

    const isExpired = dayjs().isAfter(findPoll.expireAt)
    if(isExpired){
        return res.sendStatus(403);
    }

    res.locals.id = id;
    next();

}