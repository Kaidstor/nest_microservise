import { Body, Controller, Delete, ForbiddenException, Get, Headers, Inject, Param, Post, Put, Request, UnauthorizedException, UseGuards } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiBearerAuth, ApiParam } from '@nestjs/swagger';
import { lastValueFrom } from 'rxjs';
import { AuthService } from 'src/auth/auth.service';
import { AuthorizationGuard } from 'src/auth/guards/auth.guard';
import { AuthReqData } from 'src/auth/strategies/auth-strategy';
import { CreateCommentDto } from './dto/createCommentDto';
import { UpdateCommentDto } from './dto/updateCommentDto';

@Controller('comment')
export class CommentController {
   constructor(
      @Inject('COMMENT_SERVICE') private clientComment: ClientProxy
   ) { }

   @ApiBearerAuth()
   @UseGuards(AuthorizationGuard)
   @Post('/')
   create(@Request() req: AuthReqData, @Body() body: CreateCommentDto) {
      return this.clientComment.send({ cmd: 'create_comment' }, {
         userId: req.user.id, comment: body.comment
      });
   }

   @ApiBearerAuth()
   @ApiParam({ name: 'id', required: true, description: 'Уникальный идентификатор комментария', type: String })
   @UseGuards(AuthorizationGuard)
   @Put('/:id')
   async update(@Request() req: AuthReqData, @Body() body: UpdateCommentDto, @Param('id') id: string,) {
      return await lastValueFrom(this.clientComment.send({ cmd: 'update_comment' }, {
         userId: req.user.id, comment: body.comment, id: +id
      }));
   }

   @ApiBearerAuth()
   @ApiParam({ name: 'id', required: true, description: 'Уникальный идентификатор комментария', type: String })
   @UseGuards(AuthorizationGuard)
   @Delete('/:id')
   async delete(@Request() req: AuthReqData, @Body() body: { comment: string }, @Param('id') id: string) {
      return await lastValueFrom(this.clientComment.send({ cmd: 'delete_comment' }, {
         userId: req.user.id, role: req.user.role, id: +id
      }));
   }

   @ApiBearerAuth()
   @ApiParam({ name: 'id', required: true, description: 'Уникальный идентификатор пользователя', type: String })
   @Get('/user/:id')
   all(@Request() req: AuthReqData, @Param('id') id: string) {
      return this.clientComment.send({ cmd: 'user_comments' }, { userId: +id });
   }
}
