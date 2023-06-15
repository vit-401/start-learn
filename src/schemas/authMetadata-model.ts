import mongoose from "mongoose";
import {RefreshTokenMetadata} from "../models/aurh";

const authMetadataSchema = new mongoose.Schema<RefreshTokenMetadata>({
  userId: {type: mongoose.Schema.Types.ObjectId, required: true},
  issuedAt: {type: Number, required: true},
  deviceId: {type: String, required: false},
  ip: {type: String, required: false},
  deviceName: {type: String, required: false}
})

export const AuthMetadataModel = mongoose.model('AuthMetadata', authMetadataSchema);