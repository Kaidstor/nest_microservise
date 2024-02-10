import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from 'src/auth/strategies/jwt-strategy';

@Module({
  imports: [TypeOrmModule.forFeature([User]), JwtModule.register({
    secret: `SECRET`,
    signOptions: {
      expiresIn: '3600s',
    }
  })],
  controllers: [UserController],
  providers: [UserService, JwtStrategy],
})
export class UserModule {}
