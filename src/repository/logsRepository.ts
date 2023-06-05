import {Collection, InsertOneResult, ObjectId, WithId} from 'mongodb';
import {User} from '../models/user';
import {db} from "../db";
import {RefreshTokenMetadata} from "../models/aurh";
import {Logs} from "../models/logs";


  class LogsRepository {
  private collection?: Collection<Logs>;

  constructor() {
    this.collection = db.collection<Logs>('logs');
  }

  async findOneByIP(ip: string): Promise<WithId<Logs> | null> {
    try {
      const logs = await this.collection?.findOne({ip: ip})
      return logs ?? null;
    } catch (err) {
      console.error(`Failed to find logs by ip '${ip}': ${err}`);
      throw err;
    }
  }

  async create(logs: Logs): Promise<WithId<Logs>> {
    try {
      const result = await this.collection?.insertOne(logs);
      if (!result) throw new Error('Failed to create logs');
      const logsId = result.insertedId;
      return {...logs, _id: logsId};
    } catch (err) {
      console.error(`Failed to insert logs '${logs}': ${err}`);
      throw err;
    }
  }

  async getAll(): Promise<Logs[]> {
    try {
      const result = await this.collection?.find({}).toArray();
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

  async changeLogById(log: WithId<Logs>): Promise<WithId<Logs>> {
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
