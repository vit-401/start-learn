import UserModel from '../schemas/user-model';
import {User} from "../models/user";

export default class UserRepository {


  async delete(id: string): Promise<Boolean> {
    try {
      const result = await UserModel.deleteOne({_id: id});
      return result.deletedCount === 1;
    } catch (err) {
      console.error(`Failed to delete user with id '${id}': ${err}`);
      throw err;
    }
  }

  async findByConfirmationCode(confirmationCode: string): Promise<User | null> {
    try {
      const user = await UserModel.findOne({"emailConfirmation.confirmationCode": confirmationCode});
      return user ?? null;
    } catch (err) {
      console.error(`Failed to find user by confirmation code '${confirmationCode}': ${err}`);
      throw err;
    }
  }

  async update(user: User): Promise<User> {
    try {
      await UserModel.updateOne({_id: user._id}, user);
      return user;
    } catch (err) {
      console.error(`Failed to update user '${user}': ${err}`);
      throw err;
    }
  }

  async findByEmail(email: string): Promise<User | null> {
    try {
      const user = await UserModel.findOne({"accountData.email": email});
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

      const createdUser = await UserModel.create(user);
      return createdUser;
    } catch (err) {
      return Promise.reject(err);
    }
  }
}
