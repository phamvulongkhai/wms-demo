import { Body, Controller, Delete, Param, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UpdateWriteOpResult } from 'mongoose';
import { IsObjectIdPipe } from 'src/pipes/is.object.id.pipe';
import { CreateInboundDto } from './dto/create.update.inbound.dto/create.inbound.dto';
import { UpdateInboundDto } from './dto/create.update.inbound.dto/update.inbound.dto';
import { FilterPaginationInboundDto } from './dto/filter.pagination.inbound.dto/filter.pagination.inbound.dto';
import { UpdateStatusInboundDto } from './dto/update.status.inbound.dto';
import { InboundsService } from './inbounds.service';
import { InboundDocument } from './schemas/inbound.schema';
@ApiTags('Inbounds')
@Controller('inbounds')
export class InboundsController {
  constructor(private readonly inboundsService: InboundsService) {}

  @Post('create')
  async create(
    @Body() createInboundDto: CreateInboundDto,
  ): Promise<InboundDocument> {
    return await this.inboundsService.create(createInboundDto);
  }

  @Post('search')
  async findByOption(
    @Body() filterPaginationInboundDto: FilterPaginationInboundDto,
  ): Promise<InboundDocument[]> {
    return await this.inboundsService.findByOption(filterPaginationInboundDto);
  }

  // ! Only New accepted
  @Put(':id')
  async updateInboundStatus(
    @Param('id', new IsObjectIdPipe()) id: string,
    @Body() updateStatusInboundDto: UpdateStatusInboundDto,
  ): Promise<UpdateWriteOpResult> {
    return await this.inboundsService.updateInboundStatus(
      id,
      updateStatusInboundDto,
    );
  }

  @Put('update/:id')
  async updateInbound(
    @Param('id', new IsObjectIdPipe()) id: string,
    @Body() updateInboundDto: UpdateInboundDto,
  ) {
    return await this.inboundsService.updateInbound(id, updateInboundDto);
  }

  @Delete(':id')
  async softDelete(
    @Param('id', new IsObjectIdPipe()) id: string,
  ): Promise<InboundDocument> {
    return await this.inboundsService.softDelete(id);
  }
}
