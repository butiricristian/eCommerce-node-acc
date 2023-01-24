import { Global, Module } from '@nestjs/common';
import { ProductVariantsService } from './product_variants.service';
import { ProductVariantsController } from './product_variants.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  ProductVariant,
  ProductVariantSchema,
} from './entities/product_variant.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ProductVariant.name, schema: ProductVariantSchema },
    ]),
  ],
  controllers: [ProductVariantsController],
  providers: [ProductVariantsService],
  exports: [MongooseModule],
})
export class ProductVariantsModule {}
