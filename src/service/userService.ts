import bcrypt from 'bcrypt';
import {User} from "../models/user";
import UserRepository from "../repository/userRepository";
import {jwtReturnData, jwtService} from "../jwt-service";
import {emailService} from "./emailService";
import {v1} from "uuid";
import {WithId} from "mongodb";

const saltRounds = 10;

export default class UserService {
  constructor(private userRepository: UserRepository) {
  }


  async logout(email: string): Promise<User> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new Error('User not found');
    }
    const newUser: User = {
      ...user,
      accountData: {
        ...user.accountData,
        // token: '',
      }
    }
    await this.userRepository.update(newUser);
    return user;
  }

  async refreshJWT(email: string, token: string): Promise<jwtReturnData> {
    const newToken = await jwtService.refreshJWT(token);
    // const newToken = await jwtService.createJWT(user);
    return newToken;
  }

  async recoveryPassword(email: string, password: string): Promise<User> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new Error('User not found');
    }
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);

    const confirmationCode = v1();
    const newUser: User = {
      ...user,
      accountData: {
        ...user.accountData,
        hashedPassword: hashedPassword,
        saltPassword: salt,
        password: password,
      },
      emailConfirmation: {
        expirationDate: new Date(Date.now() + 1000 * 60 * 60 * 24),
        confirmationCode,
        isConfirmed: false,
      },
    }
    const updatedUser = await this.userRepository.update(newUser);
    const emailDara = {
      to: email,
      subject: "Confirmation email",
      html: `<a href=\"http://localhost:3000/auth/confirm-email?token=${confirmationCode}\">Confirm email</a>`,
    }
    await emailService.sendEmail(emailDara.to, emailDara.subject, emailDara.html);
    return updatedUser;
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

  async authenticate(email: string, password: string, deviceId?: string, ip?: string, deviceName?: string): Promise<{
    user: User,
    token: jwtReturnData
  }> {

    const user = await this.userRepository.findByEmail(email);

    if (!user) throw new Error('User not found')
    if (!user.emailConfirmation.isConfirmed) throw new Error('Email not confirmed')


    const isPasswordValid = await bcrypt.compare(password, user.accountData.hashedPassword);
    if (!isPasswordValid) {
      throw new Error('Invalid password');
    }
    const token = await jwtService.createJWT(user, deviceId, ip, deviceName);

    return {token, user};
  }

  async createUser(dataUser: { email: string, password: string }): Promise<User> {
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