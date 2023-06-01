import {MongoClient, Collection, InsertOneResult, ObjectId} from 'mongodb';
import {User} from '../models/user';
import {db} from "../db";
import {throws} from "assert";
import errorHandler from "../middleware/errorHandler";


export default class UserRepository {
  private collection?: Collection<User>;

  constructor() {
    this.collection = db.collection<User>('users');
  }

  async findByEmail(email: string): Promise<User | null> {
    try {
      const user = await this.collection?.findOne({"accountData.email": email})
      return user ?? null;
    } catch (err) {
      console.error(`Failed to find user by email '${email}': ${err}`);
      throw err;
    }
  }


  async create(user: User): Promise<User> {

    try {
      const userExists = await this.findByEmail(user.accountData.email);
      if (userExists) throw new Error(`User with email '${user.accountData.email}' already exists`);

      const createdUser: InsertOneResult<User> | undefined = await this.collection?.insertOne(user);
      if (!createdUser) return Promise.reject(" ")
      const objectId = new ObjectId(createdUser.insertedId);

      const userData = await this.collection?.findOne({_id: objectId});
      if (!userData) return Promise.reject('Failed to create user')
      return userData;
    } catch (err) {
      return Promise.reject(err)
    }
  }
}

