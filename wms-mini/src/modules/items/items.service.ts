import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateItemDto } from './dto/create.item.dto';
import { Item } from './item.schema';

@Injectable()
export class ItemsService {
  constructor(
    @InjectModel(Item.name) private readonly itemModel: Model<Item>,
  ) {}

  async create(createItemDto: CreateItemDto): Promise<CreateItemDto> {
    return await this.itemModel.create(createItemDto);
  }

  async find(): Promise<CreateItemDto[]> {
    return await this.itemModel.find().exec();
  }
}
