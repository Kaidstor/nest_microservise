import { Body, Controller, Headers, Inject, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateUserDto } from './dto/createUserDto';
import { LoginDto } from './dto/loginDto';
import { RefreshTokenDto } from './dto/refreshTokenDto';

@Controller('auth')
export class AuthController {
   constructor(@Inject('USER_SERVICE') private client: ClientProxy) { }

   @Post('/login')
   async login(@Body() body: LoginDto) {
      return this.client.send({ cmd: 'login' }, body);
   }

   @Post('/register')
   async register(@Body() body: CreateUserDto) {
      return this.client.send({ cmd: 'register' }, body);
   }

   @Post('/refresh')
   refresh(@Headers() headers, @Body() body: RefreshTokenDto) {
      return this.client.send({ cmd: 'refresh' }, { refresh: headers.authorization.split(' ')[1] });
   }
}
