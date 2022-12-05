import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const mongoClient = new MongoClient(process.env.MONGO_URI);

try{
    await mongoClient.connect();
} catch (err){
    console.log(err);
}

const db = mongoClient.db("drivencracyDb");

export const pollsCollection = db.collection("polls");
export const choicesCollection = db.collection("choices");
export const votesCollection = db.collection("votes");
export const resultsCollection = db.collection("results");