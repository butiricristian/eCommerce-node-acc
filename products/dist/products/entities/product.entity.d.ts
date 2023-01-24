import { HydratedDocument, Types } from 'mongoose';
import { Category } from 'src/categories/entity/category.entity';
import { ProductImage } from 'src/product_images/entities/product_image.entity';
import { ProductType } from 'src/product_types/entities/product_type.entity';
import { ProductVariant } from 'src/product_variants/entities/product_variant.entity';
export type ProductDocument = HydratedDocument<Product>;
export declare class Product {
    name: string;
    description: string;
    brand: string;
    product_type: ProductType;
    categories: Category[];
    variants: ProductVariant[];
    images: Types.DocumentArray<ProductImage>;
}
