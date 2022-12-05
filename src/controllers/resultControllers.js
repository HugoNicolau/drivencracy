import { ObjectId } from "mongodb";
import { choicesCollection, pollsCollection, resultsCollection, votesCollection } from "../database/db.js";

export async function getResult(req, res){

    const id = req.params.id;
    if (!ObjectId.isValid(id)) {
        return res.sendStatus(404);
      }
    const findPoll = await pollsCollection.find({_id:ObjectId(id)}).toArray();

    if(!findPoll){
        return res.sendStatus(404);
    }

    const findChoice = await choicesCollection.find({pollId:id}).toArray();

    
    const findVotes = await votesCollection.find().toArray();
   
    let auxNum = 0;
    let auxTitle;
    for(let i = 0; i<findChoice.length ; i++){
        let cont = 0;
        for(let j = 0; j<findVotes.length; j++){
            if(String(findChoice[i]._id) == String(findVotes[j].choiceId)){
                cont++;
            }
        }
        if(cont>auxNum){
            auxNum = cont;
            auxTitle = findChoice[i].title;
        }
    }
    try{

       
        const result = {_id:findPoll[0]._id, title:findPoll[0].title , expireAt:findPoll[0].expireAt, result:{title:auxTitle, votes: auxNum}}    
        return res.status(200).send(result);
    } catch(err){
        console.log(err);
        return res.sendStatus(500);
    }
}