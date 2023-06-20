import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { UserService } from "./user.service";
import { PostUserDto, UserType } from "./dtos/dto";

@Controller("users")
export class UsersController {
  constructor(protected userService: UserService) {
  }

  @Post()
  async create(@Body() user: UserType) {
    return this.userService.create(user);
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
  async update(@Param("id") id: string, @Body() updateUserDto: PostUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(":id")
  async remove(@Param("id") id: string) {
    return this.userService.remove(id);
  }
}