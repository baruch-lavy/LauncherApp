import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const uri = process.env.MONGO_URI;
const dbName = process.env.DB_NAME;

let dbConn = null;

export async function getCollection(colllectionName) {
  try {
    const db = await connect();
    const collection = await db.collection(colllectionName);

    if (colllectionName === 'users') {
        collection.createIndex({username: 1}, {unique: true})
    }
   
    return collection;
  } catch (error) {
    console.log('error in getCollection', error.message);
  }
}

export async function connect() {
  if (dbConn) return dbConn;
  try {
    const client = new MongoClient(uri);
    await client.connect()
    dbConn = client.db(dbName);
    return dbConn;
  } catch (error) {
    console.log(error)
  }
}
