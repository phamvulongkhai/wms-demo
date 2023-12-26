import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Status } from 'src/enums/status.enum';

export class FilterOutboundDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsOptional()
  @IsString()
  code: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsOptional()
  @IsEnum(Status)
  status: Status;
}
