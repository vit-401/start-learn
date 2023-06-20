import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './entities/user.entity';
import { UserService } from './user.service';
import { UserRepository } from './user.repository';
import { UsersController } from './users.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    // other imports...
  ],
  providers: [
    UserService,
    UserRepository,
  ],
  controllers: [UsersController],
  exports: [UserService],  // if you need to use the UserService elsewhere
})
export class UserModule {}
