import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ItemQuantity } from 'src/common/item.quantity';
import activeOption from 'src/config/active.config';
import { Status } from 'src/enums/status.enum';
import { BadRequestException } from 'src/exceptions/bad.request.exception';
import { calculateInventory } from 'src/utils/calculate.util';
import { Inbound } from '../inbounds/schemas/inbound.schema';
import { Item, ItemDocument } from '../items/item.schema';
import { Outbound } from '../outbounds/schemas/outbound.schema';
import { CreateItemDto } from './dto/create.update.item.dto/create.item.dto';
import { UpdateItemDto } from './dto/create.update.item.dto/update.item.dto';
import { FilterPaginationItemDto } from './dto/filter.pagination.item.dto/filter.pagination.item.dto';

@Injectable()
export class ItemsRepository {
  constructor(
    @InjectModel(Inbound.name) private readonly inboundModel: Model<Inbound>,
    @InjectModel(Outbound.name) private readonly outboundModel: Model<Outbound>,
    @InjectModel(Item.name) private readonly itemModel: Model<Item>,
  ) {}

  async create(createItemDto: CreateItemDto): Promise<ItemDocument> {
    try {
      return await this.itemModel.create(createItemDto);
    } catch (error) {
      throw new BadRequestException('Bad request');
    }
  }

  async findByOption(
    filterPaginationItemDto: FilterPaginationItemDto,
  ): Promise<ItemDocument[]> {
    const { filter, pagination }: FilterPaginationItemDto =
      filterPaginationItemDto;
    try {
      return await this.itemModel
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

  // TODO: get item inventory
  //   async getInventory(: string): Promise<InventoryDto> {
  //     try {
  //        getAllToCalculateInventory
  //     } catch (error) {
  //       throw new BadRequestException('Bad request');
  //     }
  //   }

  async updateItem(
    id: string,
    updateItemDto: UpdateItemDto,
  ): Promise<ItemDocument> {
    try {
      return this.itemModel.findOneAndUpdate(
        { _id: id, active: activeOption },
        {
          items: updateItemDto,
        },
        {
          new: true,
        },
      );
    } catch (error) {
      throw new BadRequestException('Bad request');
    }
  }

  async softDelete(id: string): Promise<ItemDocument> {
    //  TODO: you need to validate if the item is on order or not.
    try {
      return this.itemModel.findByIdAndUpdate(
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

  private async getAllToCalculateInventory(id: string): Promise<any> {
    try {
      const filter: object = {
        active: activeOption,
        status: Status.COMPLETED,
      };
      const inboundsCompleted = this.inboundModel.find(filter);
      const outboundsCompleted = this.outboundModel.find(filter);
      const inboundsNew = this.inboundModel.find({
        ...filter,
        status: Status.NEW,
      });
      const results = await Promise.all([
        inboundsCompleted,
        outboundsCompleted,
        inboundsNew,
      ]);

      // TODO: util function here
      calculateInventory(results, id);
    } catch (error) {}
  }

  // check if id in dto matches id in database
  async isIdDtoMatchesIdDb(itemQuantity: ItemQuantity[]): Promise<void> {
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
}
