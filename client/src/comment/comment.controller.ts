import { Body, Controller, Delete, ForbiddenException, Get, Headers, Inject, Param, Post, Put, Request, UnauthorizedException, UseGuards } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiBearerAuth, ApiParam } from '@nestjs/swagger';
import { lastValueFrom } from 'rxjs';
import { AuthService } from 'src/auth/auth.service';
import { AuthorizationGuard } from 'src/auth/guards/auth.guard';
import { AuthReqData } from 'src/auth/strategies/auth-strategy';
import { CreateCommentDto } from './dto/createCommentDto';
import { UpdateCommentDto } from './dto/updateCommentDto';
import { CommentService } from './comment.service';

@Controller('comment')
export class CommentController {
   constructor(
      private readonly commentService: CommentService
   ) { }

   @ApiBearerAuth('access-token')
   @UseGuards(AuthorizationGuard)
   @Post('/')
   create(@Request() req: AuthReqData, @Body() body: CreateCommentDto) {
      return this.commentService.create(req.user.id, body.comment);
   }

   @ApiBearerAuth('access-token')
   @ApiParam({ name: 'id', required: true, description: 'Уникальный идентификатор комментария', type: String })
   @UseGuards(AuthorizationGuard)
   @Put('/:id')
   async update(@Request() req: AuthReqData, @Body() body: UpdateCommentDto, @Param('id') id: string,) {
      return this.commentService.update(req.user.id, body.comment, +id);
   }

   @ApiBearerAuth('access-token')
   @ApiParam({ name: 'id', required: true, description: 'Уникальный идентификатор комментария', type: String })
   @UseGuards(AuthorizationGuard)
   @Delete('/:id')
   async delete(@Request() req: AuthReqData, @Param('id') id: string) {
      return this.commentService.delete(req.user.id, req.user.role, +id);
   }

   @ApiBearerAuth('access-token')
   @ApiParam({ name: 'id', required: true, description: 'Уникальный идентификатор пользователя', type: String })
   @Get('/user/:id')
   all(@Request() req: AuthReqData, @Param('id') id: string) {
      return this.commentService.all(+id);
   }
}
