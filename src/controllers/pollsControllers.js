import dayjs from "dayjs";
import { pollsCollection } from "../database/db.js";

export async function postPoll(req, res) {
  const poll = res.locals.poll;
  const { title, expireAt } = poll;

  try {
    const newPoll = {
      title: title,
      expireAt: !expireAt
        ? dayjs().add(30, "day").format(`YYYY/MM/DD HH:mm`)
        : expireAt,
    };
    await pollsCollection.insertOne(newPoll);
    return res.status(201).send(newPoll);
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
}

export async function getPoll(req, res) {
  try {
    const polls = await pollsCollection.find({}).toArray();

    return res.status(200).send(polls);
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
}
