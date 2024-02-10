import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class UpdateCommentDto {
   @ApiProperty({ example: 'Это мой комментарий, о том, как я заработал миллион $', description: 'Комментарий' })
   @IsString()
   comment: string;
}