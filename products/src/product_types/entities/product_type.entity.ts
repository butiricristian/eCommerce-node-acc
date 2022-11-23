import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class ProductType {
  @Prop()
  name: string;

  @Prop()
  description: string;
}

export const ProductTypeSchema = SchemaFactory.createForClass(ProductType);
