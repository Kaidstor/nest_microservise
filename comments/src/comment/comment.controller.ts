import { Controller } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/createCommentDto';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UpdateCommentDto } from './dto/updateCommentDto';

@Controller('comment')
export class CommentController {
   constructor(private readonly commentService: CommentService) { }

   @MessagePattern({ cmd: 'create_comment' })
   create(@Payload() createCommentDto: CreateCommentDto) {
      return this.commentService.create(createCommentDto);
   }

   @MessagePattern({ cmd: 'update_comment' })
   async update(@Payload() payload: UpdateCommentDto) {
      return await this.commentService.update(payload);
   }

   @MessagePattern({ cmd: 'delete_comment' })
   async delete(@Payload() payload: { id: number, userId: number, role: string }) {
      return await this.commentService.delete(payload.id, payload.userId, payload.role);
   }

   @MessagePattern({ cmd: 'user_comments' })
   async getUserComments(@Payload() payload: { id: number, userId: number, role: string }) {
      return await this.commentService.findByUserId(payload.id, payload.role, payload.userId);
   }
}
