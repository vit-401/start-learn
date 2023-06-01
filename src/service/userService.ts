import bcrypt from 'bcrypt';
import {User} from "../models/user";
import UserRepository from "../repository/user-repository";
import {jwtService} from "../jwt-service";
import {emailService} from "./emailService";
import {v1} from "uuid";






export default class UserService {
  constructor(private userRepository: UserRepository) {
  }


  async confirmEmail(confirmationCode: string): Promise<User> {
    const user = await this.userRepository.findByConfirmationCode(confirmationCode);
    if (!user) {
      throw new Error('User not found');
    }
    user.emailConfirmation.isConfirmed = true;
    await this.userRepository.update(user);
    return user;
  }

  async authenticate(email: string, password: string): Promise<string> {

    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new Error('User not found');
    }
    const isPasswordValid = await bcrypt.compare(password, user.accountData.hashedPassword);
    if (!isPasswordValid) {
      throw new Error('Invalid password');
    }
    const token = jwtService.createJWT(user);
    return token;
  }

  async createUser(dataUser: { email: string, password: string }): Promise<User> {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(dataUser.password, salt);

    const newUser: User = {
      accountData: {
        ...dataUser,
        hashedPassword,
        saltPassword: salt,
        dateCreated: new Date(),
      },
      emailConfirmation: {
        isConfirmed: false,
        confirmationCode: v1(),
        expirationDate: new Date(),
      }
    };
    try {
      const createdNewUser = await this.userRepository.create(newUser);

      await emailService.sendEmailConfirmationMessage(newUser)
      return createdNewUser;
    } catch (err) {
      console.error(`Failed to create user '${dataUser.email}': ${err}`);
      return Promise.reject(err)
    }
  }
}