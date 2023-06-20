import { UserType } from "./dtos/dto";

import { Injectable } from "@nestjs/common";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { User, UserDocument } from "./entities/user.entity";

@Injectable()
export class UserRepository {
  constructor(@InjectModel(User.name) private UserModel: Model<UserDocument>) {
  }

  async delete(id: string): Promise<Boolean> {
    try {
      const result = await this.UserModel.deleteOne({ _id: id });
      return result.deletedCount === 1;
    } catch (err) {
      console.error(`Failed to delete user with id '${id}': ${err}`);
      throw err;
    }
  }

  async findByConfirmationCode(confirmationCode: string): Promise<UserType | null> {
    try {
      const user = await this.UserModel.findOne({ "emailConfirmation.confirmationCode": confirmationCode });
      return user ?? null;
    } catch (err) {
      console.error(`Failed to find user by confirmation code '${confirmationCode}': ${err}`);
      throw err;
    }
  }

  async update(user: UserType): Promise<UserType> {
    try {
      await this.UserModel.updateOne({ _id: user._id }, user);
      return user;
    } catch (err) {
      console.error(`Failed to update user '${user}': ${err}`);
      throw err;
    }
  }

  async findOne(id: string): Promise<UserType | null> {
    try {
      const user = await this.UserModel.findOne({ _id: id });
      return user ?? null;
    } catch (err) {
      console.error(`Failed to find user by id '${id}': ${err}`);
      throw err;
    }
  }

  async findAll() {
    return this.UserModel.find();
  }

  async findByEmail(email: string): Promise<UserType | null> {
    try {
      const user = await this.UserModel.findOne({ "accountData.email": email });
      return user ?? null;
    } catch (err) {
      console.error(`Failed to find user by email '${email}': ${err}`);
      throw err;
    }
  }

  async create(user: UserType): Promise<UserType> {
    try {
      const userExists = await this.findByEmail(user.accountData.email);
      if (userExists) throw new Error(`User with email '${user.accountData.email}' already exists`);

      const createdUser = await this.UserModel.create(user);
      return createdUser;
    } catch (err) {
      return Promise.reject(err);
    }

  }
}