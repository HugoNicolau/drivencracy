import { choicesSchema } from "../models/choicesModel.js";
import { ObjectId } from "mongodb";
import { pollsCollection } from "../database/db.js";
import { choicesCollection } from "../database/db.js";
import dayjs from "dayjs";

export async function choiceSchemaValidation(req, res, next){

    const choice = req.body;
    const { title, pollId} = choice;

    const { error } = choicesSchema.validate(choice, { abortEarly: false});

    if(error){
        const errors = error.details.map((detail) => detail.message);
        return res.status(400).send(errors);
    }

     if(!pollId){
        return res.sendStatus(404);
     }

    const findPoll = await pollsCollection.findOne({_id:ObjectId(pollId)})
    if(!findPoll){
        return res.sendStatus(404);
    }
    if(!title){
        return res.sendStatus(422);
    }
    const findTitle = await choicesCollection.findOne({title, pollId:pollId})
    if(findTitle){
        return res.sendStatus(409)
    }

    const isExpired = dayjs().isAfter(findPoll.expireAt)
    if(isExpired){
        return res.sendStatus(403);
    }

    res.locals.choice = choice;
    next();
}

export async function getChoiceValidation(req, res, next){

    const id = req.params.id;
    const exists = await pollsCollection.find({_id:ObjectId(id)}).toArray();

    if(!exists){
        return res.sendStatus(404)
    }

    res.locals.id = id;
    next();
}