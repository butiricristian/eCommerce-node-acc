import { Product } from './entities/product.entity';
import { getModelToken, MongooseModule, SchemaFactory } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { ProductVariant } from 'src/product_variants/entities/product_variant.entity';
import { Model } from 'mongoose';
import { ProductVariantsModule } from 'src/product_variants/product_variants.module';
import { CategoriesModule } from 'src/categories/categories.module';
import { ProductTypesModule } from 'src/product_types/product_types.module';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: Product.name,
        useFactory(productVariantModel: Model<ProductVariant>) {
          const ProductSchema = SchemaFactory.createForClass(Product);
          ProductSchema.pre('save', async function () {
            console.log('Pre Save');
          });
          ProductSchema.post('findOneAndDelete', async function (product) {
            console.log('Post Remove');
            console.log(product);
            await productVariantModel.deleteMany({ product: product.id });
          });
          ProductSchema.virtual('variants', {
            ref: 'ProductVariant',
            foreignField: 'product',
            localField: '_id',
          });

          return ProductSchema;
        },
        inject: [getModelToken(ProductVariant.name)],
        imports: [ProductVariantsModule],
      },
    ]),
    ProductVariantsModule,
    CategoriesModule,
    ProductTypesModule,
  ],
  controllers: [ProductsController],
  providers: [ProductsService],
  exports: [MongooseModule],
})
export class ProductsModule {}
