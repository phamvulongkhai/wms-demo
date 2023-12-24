import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { IsArray, IsNotEmpty, ValidateNested } from 'class-validator';
import { ItemQuantityDto } from 'src/modules/inbounds/dto/item.quantity.dto';

export class BaseInboundDto {
  @Expose()
  @IsArray()
  @IsNotEmpty()
  @ApiProperty()
  @ValidateNested({ each: true })
  @Type(() => ItemQuantityDto)
  items: ItemQuantityDto[];
}
