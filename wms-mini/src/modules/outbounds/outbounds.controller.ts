import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Outbounds')
@Controller('outbounds')
export class OutboundsController {}
