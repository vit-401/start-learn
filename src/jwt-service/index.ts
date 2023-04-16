import * as jwt from 'jsonwebtoken';
import { ObjectId } from 'mongodb';
import {User} from "../models/user";


export class JWTService {
  private secretKey: string = process.env.JWT_SECRET_KEY || 'default-secret';

  public createJWT(user: User): string {
    const payload = { userId: user._id };
    const options = { expiresIn: '1h' };
    return jwt.sign(payload, this.secretKey, options);
  }

  public getUserByToken(token: string): ObjectId | null {
    try {
      const payload = jwt.verify(token, this.secretKey) as { userId: string };
      return new ObjectId(payload.userId);
    } catch {
      return null;
    }
  }
}

export const jwtService = new JWTService();
