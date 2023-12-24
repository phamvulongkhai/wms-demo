import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { IsObject, ValidateNested } from 'class-validator';
import { FilterItemDto } from './filter.dto';
import { PaginationItemDto } from './pagination.dto';

export class FilterPaginationDto {
  @Type(() => FilterItemDto)
  @ValidateNested({
    each: true,
  })
  @ApiProperty()
  @IsObject()
  @Expose()
  filter: FilterItemDto;

  @Type(() => PaginationItemDto)
  @ValidateNested({
    each: true,
  })
  @ApiProperty()
  @IsObject()
  @Expose()
  pagination: PaginationItemDto;
}
