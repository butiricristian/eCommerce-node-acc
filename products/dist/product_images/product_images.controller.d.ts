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
/// <reference types="mongoose" />
/// <reference types="mongoose/types/inferschematype" />
import { UpdateProductImageDto } from './dto/update_product_image.dto';
import { CreateProductImageDto } from './dto/create_product_image.dto';
import { ProductImagesService } from './product_images.service';
export declare class ProductImagesController {
    private readonly productImagesService;
    constructor(productImagesService: ProductImagesService);
    update(productId: string, id: string, updateProductImageDto: UpdateProductImageDto): Promise<import("mongoose").Document<unknown, any, import("../products/entities/product.entity").Product> & import("../products/entities/product.entity").Product & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    remove(productId: string, id: string): Promise<import("mongoose").Document<unknown, any, import("../products/entities/product.entity").Product> & import("../products/entities/product.entity").Product & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    replaceBatch(productId: string, productImages: CreateProductImageDto[]): Promise<import("mongoose").Document<unknown, any, import("../products/entities/product.entity").Product> & import("../products/entities/product.entity").Product & {
        _id: import("mongoose").Types.ObjectId;
    }>;
}
