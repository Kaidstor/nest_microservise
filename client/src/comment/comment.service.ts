import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class CommentService {
   constructor(
      @Inject('COMMENT_SERVICE') private clientComment: ClientProxy,
   ) { }

   create(userId: number, comment: string) {
      return this.clientComment.send({ cmd: 'create_comment' }, { userId, comment });
   }

   async update(userId: number, comment: string, id: number) {
      return await lastValueFrom(this.clientComment.send({ cmd: 'update_comment' }, { userId, comment, id }));
   }

   async delete(userId: number, role: string, id: number) {
      return await lastValueFrom(this.clientComment.send({ cmd: 'delete_comment' }, { userId, role, id }));
   }

   all(userId: number) {
      return this.clientComment.send({ cmd: 'user_comments' }, { userId });
   }
}
