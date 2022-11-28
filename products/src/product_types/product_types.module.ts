import { Module } from '@nestjs/common';
import { ProductTypesService } from './product_types.service';
import { ProductTypesController } from './product_types.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductType, ProductTypeSchema } from './entities/product_type.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ProductType.name, schema: ProductTypeSchema },
    ]),
  ],
  controllers: [ProductTypesController],
  providers: [ProductTypesService],
  exports: [MongooseModule],
})
export class ProductTypesModule {}
