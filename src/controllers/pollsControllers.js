import dayjs from "dayjs";
import { pollsCollection } from "../database/db.js";

export async function postPoll(req, res){
    const { title, expireAt } = req.body
    if(!title){
        return res.status(422).send("Título não pode ser vazio");
    }
  
    try{
        const newPoll = {title:title, expireAt:(!expireAt ? dayjs().add(30, 'day').format(`YYYY/MM/DD HH:mm`) : expireAt )}
        await pollsCollection.insertOne(newPoll)
        return res.status(201).send(newPoll);
    } catch(err){
        console.log(err);
        return res.sendStatus(500);
    }

}