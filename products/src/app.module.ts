import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { CategoriesModule } from './categories/categories.module';
import { ProductTypesModule } from './product_types/product_types.module';
import { ProductVariantsModule } from './product_variants/product_variants.module';
import { CommonModule } from './common/common.module';

@Module({
  imports: [
    CommonModule,
    ProductsModule,
    CategoriesModule,
    ProductTypesModule,
    ProductVariantsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
