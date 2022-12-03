import dayjs from "dayjs";
import { pollsCollection } from "../database/db.js";

export async function postPoll(req, res){
    const { title, expireAt } = req.body
    if(title.length < 1){
        return res.send("Título não pode ser vazio").status(422);
    }
    if(!expireAt){
        expireAt = dayjs().format(`YYYY/MM/DD`).padEnd(30, 'day');
    }

    try{
        const newPoll = {title:title, expireAt:expireAt}
        await pollsCollection.insertOne(newPoll)
        return res.send(newPoll).status(201);
    } catch(err){
        console.log(err);
        return res.sendStatus(500);
    }

}