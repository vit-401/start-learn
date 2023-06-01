import {MongoClient, Collection, InsertOneResult, ObjectId} from 'mongodb';
import {User} from '../models/user';
import {db} from "../db";
import {throws} from "assert";
import errorHandler from "../middleware/errorHandler";
import {v1} from "uuid";
import {emailService} from "../service/emailService";


export default class UserRepository {
  private collection?: Collection<User>;

  constructor() {
    this.collection = db.collection<User>('users');
  }

  findByConfirmationCode(confirmationCode: string): Promise<User | null> {
    try {
      const user: any = this.collection?.findOne({"emailConfirmation.confirmationCode": confirmationCode})
      return user ?? null;
    } catch (err) {
      console.error(`Failed to find user by confirmation code '${confirmationCode}': ${err}`);
      throw err;
    }
  }

  update(user: User): Promise<User> {
    try {
      const updatedUser = this.collection?.updateOne({_id: user._id}, {$set: user})
      return Promise.resolve(user);
    } catch (err) {
      console.error(`Failed to update user '${user}': ${err}`);
      throw err;
    }
  }
  // async recoveryPassword(email: string): Promise<User> {
  //   const user = await this.userRepository.findByEmail(email);
  //   if (!user) {
  //     throw new Error('User not found');
  //   }
  //   const confirmationCode = v1();
  //   user.emailConfirmation = {
  //     expirationDate: new Date(Date.now() + 1000 * 60 * 60 * 24),
  //     confirmationCode,
  //     isConfirmed: false,
  //   };
  //   await this.userRepository.update(user);
  //   const emailDara = {
  //     to: email,
  //     subject: "Confirmation email",
  //     html: `<a href=\"http://localhost:3000/auth/confirm-email?token=${confirmationCode}\">Confirm email</a>`,
  //   }
  //   await emailService.sendEmail(emailDara.to, emailDara.subject, emailDara.html);
  //   return user;
  // }

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

