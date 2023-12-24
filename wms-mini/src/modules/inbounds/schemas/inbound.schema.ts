import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Status } from 'src/enums/status.enum';
import getCode from 'src/utils/random.code.util';
import { ItemQuantity } from './item.quantity.schema';

export type InboundDocument = HydratedDocument<Inbound>;
@Schema({
  timestamps: true,
})
export class Inbound {
  @Prop({
    default: `IB${getCode()}`,
    unique: true,
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
  items: ItemQuantity[];

  @Prop({
    default: true,
  })
  active: boolean;
}

export const InboundSchema = SchemaFactory.createForClass(Inbound);
