import { Prop, Schema } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, Types } from 'mongoose';
import { Category } from 'src/categories/entity/category.entity';
import { ProductImage } from 'src/product_images/entities/product_image.entity';
import { ProductType } from 'src/product_types/entities/product_type.entity';
import { ProductVariant } from 'src/product_variants/entities/product_variant.entity';

export type ProductDocument = HydratedDocument<Product>;

@Schema({
  toJSON: {
    virtuals: true,
  },
})
export class Product {
  @Prop()
  name: string;

  @Prop()
  description: string;

  @Prop()
  brand: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'ProductType' })
  product_type: ProductType;

  @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: 'Category' }])
  categories: Category[];

  variants: ProductVariant[];

  @Prop([ProductImage])
  images: Types.DocumentArray<ProductImage>;
}
