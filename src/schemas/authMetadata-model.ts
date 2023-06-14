import mongoose from "mongoose";
import {RefreshTokenMetadata} from "../models/aurh";

const authMetadataSchema = new mongoose.Schema<RefreshTokenMetadata>({
  userId: {type: mongoose.Schema.Types.ObjectId, required: true},
  issuedAt: {type: Number, required: true},
  deviceId: {type: String, required: true},
  ip: {type: String, required: true},
  deviceName: {type: String, required: true}
})

export const AuthMetadataModel = mongoose.model('AuthMetadata', authMetadataSchema);