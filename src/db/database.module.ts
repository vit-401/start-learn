import { Module } from "@nestjs/common";
import { DatabaseConnection } from "./database.providers";
import { MongooseModule } from "@nestjs/mongoose";

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useClass: DatabaseConnection
    })
  ]
})
export class DatabaseModule {
}