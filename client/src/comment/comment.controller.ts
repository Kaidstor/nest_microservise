import { Body, Controller, Delete, ForbiddenException, Get, Headers, Inject, Param, Post, Put, UnauthorizedException } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Controller('comment')
export class CommentController {
   constructor(
      @Inject('COMMENT_SERVICE') private clientComment: ClientProxy,
      @Inject('USER_SERVICE') private clientUser: ClientProxy
   ) { }

   @Post('/')
   async create(@Headers() headers, @Body() body: { comment: string }) {
      try {
         const user = await lastValueFrom(this.clientUser.send({ cmd: 'getme' }, { accessToken: headers.authorization?.split(' ')[1] }));         
         const response = await lastValueFrom(this.clientComment.send({ cmd: 'create_comment' }, { userId: user.id, comment: body.comment }));
         return response
      } catch (error) {
         return new ForbiddenException();
      }
   }

   @Put('/:id')
   async update(@Headers() headers, @Body() body: { comment: string }, @Param('id') id: string) {
      try {
         const user = await lastValueFrom(this.clientUser.send({ cmd: 'getme' }, { accessToken: headers.authorization?.split(' ')[1] })); 
         const response = await lastValueFrom(this.clientComment.send({ cmd: 'update_comment' }, { userId: user.id, comment: body.comment, id: +id }));

         if (response?.status && response?.status == 'error') {
            return new ForbiddenException(response.message);
         }

         return;
      } catch (error) {
         return new ForbiddenException();
      }
   }

   @Delete('/:id')
   async delete(@Headers() headers, @Body() body: { comment: string }, @Param('id') id: string) {
      try {
         const user = await lastValueFrom(this.clientUser.send({ cmd: 'getme' }, { accessToken: headers.authorization?.split(' ')[1] })); 


         const response =  await lastValueFrom(this.clientComment.send({ cmd: 'delete_comment' }, { userId: user.id, role: user.role, id: +id }));
         
         console.log(response)

         if (response?.status && response?.status == 'error') {
            return new ForbiddenException(response.message);
         }

         return;
      } catch (error) {
         return new ForbiddenException();
      }
   }

   @Get('/user/:id')
   async all(@Headers() headers, @Param('id') id: string) {
      try {
         const user = await lastValueFrom(this.clientUser.send({ cmd: 'getme' }, { accessToken: headers.authorization?.split(' ')[1] })); 

         if (user.id != +id) {
            throw new UnauthorizedException();
         }

         return this.clientComment.send({ cmd: 'user_comments' }, { userId: user.id });
      } catch (error) {
         return new ForbiddenException();
      }
   }
}
