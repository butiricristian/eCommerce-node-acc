import mongoose, { HydratedDocument } from 'mongoose';
import { Product } from 'src/products/entities/product.entity';
export type ProductDocument = HydratedDocument<ProductVariant>;
export declare class ProductVariant {
    brand: string;
    size: string;
    color: string;
    sku: string;
    product: Product;
}
export declare const ProductVariantSchema: mongoose.Schema<ProductVariant, mongoose.Model<ProductVariant, any, any, any, any>, {}, {}, {}, {}, "type", ProductVariant>;
