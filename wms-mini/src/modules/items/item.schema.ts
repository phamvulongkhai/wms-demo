import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  timestamps: true,
})
export class Item {
  @Prop()
  sku: string;

  @Prop()
  name: string;

  @Prop()
  inventory: number;

  @Prop()
  availableInventory: number;
}

export const ItemSchema = SchemaFactory.createForClass(Item);
