import { ObjectId } from "mongodb";
import { votesCollection } from "../database/db.js";
import dayjs from "dayjs";

export async function postVote(req, res) {
  const id = res.locals.id;

  try {
    const newVote = {
      createdAt: dayjs().format(`YYYY/MM/DD HH:mm`),
      choiceId: ObjectId(id),
    };
    await votesCollection.insertOne(newVote);
    return res.sendStatus(201);
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
}
