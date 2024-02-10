import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class AuthService {
   constructor(@Inject('USER_SERVICE') private client: ClientProxy) {}

   async checkAuth(headers: {authorization: string | null}) {
      const accessToken = headers.authorization?.split(' ')[1];
      const user = await lastValueFrom(this.client.send({ cmd: 'getme' }, { accessToken })) as {id: number, role: string} | {message: string, statusCode: number};

      if ('message' in user) {
         throw new UnauthorizedException(user.message);
      }

      return user && { id: user.id, role: user.role }
   }
}
