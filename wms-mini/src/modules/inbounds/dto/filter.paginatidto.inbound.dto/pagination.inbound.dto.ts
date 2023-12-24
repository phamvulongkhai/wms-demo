import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsInt, IsNotEmpty, IsNumber, Min } from 'class-validator';

export class PaginationInboundDto {
  @Min(0)
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  @Expose()
  @IsInt()
  perPage: number;

  @Min(0)
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  @Expose()
  @IsInt()
  page: number;
}
