import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OutboundsController } from './outbounds.controller';
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
  ],
  controllers: [OutboundsController],
  providers: [OutboundsService],
})
export class OutboundsModule {}
