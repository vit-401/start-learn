import mongoose from 'mongoose';

export const uri = process.env.mongoURI || 'mongodb://127.0.0.1:27017/myNewDatabase';

export default async function runDB() {
  try {
    await mongoose.connect(uri);
    console.log('Connected to MongoDB database');
  } catch (err) {
    console.error('Failed to connect to MongoDB database', err);
  }
}
