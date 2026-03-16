import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const uri = process.env.MONGO_URI;
const dbName = process.env.DB_NAME;

let dbConn = null;

export async function getCollection(colllectionName) {
  try {
    const db = await connect();
    const collection = db.collection(colllectionName);
    return collection;
  } catch (error) {
    console.log(error);
  }
}

export async function connect() {
  if (dbConn) return dbConn;
  try {
    const client = new MongoClient(uri);
    dbConn = await client.connect(dbName);
    return dbConn;
  } catch (error) {
    console.log(error)
  }
}
