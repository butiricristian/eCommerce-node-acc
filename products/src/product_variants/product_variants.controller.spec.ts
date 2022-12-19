import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Model } from 'mongoose';
import { Product } from '../products/entities/product.entity';
import { ProductVariant } from './entities/product_variant.entity';
import { ProductVariantsController } from './product_variants.controller';
import { ProductVariantsService } from './product_variants.service';

describe('ProductVariantsController', () => {
  let controller: ProductVariantsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductVariantsController],
      providers: [
        { provide: getModelToken(Product.name), useValue: Model },
        { provide: getModelToken(ProductVariant.name), useValue: Model },
        ProductVariantsService,
      ],
    }).compile();

    controller = module.get<ProductVariantsController>(
      ProductVariantsController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
