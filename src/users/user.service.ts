import { UserRepository } from "./user.repository";
import { Injectable } from "@nestjs/common";
import { PostUserDto, UserType } from "./dtos/dto";

@Injectable()
export class UserService {
  constructor(protected userRepository: UserRepository) {
  }

  async create(user: UserType) {
    return this.userRepository.create(user);
  }

  async findAll() {
    return this.userRepository.findAll();
  }

  async findOne(id: string) {
    return this.userRepository.findOne(id);
  }

  async update(id: string, updateUserDto: PostUserDto) {
    // return this.userRepository.update(id, updateUserDto);
  }

  async remove(id: string) {
    // return this.userRepository.remove(id);
  }
}