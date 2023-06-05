import {ObjectId} from "mongodb";

export type RefreshTokenMetadata = {
  userId: ObjectId;
  issuedAt: number;
  deviceId?: string;
  ip?: string;
  deviceName?: string;
}