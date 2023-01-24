import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Model } from 'mongoose';
import { Product } from '../products/entities/product.entity';
import { ProductVariant } from './entities/product_variant.entity';
import { ProductVariantsService } from './product_variants.service';

describe('ProductVariantsService', () => {
  let service: ProductVariantsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        { provide: getModelToken(Product.name), useValue: Model },
        { provide: getModelToken(ProductVariant.name), useValue: Model },
        ProductVariantsService,
      ],
    }).compile();

    service = module.get<ProductVariantsService>(ProductVariantsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
