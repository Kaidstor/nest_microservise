import { Controller, ForbiddenException, Get, Headers, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { lastValueFrom } from 'rxjs';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
   constructor(private readonly userService: UserService) {}

   @ApiBearerAuth('access-token')
   @Get('/me')
   me(@Headers() headers) {
      return this.userService.me(headers.authorization?.split(' ')[1])
   }

   @ApiOperation({ summary: 'Получить всех пользователей, role: admin' })
   @ApiBearerAuth('access-token')
   @Get('/')
   all(@Headers() headers) {
      return this.userService.all(headers.authorization?.split(' ')[1])
   }
}
