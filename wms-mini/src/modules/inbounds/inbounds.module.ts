import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { InboundsController } from './inbounds.controller';
import { InboundsService } from './inbounds.service';
import { Inbound, InboundSchema } from './schemas/inbound.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Inbound.name,
        schema: InboundSchema,
      },
    ]),
  ],
  controllers: [InboundsController],
  providers: [InboundsService],
})
export class InboundsModule {}
