import { Body, Controller, ForbiddenException, Headers, Inject, Post, UnauthorizedException } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { CreateUserDto } from './dto/createUserDto';
import { LoginDto } from './dto/loginDto';

@Controller('auth')
export class AuthController {
   constructor(@Inject('USER_SERVICE') private client: ClientProxy) { }

   @Post('/login')
   async login(@Body() body: LoginDto) {
      try {
         return await lastValueFrom(this.client.send({ cmd: 'login' }, body));
      } catch (error) {
         console.log(error)
         return new UnauthorizedException();
      }
   }

   @Post('/register')
   async register(@Body() body: CreateUserDto) {
      const response = await lastValueFrom(this.client.send({ cmd: 'register' }, body));

      if (response.status === 'error') {
         return new ForbiddenException(response.message);
      }

      return response;
   }
   
   @Post('/refresh')
   async refresh(@Headers() headers) {
      try {
         const token = headers.authorization.split(' ')[1];
         return await lastValueFrom(this.client.send({ cmd: 'refresh' }, { refresh: headers.authorization.split(' ')[1] }));
      } catch (error) {
         return new UnauthorizedException();
      }
   }
}
