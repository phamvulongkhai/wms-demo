import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, UpdateWriteOpResult } from 'mongoose';
import { CreateOutboundDto } from './dto/create.update.outbound.dto/create.outbound.dto';
import { UpdateOutboundDto } from './dto/create.update.outbound.dto/update.outbound.dto';
import { FilterPaginationOutboundDto } from './dto/filter.pagination.outbound.dto/filter.pagination.outbound.dto';
import { UpdateStatusOutboundDto } from './dto/update.status.outbound.dto';
import { OutboundRepository } from './outbounds.repository';
import { Outbound, OutboundDocument } from './schemas/outbound.schema';

@Injectable()
export class OutboundsService {
  constructor(
    @InjectModel(Outbound.name) private readonly outboundModel: Model<Outbound>,
    private readonly outboundRepository: OutboundRepository,
  ) {}

  //  TODO: You need to validate item id, and calculate inventory before save
  async create(
    createOutboundDto: CreateOutboundDto,
  ): Promise<OutboundDocument> {
    return await this.outboundRepository.create(createOutboundDto);
  }

  async findByOption(
    filterPaginationOutboundDto: FilterPaginationOutboundDto,
  ): Promise<OutboundDocument[]> {
    return await this.outboundRepository.findByOption(
      filterPaginationOutboundDto,
    );
  }

  async updateInboundStatus(
    id: string,
    updateStatusOutboundDto: UpdateStatusOutboundDto,
  ): Promise<UpdateWriteOpResult> {
    return await this.outboundRepository.updateInboundStatus(
      id,
      updateStatusOutboundDto,
    );
  }

  async updateOutbound(
    id: string,
    updateOutboundDto: UpdateOutboundDto,
  ): Promise<OutboundDocument> {
    return this.outboundRepository.updateOutbound(id, updateOutboundDto);
  }

  async softDelete(id: string): Promise<OutboundDocument> {
    return this.outboundRepository.softDelete(id);
  }
}
