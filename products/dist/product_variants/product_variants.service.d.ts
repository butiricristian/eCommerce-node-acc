/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose/types/inferschematype" />
import { Model } from 'mongoose';
import { CreateProductVariantDto } from './dto/create-product_variant.dto';
import { UpdateProductVariantDto } from './dto/update-product_variant.dto';
import { ProductVariant } from './entities/product_variant.entity';
export declare class ProductVariantsService {
    private productVariant;
    constructor(productVariant: Model<ProductVariant>);
    update(id: string, updateProductVariantDto: UpdateProductVariantDto): Promise<import("mongoose").Document<unknown, any, ProductVariant> & ProductVariant & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    replaceBatch(productId: string, productVariants: CreateProductVariantDto[]): Promise<(import("mongoose").Document<unknown, any, ProductVariant> & ProductVariant & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
    remove(id: string): Promise<import("mongoose").Document<unknown, any, ProductVariant> & ProductVariant & {
        _id: import("mongoose").Types.ObjectId;
    }>;
}
