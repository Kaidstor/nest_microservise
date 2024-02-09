import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { CommentModule } from './comment/comment.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import config from './ormconfig';

@Module({
  imports: [TypeOrmModule.forRoot(config), ConfigModule.forRoot(), CommentModule],
  controllers: [AppController],
})
export class AppModule {}
