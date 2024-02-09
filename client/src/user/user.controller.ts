import { Controller, ForbiddenException, Get, Headers, Inject, UnauthorizedException } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Controller('user')
export class UserController {
   constructor(@Inject('AUTH_SERVICE') private client: ClientProxy) { }

   @Get('/me')
   async me(@Headers() headers) {
      const token = headers.authorization?.split(' ')[1];
      if (!token) {
         throw new UnauthorizedException();
      }
      try {
         const response = await lastValueFrom(this.client.send({ cmd: 'getme' }, { accessToken: token }));
         return response
      } catch (error) {
         console.log(error)
         return new ForbiddenException();
      }
   }

   @Get('/')
   async all(@Headers() headers) {
      const token = headers.authorization?.split(' ')[1];
      if (!token) {
         throw new UnauthorizedException();
      }
      try {
         return this.client.send({ cmd: 'users_all' }, { accessToken: token });
      } catch (error) {
         return new ForbiddenException();
      }
   }
}
