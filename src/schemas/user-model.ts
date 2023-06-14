import mongoose from 'mongoose';
import {User} from "../models/user";

const userSchema = new mongoose.Schema<User>({
  accountData: {
    email: { type: String, required: true },
    password: { type: String, required: true },
    hashedPassword: { type: String, required: true },
    saltPassword: { type: String, required: true }, // Change the type according to your requirements
    dateCreated: { type: Date, default: Date.now },
  },
  emailConfirmation: {
    isConfirmed: { type: Boolean, default: false },
    confirmationCode: { type: String, required: true },
    expirationDate: { type: Date, required: true },
  },
});

const UserModel = mongoose.model('User', userSchema);

export default UserModel;