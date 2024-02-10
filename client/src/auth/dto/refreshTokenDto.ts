import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class RefreshTokenDto {
   @ApiProperty({ description: 'Refresh token', example: '83475nfdjksghdsfg7sdyfg7ns'})
   @IsString()
   refresh: string;
}