import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  timestamps: true,
})
export class Item {
  @Prop()
  sku: string;

  @Prop()
  name: string;
}

export const ItemSchema = SchemaFactory.createForClass(Item);
