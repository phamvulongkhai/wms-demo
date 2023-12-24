import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateOutboundDto } from './dto/create.update.outbound.dto/create.outbound.dto';
import { OutboundsService } from './outbounds.service';
import { OutboundDocument } from './schemas/outbound.schema';

@ApiTags('Outbounds')
@Controller('outbounds')
export class OutboundsController {
  constructor(private readonly outboundsService: OutboundsService) {}

  @Post('create')
  async create(
    @Body() createOutboundDto: CreateOutboundDto,
  ): Promise<OutboundDocument> {
    return await this.outboundsService.create(createOutboundDto);
  }
}
