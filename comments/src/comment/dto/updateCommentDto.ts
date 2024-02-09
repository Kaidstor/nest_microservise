import { IsNumber, IsString } from "class-validator";

export class UpdateCommentDto {
   @IsNumber()
   userId: number;

   @IsNumber()
   id: number;

   @IsString()
   comment: string;
}