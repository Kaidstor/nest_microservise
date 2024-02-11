import { Controller, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { UserService } from 'src/user/user.service';
import { CreateUserDto } from 'src/user/dto/createUserDto';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { JwtRefreshGuard } from './guards/jwt_refresh-auth.guard';

@Controller('auth')
export class AuthController {

   constructor(private authService: AuthService, private userService: UserService) { }

   @UseGuards(LocalAuthGuard)
   @MessagePattern({ cmd: 'login' })
   async login(@Payload() req) {
      return await this.authService.login(req.user);
   }

   @MessagePattern({ cmd: 'register' })
   create(@Payload() createUserDto: CreateUserDto) {
      return this.userService.create(createUserDto);
   }

   @UseGuards(JwtRefreshGuard)
   @MessagePattern({ cmd: 'refresh' })
   async refreshToken(@Payload() req) {
      return await this.authService.refreshToken(req.user);
   }
}