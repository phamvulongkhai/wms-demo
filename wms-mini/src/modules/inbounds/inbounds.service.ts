import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, UpdateWriteOpResult } from 'mongoose';
import activeOption from 'src/config/active.config';
import { Status } from 'src/enums/status.enum';
import { BadRequestException } from 'src/exceptions/bad.request.exception';
import { CreateInboundDto } from './dto/create.update.inbound.dto/create.inbound.dto';
import { UpdateInboundDto } from './dto/create.update.inbound.dto/update.inbound.dto';
import { FilterPaginationInboundDto } from './dto/filter.paginatidto.inbound.dto/filter.pagination.inbound.dto';
import { UpdateStatusInboundDto } from './dto/update.status.inbound.dto';
import { Inbound, InboundDocument } from './inbound.schema';

@Injectable()
export class InboundsService {
  constructor(
    @InjectModel(Inbound.name) private readonly inboundModel: Model<Inbound>,
  ) {}

  //  TODO: You need to validate item id, and calculate inventory before save
  async create(createInboundDto: CreateInboundDto): Promise<InboundDocument> {
    try {
      return await this.inboundModel.create(createInboundDto);
    } catch (error) {
      throw new BadRequestException('Bad request');
    }
  }

  async findByOption(
    filterPaginationInboundDto: FilterPaginationInboundDto,
  ): Promise<InboundDocument[]> {
    const { filter, pagination }: FilterPaginationInboundDto =
      filterPaginationInboundDto;
    try {
      return await this.inboundModel
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
    updateStatusInboundDto: UpdateStatusInboundDto,
  ): Promise<UpdateWriteOpResult> {
    const statusChange: string = updateStatusInboundDto.status;
    try {
      const statusCheck = await this.findInboundStatus(id);
      if (statusCheck !== Status.NEW) {
        throw new BadRequestException('Only new accepted');
      }
      return await this.inboundModel.findOneAndUpdate(
        { _id: id, active: activeOption },
        { status: statusChange },
        { new: true },
      );
    } catch (error) {
      throw new BadRequestException('Bad request');
    }
  }

  async updateInbound(
    id: string,
    updateInboundDto: UpdateInboundDto,
  ): Promise<InboundDocument> {
    try {
      return this.inboundModel.findOneAndUpdate(
        { _id: id, active: activeOption },
        {
          items: updateInboundDto,
        },
      );
    } catch (error) {
      throw new BadRequestException('Bad request');
    }
  }

  async softDelete(id: string): Promise<InboundDocument> {
    try {
      // ! only NEW accepted
      const statusCheck = await this.findInboundStatus(id);
      if (statusCheck !== Status.NEW) {
        throw new BadRequestException('Only new accepted');
      }
      return this.inboundModel.findByIdAndUpdate(
        id,
        {
          active: false,
        },
        {
          new: true,
        },
      );
    } catch (error) {
      throw new BadRequestException('Bad request');
    }
  }

  async findInboundStatus(id: string): Promise<string> {
    const inbound = await this.inboundModel.findById(id);
    return inbound.status;
  }
}
