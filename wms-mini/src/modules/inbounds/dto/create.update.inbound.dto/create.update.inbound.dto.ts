import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { IsArray, IsNotEmpty, ValidateNested } from 'class-validator';
import { ItemQuantityInboundDto } from '../item.quantity.inbound.dto';

export class CreateUpdateInboundDto {
  @Expose()
  @IsArray()
  @IsNotEmpty()
  @ApiProperty()
  @ValidateNested({ each: true })
  @Type(() => ItemQuantityInboundDto)
  items: ItemQuantityInboundDto[];
}
