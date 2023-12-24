import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Item, ItemSchema } from '../items/item.schema';
import { InboundsController } from './inbounds.controller';
import { InboundRepository } from './inbounds.repository';
import { InboundsService } from './inbounds.service';
import { Inbound, InboundSchema } from './schemas/inbound.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Inbound.name,
        schema: InboundSchema,
      },
      {
        name: Item.name,
        schema: ItemSchema,
      },
    ]),
  ],
  controllers: [InboundsController],
  providers: [InboundsService, InboundRepository],
})
export class InboundsModule {}
