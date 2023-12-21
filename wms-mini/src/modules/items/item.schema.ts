import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  timestamps: true,
})
export class Item {
  @Prop()
  sku: string;

  @Prop()
  name: string;

  @Prop({
    default: 0,
  })
  inventory: number;

  @Prop({
    default: 0,
  })
  availableInventory: number;
}

export const ItemSchema = SchemaFactory.createForClass(Item);
