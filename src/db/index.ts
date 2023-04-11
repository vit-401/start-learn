import {MongoClient} from "mongodb";

const uri = process.env.mongoURI || 'mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.6.0';
export const client = new MongoClient(uri);
export const db = client.db("myNewDatabase")

export default async function runDB() {



  try {
    await client.connect();
    console.log('Connected to MongoDB database');
    // perform database operations here...
  } catch (err) {
    await client.close();
    console.error(err);
    console.log('Disconnected from MongoDB database');
  }
}