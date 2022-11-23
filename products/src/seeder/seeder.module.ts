import {
  ProductVariant,
  ProductVariantSchema,
} from 'src/product_variants/entities/product_variant.entity';
import {
  ProductType,
  ProductTypeSchema,
} from 'src/product_types/entities/product_type.entity';
import {
  Category,
  CategorySchema,
} from 'src/categories/entity/category.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { Product, ProductSchema } from 'src/products/entities/product.entity';
import { SeederService } from './seeder.service';
import { CommonModule } from 'src/common/common.module';

@Module({
  imports: [
    CommonModule,
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
    MongooseModule.forFeature([
      { name: Category.name, schema: CategorySchema },
    ]),
    MongooseModule.forFeature([
      { name: ProductType.name, schema: ProductTypeSchema },
    ]),
    MongooseModule.forFeature([
      { name: ProductVariant.name, schema: ProductVariantSchema },
    ]),
  ],
  providers: [SeederService],
})
export class SeederModule {}
