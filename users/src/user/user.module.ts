import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([User]), JwtModule.register({
    secret: `SECRET`,
    signOptions: {
      expiresIn: '3600s',
    }
  })],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
