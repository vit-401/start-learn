import {ObjectId} from 'mongodb';
import {RefreshTokenMetadata} from "../models/aurh";
import {AuthMetadataModel} from "../schemas/authMetadata-model";


export default class AuthRepository {
  private collection?: typeof AuthMetadataModel;

  constructor() {
    this.collection = AuthMetadataModel;
  }

  async findDeviceIdByDeviceId(deviceId: string): Promise<RefreshTokenMetadata> {
    try {
      const refreshTokenMetadata = await this.collection?.findOne({deviceId: deviceId})
      if (!refreshTokenMetadata) throw new Error('Failed to find DeviceId by deviceId');
      return refreshTokenMetadata
    } catch (err) {
      console.error(`Failed to find refresh token metadata by user id '${deviceId}': ${err}`);
      throw err;
    }
  }

  async findByUserId(userId: string): Promise<RefreshTokenMetadata | null> {
    try {
      const refreshTokenMetadata = await this.collection?.findOne({userId: new ObjectId(userId)})
      return refreshTokenMetadata ?? null;
    } catch (err) {
      console.error(`Failed to find refresh token metadata by user id '${userId}': ${err}`);
      throw err;
    }
  }

  async findRefreshTokenMetadataByIssuedAt(issuedAt: number): Promise<RefreshTokenMetadata | null> {
    try {
      const refreshTokenMetadata = await this.collection?.findOne({issuedAt: issuedAt})
      return refreshTokenMetadata ?? null;
    } catch (err) {
      console.error(`Failed to find refresh token metadata by user id '${issuedAt}': ${err}`);
      throw err;
    }
  }


  async create(refreshTokenMetadata: RefreshTokenMetadata): Promise<boolean> {
    try {
      const result = await this.collection?.insertMany([refreshTokenMetadata]);
      if (!result) throw new Error('Failed to create refresh token metadata');
      console.log(result)
      return true;
    } catch (err) {
      console.error(`Failed to insert refresh token metadata '${refreshTokenMetadata}': ${err}`);
      throw err;
    }
  }

  async update(refreshTokenMetadata: RefreshTokenMetadata): Promise<boolean> {
    try {
      const result = await this.collection?.updateOne({userId: refreshTokenMetadata.userId}, {$set: refreshTokenMetadata})
      if (!result) throw new Error('Failed to update refresh token metadata');
      return true;
    } catch (err) {
      console.error(`Failed to update refresh token metadata '${refreshTokenMetadata}': ${err}`);
      throw err;
    }
  }


}

