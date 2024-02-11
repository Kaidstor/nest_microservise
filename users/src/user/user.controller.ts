import { Controller, ForbiddenException, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { JwtService } from '@nestjs/jwt';
import { JwtGuard } from 'src/auth/guards/jwt-auth.guard';
import { Roles, RolesGuard } from 'src/auth/guards/roles.guard';


@Controller('user')
export class UserController {
   constructor(private readonly userService: UserService, private jwtService: JwtService) {}

   @UseGuards(JwtGuard)
   @MessagePattern({ cmd: 'getme' })   
   async me(@Payload() req) {
      return await this.userService.findOne(req.user.id)
   }
     
   @UseGuards(JwtGuard, RolesGuard)
   @Roles('admin')
   @MessagePattern({ cmd: 'users_all' }) 
   async all() {
      return await this.userService.find();
   }
}
