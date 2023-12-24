import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { InboundsModule } from './inbounds/inbounds.module';
import { ItemsModule } from './items/items.module';
import { OuntboundsService } from './outbounds/ountbounds.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.URI),
    ItemsModule,
    InboundsModule,
  ],
  providers: [OuntboundsService],
})
export class AppModule {}
