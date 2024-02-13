import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/entities/user.entity';

@Injectable()
export class AuthService {
   constructor(private readonly userService: UserService, private jwtService: JwtService) {}

   async validateUser(email: string, password: string) {
      const user = await this.userService.findOneByEmail(email);

      if (user && await bcrypt.compare(password, user.password)) {
         delete user.password;
         return user
      }

      return null
   }


   async login (user: User){
      const payload = { id: user.id, role: user.role };
      
      return {
         ...user, 
         accessToken: this.jwtService.sign(payload),
         refreshToken: this.jwtService.sign(payload, { expiresIn: '7d' }),
      }
   } 

   async refreshToken (user: User){
      const payload = { id: user.id, role: user.role };

      return {
         refreshToken: this.jwtService.sign(payload, { expiresIn: '7d' })
      }
   } 
}
