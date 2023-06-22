import { IsBoolean, IsDate, IsEmail, IsString, Max, Min, ValidateNested } from "class-validator";
import { Types } from "mongoose";
import { DefaultValuePipe } from "@nestjs/common";

export class UserPostDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;

}
