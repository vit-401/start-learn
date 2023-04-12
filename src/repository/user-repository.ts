import {MongoClient, Collection, InsertOneResult, ObjectId} from 'mongodb';
import {User} from '../models/user';
import {db} from "../db";


export default class UserRepository {
  private collection?: Collection<User>;

  constructor() {
        this.collection = db.collection<User>('users');
  }

  async findByEmail(email: string): Promise<User | null> {
    try {
      const user = await this.collection?.findOne({email});
      return user ?? null;
    } catch (err) {
      console.error(`Failed to find user by email '${email}': ${err}`);
      throw err;
    }
  }

  async create(user: User): Promise<User> {
    try {
      const result: InsertOneResult<User> | undefined = await this.collection?.insertOne(user);
      if (!result) return Promise.reject(" ")
      const objectId = new ObjectId(result.insertedId);

      const userData = await this.collection?.findOne({_id: objectId});
      if (!userData) return Promise.reject('Failed to create user')
      return userData;
    } catch (err) {
      console.error(`Failed to create user '${user.email}': ${err}`);
      throw err;
    }
  }
}
