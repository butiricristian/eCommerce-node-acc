import { ProductVariant } from 'src/product_variants/entities/product_variant.entity';
import { ProductType } from 'src/product_types/entities/product_type.entity';
import { Category } from './../categories/entity/category.entity';
import { Product } from '../products/entities/product.entity';
import { Model } from 'mongoose';
export declare class SeederService {
    private category;
    private productType;
    private product;
    private productVariant;
    constructor(category: Model<Category>, productType: Model<ProductType>, product: Model<Product>, productVariant: Model<ProductVariant>);
    seedCategories(): Promise<void>;
    seedProductTypes(): Promise<void>;
}
