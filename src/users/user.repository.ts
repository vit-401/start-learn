import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { User, UserModelType } from "./entities/user.entity";
import { UserTSType } from "./type/user";
import { UserPostDto } from "./dtos/UserPostDto";

@Injectable()
export class UserRepository {
  constructor(@InjectModel(User.name) private UserModel: UserModelType) {
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

  async findByConfirmationCode(confirmationCode: string): Promise<UserTSType | null> {
    try {
      const user = await this.UserModel.findOne({ "emailConfirmation.confirmationCode": confirmationCode });
      return user ?? null;
    } catch (err) {
      console.error(`Failed to find user by confirmation code '${confirmationCode}': ${err}`);
      throw err;
    }
  }

  async update(user: UserTSType): Promise<UserTSType> {
    try {
      await this.UserModel.updateOne({ _id: user._id }, user);
      return user;
    } catch (err) {
      console.error(`Failed to update user '${user}': ${err}`);
      throw err;
    }
  }

  async findOne(id: string): Promise<UserTSType | null> {
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

  async findByEmail(email: string): Promise<UserTSType | null> {
    try {
      const user = await this.UserModel.findOne({ "accountData.email": email });
      return user ?? null;
    } catch (err) {
      console.error(`Failed to find user by email '${email}': ${err}`);
      throw err;
    }
  }

  async create(user: UserPostDto): Promise<UserTSType> {
    try {

      if (await this.UserModel.isUserExisting(user.email)) throw new Error(`User with email '${user.email}' already exists`);

      const createdUser = await this.UserModel.create(user);
      // const test = await this.UserModel.save(createdUser);
      console.log(createdUser);
      return createdUser;
    } catch (err) {
      return Promise.reject(err);
    }

  }
}