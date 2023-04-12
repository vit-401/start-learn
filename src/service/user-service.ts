import bcrypt from 'bcrypt';
import {User} from "../models/user";
import UserRepository from "../repository/user-repository";

export class UserService {
  constructor(private userRepository: UserRepository) {}

  async authenticate(email: string, password: string): Promise<User> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new Error('User not found');
    }
    const isPasswordValid = await bcrypt.compare(password, user.hashedPassword);
    if (!isPasswordValid) {
      throw new Error('Invalid password');
    }
    return user;
  }

  async createUser(user: User): Promise<User> {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(user.password, salt);
    const newUser: User = {
      ...user,
      hashedPassword,
      saltPassword: salt,
      dateCreated: new Date(),
    };
    return await this.userRepository.create(newUser);
  }
}