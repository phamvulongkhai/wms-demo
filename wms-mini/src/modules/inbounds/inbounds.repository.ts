import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { ItemQuantity } from 'src/common/item.quantity';
import activeOption from 'src/config/active.config';
import { BadRequestException } from 'src/exceptions/bad.request.exception';
import { Item } from '../items/item.schema';
import { CreateInboundDto } from './dto/create.update.inbound.dto/create.inbound.dto';
import { Inbound, InboundDocument } from './schemas/inbound.schema';

@Injectable()
export class InboundRepository {
  constructor(
    @InjectModel(Inbound.name) private readonly inboundModel: Model<Inbound>,
    @InjectModel(Item.name) private readonly itemModel: Model<Item>,
  ) {}

  async create(createInboundDto: CreateInboundDto): Promise<InboundDocument> {
    try {
      await this.isIdDtoMatchesIdDb(createInboundDto.items);

      // ! add Inbound - NEW
      await this.increaseInventory(createInboundDto.items);

      // create new inbound order
      return await this.inboundModel.create(createInboundDto);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  //   increase Inventory
  async increaseInventory(itemQuantity: ItemQuantity[]): Promise<void> {
    const writes = itemQuantity.map((item) => {
      return {
        updateOne: {
          filter: {
            _id: new mongoose.Types.ObjectId(item.id),
          },
          update: {
            $inc: {
              inventory: item.quantity,
            },
          },
        },
      };
    });
    try {
      await this.itemModel.bulkWrite(writes);
    } catch (error) {
      throw new BadRequestException('Bad request');
    }
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
