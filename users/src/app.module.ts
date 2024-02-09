import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import config from './ormconfig';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [AuthModule, UserModule, TypeOrmModule.forRoot(config), ConfigModule.forRoot()],
  controllers: [AppController],
})
export class AppModule {}
