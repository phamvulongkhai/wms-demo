import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, UpdateWriteOpResult } from 'mongoose';
import { ItemQuantity } from 'src/common/item.quantity';
import activeOption from 'src/config/active.config';
import { Status } from 'src/enums/status.enum';
import { BadRequestException } from 'src/exceptions/bad.request.exception';
import { Item } from '../items/item.schema';
import { CreateOutboundDto } from './dto/create.update.outbound.dto/create.outbound.dto';
import { UpdateOutboundDto } from './dto/create.update.outbound.dto/update.outbound.dto';
import { FilterPaginationOutboundDto } from './dto/filter.pagination.outbound.dto/filter.pagination.outbound.dto';
import { UpdateStatusOutboundDto } from './dto/update.status.outbound.dto';
import { Outbound, OutboundDocument } from './schemas/outbound.schema';

@Injectable()
export class OutboundRepository {
  constructor(
    @InjectModel(Outbound.name) private readonly outboundModel: Model<Outbound>,
    @InjectModel(Item.name) private readonly itemModel: Model<Item>,
  ) {}

  // create new outbound order
  async create(
    createOutboundDto: CreateOutboundDto,
  ): Promise<OutboundDocument> {
    const { items }: CreateOutboundDto = createOutboundDto;
    try {
      await this.isIdDtoMatchesIdDb(items);

      // create new outbound order
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
      // Check NEW status from db
      const outbound = await this.findOutboundById(id);

      if (outbound.status !== Status.NEW)
        throw new BadRequestException('Only NEW accepted');

      // Update status in the end
      return await this.outboundModel.findOneAndUpdate(
        { _id: id, active: activeOption },
        { status: statusChange },
        { new: true },
      );
    } catch (error) {
      throw new BadRequestException(error.message);
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
      const outbound = await this.findOutboundById(id);
      if (outbound.status !== Status.NEW)
        throw new BadRequestException('Only new accepted');
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

  // check if id in dto matches id in database
  private async isIdDtoMatchesIdDb(
    itemQuantity: ItemQuantity[],
  ): Promise<void> {
    const IdDto: string[] = itemQuantity.map((item) => {
      return item.id;
    });
    try {
      const IdDb = await this.itemModel
        .find({
          active: activeOption,
        })
        .where('_id')
        .in(IdDto)
        .exec();
      if (IdDto.length !== IdDb.length)
        throw new BadRequestException('Invalid item id');
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  private async findOutboundById(id: string): Promise<OutboundDocument> {
    try {
      const outbound = await this.outboundModel.findById(id);
      if (!outbound) throw new BadRequestException('Invalid outbound order id');
      return outbound;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
