import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Model, Query, Types } from 'mongoose';
import { Product } from './entities/product.entity';
import { ProductsService } from './products.service';

const projectId = new Types.ObjectId();
const mockProduct = {
  _id: projectId,
  name: 'Test Product',
  description: 'Test Product Description',
  __v: 0,
};

describe('ProductsService', () => {
  let service: ProductsService;
  let product: Model<Product>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        { provide: getModelToken(Product.name), useValue: Model },
        ProductsService,
      ],
    }).compile();

    service = module.get<ProductsService>(ProductsService);
    product = module.get<Model<Product>>(getModelToken(Product.name));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should find all products', async () => {
    const result = [mockProduct];
    const mockQuery = new Query<unknown[], unknown, unknown, Product[]>();
    mockQuery.populate = jest.fn().mockReturnValue({
      populate: jest.fn().mockResolvedValue(result),
    });
    jest.spyOn(product, 'find').mockReturnValue(mockQuery);

    expect(await service.findAll()).toBe(result);
  });

  it('should find product by id', async () => {
    const mockQuery = new Query<unknown[], unknown, unknown, Product[]>();
    mockQuery.populate = jest.fn().mockReturnValue({
      populate: jest.fn().mockReturnValue({
        populate: jest.fn().mockResolvedValue(mockProduct),
      }),
    });
    product.findById = jest.fn().mockReturnValue(mockQuery);

    expect(await service.findOne(projectId.toString())).toBe(mockProduct);
    expect(product.findById).toHaveBeenCalledWith(projectId.toString());
  });
});
