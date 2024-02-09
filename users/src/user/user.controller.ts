import { Controller, Request } from '@nestjs/common';
import { UserService } from './user.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { JwtService } from '@nestjs/jwt';


@Controller('user')
export class UserController {
   constructor(private readonly userService: UserService, private jwtService: JwtService) {}

   @MessagePattern({ cmd: 'getme' })   
   async me(@Payload() req) {
      const user = this.jwtService.verify(req.accessToken)

      if (!user) return { status: 'error', message: 'Invalid token' }

      const info = await this.userService.findOne(user.id)

      delete info.password;
      return info;
   }
     
   @MessagePattern({ cmd: 'users_all' }) 
   async all(@Payload() req) {
      const user = this.jwtService.verify(req.accessToken)

      if (!user) return { status: 'error', message: 'Invalid token' }
      if (user.role != 'admin') return { status: 'error', message: 'No permission' }

      return await this.userService.find();
   }
}
