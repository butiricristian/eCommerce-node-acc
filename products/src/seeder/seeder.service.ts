import { ProductVariant } from 'src/product_variants/entities/product_variant.entity';
import { ProductType } from 'src/product_types/entities/product_type.entity';
import { Category } from './../categories/entity/category.entity';
import { Product } from '../products/entities/product.entity';
import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class SeederService {
  constructor(
    @InjectModel(Category.name) private category: Model<Category>,
    @InjectModel(ProductType.name) private productType: Model<ProductType>,
    @InjectModel(Product.name) private product: Model<Product>,
    @InjectModel(ProductVariant.name)
    private productVariant: Model<ProductVariant>,
  ) {}

  async seedCategories() {
    await this.category.deleteMany();
    Logger.log('Seeding categories...');
    await Promise.all([
      this.category.create({ name: 'Clothes' }),
      this.category.create({ name: 'Shoes' }),
      this.category.create({ name: 'Accessories' }),
    ]);
    Logger.log('Seeding categories successful');
  }

  async seedProductTypes() {
    await this.productType.deleteMany();
    Logger.log('Seeding product types...');
    await Promise.all([
      this.productType.create({ name: 'Jackets' }),
      this.productType.create({ name: 'Shirts' }),
      this.productType.create({ name: 'Suits' }),
      this.productType.create({ name: 'Socks' }),
    ]);
    Logger.log('Seeding product types successful');
  }
}
