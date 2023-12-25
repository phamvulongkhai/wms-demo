import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Item, ItemSchema } from '../items/item.schema';
import { OutboundsController } from './outbounds.controller';
import { OutboundRepository } from './outbounds.repository';
import { OutboundsService } from './outbounds.service';
import { Outbound, OutboundSchema } from './schemas/outbound.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Outbound.name,
        schema: OutboundSchema,
      },
      {
        name: Item.name,
        schema: ItemSchema,
      },
    ]),
  ],
  controllers: [OutboundsController],
  providers: [OutboundsService, OutboundRepository],
})
export class OutboundsModule {}
