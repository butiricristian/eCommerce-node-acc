import { Product, ProductSchema } from './entities/product.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import {
  Category,
  CategorySchema,
} from 'src/categories/entity/category.entity';
import {
  ProductType,
  ProductTypeSchema,
} from 'src/product_types/entities/product_type.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Category.name, schema: CategorySchema },
    ]),
    MongooseModule.forFeature([
      { name: ProductType.name, schema: ProductTypeSchema },
    ]),
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
  ],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
