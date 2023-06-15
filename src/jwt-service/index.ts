import * as jwt from 'jsonwebtoken';
import {JwtPayload} from 'jsonwebtoken';
import {ObjectId} from 'mongodb';
import {User} from "../models/user";
import AuthRepository from "../repository/authRepository";


export type JwtReturnData = { accessToken: string, refreshToken: string }


const optionsAccessToken = {expiresIn: '10m'};
const optionsRefreshToken = {expiresIn: '1d'};

export class JWTService {
  private secretAccessKey: string = process.env.JWT_SECRET_ACCESS_KEY || 'default-Access-secret';
  private secretRefreshKey: string = process.env.JWT_SECRET_REFRESH_KEY || 'default-Refresh-secret';

  constructor(private authRepository: AuthRepository) {
  }


  public async createJWT(user: User, deviceId?: string, ip?: string, deviceName?: string): Promise<JwtReturnData> {
    const payload = {userId: user._id};


    const accessToken = jwt.sign(payload, this.secretAccessKey, optionsAccessToken);
    const refreshToken = jwt.sign(payload, this.secretRefreshKey, optionsRefreshToken);
    const decodedToken = jwt.decode(refreshToken) as JwtPayload;
    const refreshTokenMetadata = {
      userId: user._id!,
      issuedAt: decodedToken!.iat!,
      deviceId: deviceId,
      ip: ip,
      deviceName: deviceName,
    }

    const existRefreshTokenMetadata = await this.authRepository.findByUserId(user._id!.toHexString());

    if (!existRefreshTokenMetadata) {
      const result = await this.authRepository.create(refreshTokenMetadata)
      if (!result) throw new Error('Failed to create refresh token metadata')
    }
    const result = await this.authRepository.update(refreshTokenMetadata)
    if (!result) throw new Error('Failed to update refresh token metadata')


    return {
      accessToken,
      refreshToken
    }
  }


  /*
  need to create table in db for data session
  RefreshTokenMetadata
  1. userId
  2. issuedAt
  3. deviceId
  4. ip
  5. deviceName
   */


  async refreshJWT(refreshToken: string): Promise<JwtReturnData> {


    const payload = jwt.verify(refreshToken, this.secretRefreshKey) as { userId: string, iat: number }; // undefined | { userId: string, iat:number }
    if (!payload) throw new Error('Invalid token');

    const findedRefreshTokenMetadata = await this.authRepository.findRefreshTokenMetadataByIssuedAt(payload.iat);
    if (!findedRefreshTokenMetadata) throw new Error('refreshTokenMetadata not found by issuedAt');

    const newAccessToken = jwt.sign({userId: payload.userId}, this.secretAccessKey, optionsAccessToken); // undefined | string
    const newRefreshToken = jwt.sign({userId: payload.userId}, this.secretRefreshKey, optionsRefreshToken); // undefined | string

    const decodedToken = jwt.decode(newRefreshToken) as JwtPayload;

    const result = await this.authRepository.update({...findedRefreshTokenMetadata, issuedAt: decodedToken!.iat!});

    return Promise.resolve({accessToken: newAccessToken, refreshToken: newRefreshToken});
  }

  public async getUserByToken(accessToken: string): Promise<ObjectId | null> {
    try {
      const payload = jwt.verify(accessToken, this.secretAccessKey) as { iat: number, userId: string };
      const findedRefreshTokenMetadata = await this.authRepository.findRefreshTokenMetadataByIssuedAt(payload.iat);
      if (!findedRefreshTokenMetadata) throw new Error('refreshTokenMetadata not found by issuedAt');
      if (!payload) {
        throw new Error('Invalid token');
      }
      return new ObjectId(payload.userId);
    } catch {
      return null;
    }
  }
}

export const jwtService = new JWTService(new AuthRepository());
