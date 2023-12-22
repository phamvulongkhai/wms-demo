import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsOptional, IsString } from 'class-validator';

export class FindingOptionDto {
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
