import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ItemsModule } from '../items/items.module';
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
    ]),
    ItemsModule,
  ],
  controllers: [OutboundsController],
  providers: [OutboundsService, OutboundRepository],
})
export class OutboundsModule {}
