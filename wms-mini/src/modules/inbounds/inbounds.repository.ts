import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, UpdateWriteOpResult } from 'mongoose';
import activeOption from 'src/config/active.config';
import { Status } from 'src/enums/status.enum';
import { BadRequestException } from 'src/exceptions/bad.request.exception';
import { ItemsRepository } from '../items/items.repository';
import { CreateInboundDto } from './dto/create.update.inbound.dto/create.inbound.dto';
import { UpdateInboundDto } from './dto/create.update.inbound.dto/update.inbound.dto';
import { FilterPaginationInboundDto } from './dto/filter.pagination.inbound.dto/filter.pagination.inbound.dto';
import { UpdateStatusInboundDto } from './dto/update.status.inbound.dto';
import { Inbound, InboundDocument } from './schemas/inbound.schema';

@Injectable()
export class InboundRepository {
  constructor(
    @InjectModel(Inbound.name) private readonly inboundModel: Model<Inbound>,
    @Inject(ItemsRepository) private readonly itemsRepository: ItemsRepository,
  ) {}

  // create new inbound order
  async create(createInboundDto: CreateInboundDto): Promise<InboundDocument> {
    const { items }: CreateInboundDto = createInboundDto;

    try {
      await this.itemsRepository.isIdDtoMatchesIdDb(items);
      // create new inbound order
      return await this.inboundModel.create(createInboundDto);
    } catch (error) {
      throw new BadRequestException(error.message);
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
      const inbound = await this.findInboundById(id);
      // Check NEW status from db
      if (inbound.status !== Status.NEW)
        throw new BadRequestException('Only NEW accepted');

      // Update status in the end
      return await this.inboundModel.findOneAndUpdate(
        { _id: id, active: activeOption },
        { status: statusChange },
        { new: true },
      );
    } catch (error) {
      throw new BadRequestException(error.message);
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
      const inbound = await this.findInboundById(id);
      if (inbound.status !== Status.NEW)
        throw new BadRequestException('Only new accepted');

      // Delete
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
      throw new BadRequestException(error.message);
    }
  }

  private async findInboundById(id: string): Promise<InboundDocument> {
    try {
      const inbound = await this.inboundModel.findById(id);
      if (!inbound) throw new BadRequestException('Invalid inbound order id');
      return inbound;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
