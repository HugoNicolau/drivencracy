import { ObjectId } from "mongodb";
import { pollsCollection } from "../database/db.js";

export async function resultValidation(req, res, next) {
  const id = req.params.id;
  if (!ObjectId.isValid(id)) {
    return res.sendStatus(404);
  }
  const findPoll = await pollsCollection.find({ _id: ObjectId(id) }).toArray();

  if (!findPoll || findPoll.length === 0) {
    return res.sendStatus(404);
  }

  res.locals.id = id;
  next();
}
