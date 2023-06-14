import {Collection, InsertOneResult, ObjectId, WithId} from 'mongodb';
import {User} from '../models/user';
// import {db} from "../db";
import {RefreshTokenMetadata} from "../models/aurh";
import {Logs} from "../models/logs";
import LogsModel from "../schemas/logs-model";


  class LogsRepository {
  private collection?: typeof LogsModel;

  constructor() {
    this.collection = LogsModel;
    // this.collection = db.collection<Logs>('logs');
  }

  async findOneByIPAndRoot(ip: string, root:string): Promise<Logs | null> {
    try {
      const logs = await this.collection?.findOne({ip: ip, root: root}, {lean: true});
      return logs ?? null;
    } catch (err) {
      console.error(`Failed to find logs by ip '${ip}': ${err}`);
      throw err;
    }
  }

  async create(logs: Logs): Promise<Logs> {
    try {
      const result = await this.collection?.insertMany([logs]);
      if (!result?.length) throw new Error('Failed to create logs');
      return result[0];
    } catch (err) {
      console.error(`Failed to insert logs '${logs}': ${err}`);
      throw err;
    }
  }

  async getAll(): Promise<Logs[]> {
    try {
      const result = await this.collection?.find({});
      if (!result) throw new Error('Failed to get logs');
      return result;
    } catch (err) {
      console.error(`Failed to get logs '${err}`);
      throw err;
    }
  }

  async deleteLogById(logIP: string): Promise<boolean> {
    try {
      const result = await this.collection?.deleteOne({ip: logIP});
      if (!result) throw new Error('Failed to delete log');
      return true;
    } catch (err) {
      console.error(`Failed to delete log '${err}`);
      throw err;
    }
  }

  async changeLogById(log: WithId<Logs>): Promise<Logs> {
    try {
      const result = await this.collection?.updateOne({_id: log._id}, {$set: log});
      if (!result) throw new Error('Failed to change log');
      return {...log};
    } catch (err) {
      console.error(`Failed to change log '${err}`);
      throw err;
    }
  }


}

export default  new LogsRepository();
