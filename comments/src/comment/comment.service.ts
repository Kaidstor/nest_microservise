import { Injectable } from '@nestjs/common';
import { Comment } from 'src/entities/comment.entity';
import { CreateCommentDto } from './dto/createCommentDto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateCommentDto } from './dto/updateCommentDto';


@Injectable()
export class CommentService {
   constructor(
      @InjectRepository(Comment) private readonly commentRepository: Repository<Comment>,
   ) { }

   async create(createCommentDto: CreateCommentDto) {
      const newComment = this.commentRepository.create({ ...createCommentDto });
      return await this.commentRepository.save(newComment);
   }

   async update(updateCommentDto: UpdateCommentDto) {
      const commentdb = await this.commentRepository.findOne({ where: { id: updateCommentDto.id } });

      if (!commentdb)
         return { status: 'error', message: 'Not found comment with this id' };

      if (commentdb.userId != updateCommentDto.userId)
         return { status: 'error', message: 'No permission' };

      return await this.commentRepository.update(updateCommentDto.id, { comment: updateCommentDto.comment });
   }

   async delete(id: number, userId: number, role: string) {
      const commentdb = await this.commentRepository.findOne({ where: { id } });

      if (!commentdb)
         return { status: 'error', message: 'Not found comment with this id' };

      if (commentdb.userId != userId && role != 'admin')
         return { status: 'error', message: 'No permission' };

      return await this.commentRepository.delete(id);
   }

   async findByUserId(userId: number) {
      return await this.commentRepository.find({ where: { userId } });
   }
}
