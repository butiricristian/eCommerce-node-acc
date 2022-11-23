import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Category } from 'src/categories/entity/category.entity';
import { ProductType } from 'src/product_types/entities/product_type.entity';
import { ProductVariant } from 'src/product_variants/entities/product_variant.entity';

export type ProductDocument = HydratedDocument<Product>;

@Schema()
export class Product {
  @Prop()
  name: string;

  @Prop()
  description: string;

  @Prop()
  brand: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'ProductType' })
  product_type: ProductType;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category' }] })
  categories: Category[];

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'ProductVariant' }],
  })
  variants: ProductVariant[];
}

export const ProductSchema = SchemaFactory.createForClass(Product);
