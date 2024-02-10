import { Controller, ForbiddenException, Get, Headers, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Controller('user')
export class UserController {
   constructor(@Inject('AUTH_SERVICE') private client: ClientProxy) { }

   @Get('/me')
   async me(@Headers() headers) {
      try {
         const response = await lastValueFrom(this.client.send({ cmd: 'getme' }, { accessToken: headers.authorization?.split(' ')[1] }));
         return response
      } catch (error) {
         console.log(error)
         return new ForbiddenException();
      }
   }

   @Get('/')
   async all(@Headers() headers) {
      try {
         return this.client.send({ cmd: 'users_all' }, { accessToken: headers.authorization?.split(' ')[1] });
      } catch (error) {
         return new ForbiddenException();
      }
   }
}
