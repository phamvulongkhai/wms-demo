import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Status } from 'src/enums/status.enum';
import { ItemQuantityDto } from 'src/modules/inbounds/dto/item.quantity.dto';
import getCode from 'src/utils/random.code.util';

export type InboundDocument = HydratedDocument<Inbound>;
@Schema({
  timestamps: true,
})
export class Inbound {
  @Prop({
    default: `IB${getCode()}`,
  })
  code: string;

  @Prop({
    default: Status.NEW,
    enum: Status,
  })
  status: string;

  @Prop({
    default: [],
  })
  items: ItemQuantityDto[];

  @Prop({
    default: true,
  })
  active: boolean;
}

export const InboundSchema = SchemaFactory.createForClass(Inbound);
