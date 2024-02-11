import { Body, Controller, Headers, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/createUserDto';
import { LoginDto } from './dto/loginDto';
import { RefreshTokenDto } from './dto/refreshTokenDto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
   constructor(private readonly authService: AuthService) { }

   @Post('/login')
   async login(@Body() body: LoginDto) {
      return this.authService.login(body);
   }

   @Post('/register')
   async register(@Body() body: CreateUserDto) {
      return this.authService.register(body);
   }

   @Post('/refresh')
   refresh(@Headers() headers, @Body() body: RefreshTokenDto) {
      return this.authService.refresh(body);
   }
}
