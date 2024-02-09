import { IsEmail, IsString } from "class-validator";

export class CreateUserDto {

   @IsString()
   role: string;

   @IsString()
   name: string;

   @IsEmail()
   email: string;

   @IsString()
   password: string;
}