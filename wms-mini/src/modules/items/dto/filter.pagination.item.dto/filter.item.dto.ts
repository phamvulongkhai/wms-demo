import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsOptional, IsString } from 'class-validator';

export class FilterItemDto {
  @ApiProperty()
  @IsOptional()
  @IsString()
  @Expose()
  sku: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @Expose()
  name: string;
}
