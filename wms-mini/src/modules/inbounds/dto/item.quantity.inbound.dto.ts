import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsPositive, IsString } from 'class-validator';
import { isObjectId } from 'src/decorators/is.object.td.decorator';

export class ItemQuantityInboundDto {
  @ApiProperty()
  @isObjectId()
  @IsNotEmpty()
  @IsString()
  @Expose()
  id: string;

  @ApiProperty()
  @IsPositive()
  @IsNotEmpty()
  @IsNumber()
  @Expose()
  quantity: number;
}
