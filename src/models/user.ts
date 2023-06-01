import {ObjectId} from "mongodb";

export type User = {
  _id?: ObjectId;
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
export type DataUserType = { email: string, password: string }
