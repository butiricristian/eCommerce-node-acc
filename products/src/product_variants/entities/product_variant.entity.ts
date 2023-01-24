import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Product } from '../../products/entities/product.entity';

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

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Product' })
  product: Product;
}

export const ProductVariantSchema =
  SchemaFactory.createForClass(ProductVariant);
