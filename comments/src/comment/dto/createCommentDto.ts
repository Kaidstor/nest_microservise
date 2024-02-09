import { IsNumber, IsString } from "class-validator";

export class CreateCommentDto {
   @IsNumber()
   userId: number;

   @IsString()
   comment: string;
}