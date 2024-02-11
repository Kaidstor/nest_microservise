import { Module } from '@nestjs/common';
import { CommentController } from './comment.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { AuthService } from 'src/auth/auth.service';
import { AuthorizationStrategy } from 'src/auth/strategies/auth-strategy';
import { CommentService } from './comment.service';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [CommentController],
  providers: [
    AuthService,
    AuthorizationStrategy,
    {
      provide: 'COMMENT_SERVICE',
      inject: [ConfigService],
      useFactory: (configService: ConfigService) =>
        ClientProxyFactory.create({
          transport: Transport.TCP,
          options: {
            host: configService.get('COMMENT_SERVICE_HOST'),
            port: configService.get('COMMENT_SERVICE_PORT'),
          },
        }),
    },
    {
      provide: 'USER_SERVICE',
      inject: [ConfigService],
      useFactory: (configService: ConfigService) =>
        ClientProxyFactory.create({
          transport: Transport.TCP,
          options: {
            host: configService.get('USER_SERVICE_HOST'),
            port: configService.get('USER_SERVICE_PORT'),
          },
        }),
    },
    CommentService]
})
export class CommentModule { }
