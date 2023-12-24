import { Module } from '@nestjs/common';
import { OutboundsService } from './ountbounds.service';
import { OutboundsController } from './outbounds.controller';

@Module({
  controllers: [OutboundsController],
  providers: [OutboundsService],
})
export class OutboundsModule {}
