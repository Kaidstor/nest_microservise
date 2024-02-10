import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateCommentDto {
   @ApiProperty({ example: 'Это мой комментарий, о том, как меня приняли на работу', description: 'Комментарий' })
   @IsString()
   comment: string;
}