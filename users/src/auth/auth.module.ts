import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserService } from 'src/user/user.service';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { LocalStrategy } from './strategies/local-strategy';
import { JwtStrategy } from './strategies/jwt-strategy';
import { JwtRefreshStrategy } from './strategies/jwt_refresh-strategy';

@Module({
  providers: [AuthService, UserService, LocalStrategy, JwtStrategy, JwtRefreshStrategy],
  controllers: [AuthController],
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: `SECRET`,
      signOptions: {
        expiresIn: '3600s',
      }
    }),
  ],
})
export class AuthModule { }
