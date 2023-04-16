import {ObjectId} from "mongodb";

export type User = {
  email: string,
  _id?: ObjectId;
  password: string,
  hashedPassword: string,
  saltPassword: any,
  dateCreated: Date
}