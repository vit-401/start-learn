import { Injectable } from '@nestjs/common';
import { MongooseModuleOptions, MongooseOptionsFactory } from '@nestjs/mongoose';

export const uri = process.env.mongoURI || 'mongodb://127.0.0.1:27017/myNewDatabase';

@Injectable()
export class DatabaseConnection implements MongooseOptionsFactory {
  createMongooseOptions(): MongooseModuleOptions {
    return {
      uri: uri,
      // other options...
    };
  }
}