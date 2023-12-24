import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import activeOption from 'src/config/active.config';
import { BadRequestException } from 'src/exceptions/bad.request.exception';
import { CreateItemDto } from './dto/create.update.item.dto/create.item.dto';
import { UpdateItemDto } from './dto/create.update.item.dto/update.item.dto';
import { FilterPaginationDto } from './dto/filter.pagination.dto/filter.pagination.dto';
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
    filterPaginationDto: FilterPaginationDto,
  ): Promise<ItemDocument[]> {
    const { filter, pagination }: FilterPaginationDto = filterPaginationDto;
    try {
      return await this.itemModel
        .find({
          ...filter,
          active: activeOption,
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
