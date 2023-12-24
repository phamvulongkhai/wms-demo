import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import activeOption from 'src/config/active.config';
import { BadRequestException } from 'src/exceptions/bad.request.exception';
import { CreateItemDto } from './dto/create.update.item.dto/create.item.dto';
import { UpdateItemDto } from './dto/create.update.item.dto/update.item.dto';
import { FilterPaginationItemDto } from './dto/filter.pagination.item.dto/filter.pagination.item.dto';
import { Item, ItemDocument } from './item.schema';

@Injectable()
export class ItemsService {
  constructor(
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

  // TODO: update items
  async updateInbound(
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
}
