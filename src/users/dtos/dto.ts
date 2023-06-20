import { Types } from "mongoose";

export type PostUserDto = {
  email: string,
  name: string,
  age: number
  id?: number
}


export type UserType = {
  _id?: Types.ObjectId;
  accountData: {
    email: string,
    password: string,
    hashedPassword: string,
    saltPassword: any,
    dateCreated: Date
  },
  emailConfirmation: {
    isConfirmed: boolean,
    confirmationCode: string,
    expirationDate: Date,
  }
}