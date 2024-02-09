import { Body, Controller, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { UserService } from 'src/user/user.service';
import { CreateUserDto } from 'src/user/dto/createUserDto';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { JwtService } from '@nestjs/jwt';

@Controller('auth')
export class AuthController {

   constructor(private authService: AuthService, private userService: UserService, private jwtService: JwtService) { }

   @UseGuards(LocalAuthGuard)
   @MessagePattern({ cmd: 'login' })
   async login(@Payload() req) {
      const user = await this.userService.findOneByEmail(req.email);
      return await this.authService.login(user);
   }

   @MessagePattern({ cmd: 'register' })
   create(@Payload() createUserDto: CreateUserDto) {
      return this.userService.create(createUserDto);
   }

   @MessagePattern({ cmd: 'refresh' })
   async refreshToken(@Payload() req) {
      try {
         const user = this.jwtService.verify(req.refresh)

         delete user.iat;
         delete user.exp;

         return await this.authService.refreshToken(user);
      } catch (e) {
         return { status: 'error', message: e.message };
      }
   }


   // @UseGuards(LocalAuthGuard)
   // @Post('login')
   // async login(@Request() req) {
   //    return await this.authService.login(req.user);
   // }

   // @Post('register')
   // async create(@Body() createUserDto: CreateUserDto) {
   //    return this.userService.create(createUserDto);
   // }

   // @UseGuards(JwtRefreshGuard)
   // @Post('refresh')
   // async refreshToken(@Request() req) {
   //    console.log('refreshToken', req.user)
   //    return await this.authService.refreshToken(req.user);
   // }
}