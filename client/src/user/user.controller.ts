import { Controller, ForbiddenException, Get, Headers, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { lastValueFrom } from 'rxjs';

@Controller('user')
export class UserController {
   constructor(@Inject('AUTH_SERVICE') private client: ClientProxy) { }

   @ApiBearerAuth()
   @Get('/me')
   me(@Headers() headers) {
      return this.client.send({ cmd: 'getme' }, { accessToken: headers.authorization?.split(' ')[1] })
   }

   @ApiOperation({ summary: 'Получить всех пользователей, role: admin' })
   @ApiBearerAuth()
   @Get('/')
   all(@Headers() headers) {
      return this.client.send({ cmd: 'users_all' }, { accessToken: headers.authorization?.split(' ')[1] });
   }
}
