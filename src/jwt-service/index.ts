import * as jwt from 'jsonwebtoken';
import {ObjectId, WithId} from 'mongodb';
import {User} from "../models/user";


export type jwtReturnData = { accessToken: string, refreshToken: string }



const optionsAccessToken = {expiresIn: '10m'};
const optionsRefreshToken = {expiresIn: '1d'};

export class JWTService {
  private secretAccessKey: string = process.env.JWT_SECRET_ACCESS_KEY || 'default-Access-secret';
  private secretRefreshKey: string = process.env.JWT_SECRET_REFRESH_KEY || 'default-Refresh-secret';


  public createJWT(user: User): jwtReturnData {
    const payload = {userId: user._id};


    const accessToken = jwt.sign(payload, this.secretAccessKey, optionsAccessToken);
    const refreshToken = jwt.sign(payload, this.secretRefreshKey, optionsRefreshToken);

    return {
      accessToken,
      refreshToken
    }
    // return jwt.sign(payload, this.secretKey, options);
  }

  refreshJWT(refreshToken: string): jwtReturnData {
    const payload = jwt.verify(refreshToken, this.secretRefreshKey) as { userId: string };
    if (!payload) {
      throw new Error('Invalid token');
    }
    const accessToken = jwt.sign(payload, this.secretRefreshKey, optionsRefreshToken);
    return {
      accessToken,
      refreshToken
    }
  }

  public getUserByToken(accessToken: string): ObjectId | null {
    try {
      const payload = jwt.verify(accessToken, this.secretAccessKey) as { userId: string };
      if (!payload) {
        throw new Error('Invalid token');
      }
      return new ObjectId(payload.userId);
    } catch {
      return null;
    }
  }
}

export const jwtService = new JWTService();
