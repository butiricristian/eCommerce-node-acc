import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ProductDocument = HydratedDocument<ProductVariant>;

@Schema()
export class ProductVariant {
  @Prop()
  brand: string;

  @Prop()
  size: string;

  @Prop()
  color: string;

  @Prop()
  sku: string;
}

export const ProductVariantSchema =
  SchemaFactory.createForClass(ProductVariant);
