import { Body, Controller, Delete, ForbiddenException, Get, Headers, Inject, Param, Post, Put, Request, UnauthorizedException, UseGuards } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { AuthService } from 'src/auth/auth.service';
import { AuthorizationGuard } from 'src/auth/guards/auth.guard';
import { AuthReqData } from 'src/auth/strategies/auth-strategy';

@Controller('comment')
export class CommentController {
   constructor(
      @Inject('COMMENT_SERVICE') private clientComment: ClientProxy
   ) { }

   @UseGuards(AuthorizationGuard)
   @Post('/')
   create(@Request() req: AuthReqData, @Body() body: { comment: string }) {
      return this.clientComment.send({ cmd: 'create_comment' }, {
         userId: req.user.id, comment: body.comment
      });
   }

   @UseGuards(AuthorizationGuard)
   @Put('/:id')
   async update(@Request() req: AuthReqData, @Body() body: { comment: string }, @Param('id') id: string,) {
      return await lastValueFrom(this.clientComment.send({ cmd: 'update_comment' }, {
         userId: req.user.id, comment: body.comment, id: +id
      }));
   }

   @UseGuards(AuthorizationGuard)
   @Delete('/:id')
   async delete(@Request() req: AuthReqData, @Body() body: { comment: string }, @Param('id') id: string) {
      return await lastValueFrom(this.clientComment.send({ cmd: 'delete_comment' }, {
         userId: req.user.id, role: req.user.role, id: +id
      }));
   }

   @Get('/user/:id')
   all(@Request() req: AuthReqData, @Param('id') id: string) {
      return this.clientComment.send({ cmd: 'user_comments' }, { userId: +id });
   }
}
