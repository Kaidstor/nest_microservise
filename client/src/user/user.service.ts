import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class UserService {
   constructor(@Inject('AUTH_SERVICE') private client: ClientProxy) { }

   me(accessToken: string) {
      return this.client.send({ cmd: 'getme' }, { accessToken })
   }

   all(accessToken: string) {
      return this.client.send({ cmd: 'users_all' }, { accessToken });
   }}
