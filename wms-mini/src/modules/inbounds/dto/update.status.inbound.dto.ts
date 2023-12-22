import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty } from 'class-validator';
import { Status } from 'src/enums/status.enum';

export class UpdateStatusInboundDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(Status)
  status: Status;
}
