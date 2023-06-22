import { UserRepository } from "./user.repository";
import { Injectable } from "@nestjs/common";
import { PostUserTSType, UserTSType } from "./type/user";
import { UserPostDto } from "./dtos/UserPostDto";

@Injectable()
export class UserService {
  constructor(protected userRepository: UserRepository) {
  }

  async create(user: UserPostDto) {
    return this.userRepository.create(user);
  }

  async findAll() {
    return this.userRepository.findAll();
  }

  async findOne(id: string) {
    return this.userRepository.findOne(id);
  }

  async update(id: string, updateUserDto: PostUserTSType) {
    // return this.userRepository.update(id, updateUserDto);
  }

  async remove(id: string) {
    // return this.userRepository.remove(id);
  }
}