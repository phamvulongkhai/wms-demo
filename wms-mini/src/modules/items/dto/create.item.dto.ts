import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateItemDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  sku: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  name: string;
}
