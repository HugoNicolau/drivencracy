import { ObjectId } from "mongodb";
import { choicesCollection, pollsCollection } from "../database/db.js";




export async function postChoice(req, res){
    const choice = res.locals.choice;

    try{
        await choicesCollection.insertOne(choice)
        return res.status(201).send(choice)
    }catch(err){
        console.log(err);
        return res.sendStatus(500);
    }
}


export async function getChoices(req, res){
    const id = res.locals.id;


   
    try{
        const pollChoices = await choicesCollection.find({pollId:id}).toArray();
        if(pollChoices.length<1){
            return res.sendStatus(404);
        }

        return res.status(200).send(pollChoices);
    }   catch(err){
        console.log(err);
        return res.sendStatus(500);
    }
}