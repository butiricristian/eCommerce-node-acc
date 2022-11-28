import { CategoriesModule } from 'src/categories/categories.module';
import { ProductsModule } from './../products/products.module';
import { Module } from '@nestjs/common';
import { SeederService } from './seeder.service';
import { CommonModule } from 'src/common/common.module';
import { ProductTypesModule } from 'src/product_types/product_types.module';
import { ProductVariantsModule } from 'src/product_variants/product_variants.module';

@Module({
  imports: [
    CommonModule,
    CategoriesModule,
    ProductTypesModule,
    ProductsModule,
    ProductVariantsModule,
  ],
  providers: [SeederService],
})
export class SeederModule {}
