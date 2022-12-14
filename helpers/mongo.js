import { MongoClient } from 'mongodb';
import * as dotenv from 'dotenv'
dotenv.config()
let db;
async function initializeClient(){
  const client = await MongoClient.connect(process.env.MONGO);

  return client.db();
}

export default async () => {
  if (!db) {
    db = await initializeClient();
  }

  return db;
};