import mongoose from "mongoose";
import {Logs} from "../models/logs";

const logsSchema = new mongoose.Schema<Logs>({
  root: {type: String, required: true},
  ip: {type: String, required: true},
  count: {type: Number, required: true}
});

export default  mongoose.model('Logs', logsSchema);