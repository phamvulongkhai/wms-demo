import { Body, Controller, Param, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UpdateWriteOpResult } from 'mongoose';
import { IsObjectIdPipe } from 'src/pipes/is.object.id.pipe';
import { CreateInboundDto } from './dto/create.inbound.dto';
import { UpdateStatusInboundDto } from './dto/update.status.inbound.dto';
import { InboundDocument } from './inbound.schema';
import { InboundsService } from './inbounds.service';
@ApiTags('Inbounds')
@Controller('inbound')
export class InboundsController {
  constructor(private readonly inboundsService: InboundsService) {}

  @Post('create')
  async create(
    @Body() createInboundDto: CreateInboundDto,
  ): Promise<InboundDocument> {
    return this.inboundsService.create(createInboundDto);
  }

  // ! Only New accepted
  @Put(':id')
  async(
    @Param('id', new IsObjectIdPipe()) id: string,
    @Body() updateStatusInboundDto: UpdateStatusInboundDto,
  ): Promise<UpdateWriteOpResult> {
    return this.inboundsService.updateInboundStatus(id, updateStatusInboundDto);
  }
}
