import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString } from "class-validator";

export class LoginDto {
   @ApiProperty({ example: 'kaidstor@mail.ru', description: 'Email пользователя' })
   @IsEmail()
   email: string;

   @ApiProperty({ example: 'password', description: 'Пароль' })
   @IsString()
   password: string;
}