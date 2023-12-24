import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, UpdateWriteOpResult } from 'mongoose';
import activeOption from 'src/config/active.config';
import { Status } from 'src/enums/status.enum';
import { BadRequestException } from 'src/exceptions/bad.request.exception';
import { CreateOutboundDto } from './dto/create.update.outbound.dto/create.outbound.dto';
import { UpdateOutboundDto } from './dto/create.update.outbound.dto/update.outbound.dto';
import { FilterPaginationOutboundDto } from './dto/filter.pagination.outbound.dto/filter.pagination.outbound.dto';
import { UpdateStatusOutboundDto } from './dto/update.status.outbound.dto';
import { Outbound, OutboundDocument } from './schemas/outbound.schema';

@Injectable()
export class OutboundsService {
  constructor(
    @InjectModel(Outbound.name) private readonly outboundModel: Model<Outbound>,
  ) {}

  //  TODO: You need to validate item id, and calculate inventory before save
  async create(
    createOutboundDto: CreateOutboundDto,
  ): Promise<OutboundDocument> {
    try {
      return await this.outboundModel.create(createOutboundDto);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findByOption(
    filterPaginationOutboundDto: FilterPaginationOutboundDto,
  ): Promise<OutboundDocument[]> {
    const { filter, pagination }: FilterPaginationOutboundDto =
      filterPaginationOutboundDto;
    try {
      return await this.outboundModel
        .find({
          active: activeOption,
          ...filter,
        })
        .limit(pagination.perPage)
        .skip(pagination.perPage * pagination.page)
        .exec();
    } catch (error) {
      throw new BadRequestException('Bad request');
    }
  }

  async updateInboundStatus(
    id: string,
    updateStatusOutboundDto: UpdateStatusOutboundDto,
  ): Promise<UpdateWriteOpResult> {
    const statusChange: string = updateStatusOutboundDto.status;
    try {
      const statusCheck = await this.findOutboundStatus(id);
      if (statusCheck !== Status.NEW) {
        throw new BadRequestException('Only new accepted');
      }
      return await this.outboundModel.findOneAndUpdate(
        { _id: id, active: activeOption },
        { status: statusChange },
        { new: true },
      );
    } catch (error) {
      throw new BadRequestException('Bad request');
    }
  }

  async updateOutbound(
    id: string,
    updateOutboundDto: UpdateOutboundDto,
  ): Promise<OutboundDocument> {
    try {
      return this.outboundModel.findOneAndUpdate(
        { _id: id, active: activeOption },
        {
          items: updateOutboundDto,
        },
      );
    } catch (error) {
      throw new BadRequestException('Bad request');
    }
  }

  async softDelete(id: string): Promise<OutboundDocument> {
    try {
      const statusCheck = await this.findOutboundStatus(id);
      if (statusCheck !== Status.NEW) {
        throw new BadRequestException('Only new accepted');
      }
      return this.outboundModel.findByIdAndUpdate(
        id,
        {
          active: false,
        },
        {
          new: true,
        },
      );
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findOutboundStatus(id: string): Promise<string> {
    const outbound = await this.outboundModel.findById(id);
    return outbound.status;
  }
}
