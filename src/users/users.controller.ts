import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { UserService } from "./user.service";
import { PostUserTSType, UserTSType } from "./type/user";
import { UserPostDto } from "./dtos/UserPostDto";

@Controller("users")
export class UsersController {
  constructor(protected userService: UserService) {
  }

  @Post()
  async create(@Body() userPostDto: UserPostDto) {
    return this.userService.create(userPostDto);
  }

  @Get()
  async findAll() {
    return this.userService.findAll();
  }

  @Get(":id")
  async findOne(@Param("id") id: string) {
    return this.userService.findOne(id);
  }

  @Put(":id")
  async update(@Param("id") id: string, @Body() updateUserDto: PostUserTSType) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(":id")
  async remove(@Param("id") id: string) {
    return this.userService.remove(id);
  }
}