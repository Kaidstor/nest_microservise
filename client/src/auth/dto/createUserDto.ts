import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString } from "class-validator";

export class CreateUserDto {

   @ApiProperty({ example: 'admin | user', description: 'Роль' })
   @IsString()
   role: string;

   @ApiProperty({ example: 'Антон', description: 'Имя' })
   @IsString()
   name: string;

   @ApiProperty({ example: 'kaidstor@mail.ru', description: 'Email пользователя' })
   @IsEmail()
   email: string;

   @ApiProperty({ example: 'password', description: 'Пароль' })
   @IsString()
   password: string;
}