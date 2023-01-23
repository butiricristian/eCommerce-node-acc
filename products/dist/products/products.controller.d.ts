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
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
export declare class ProductsController {
    private readonly productsService;
    constructor(productsService: ProductsService);
    create(createProductDto: CreateProductDto): Promise<import("mongoose").Document<unknown, any, import("./entities/product.entity").Product> & import("./entities/product.entity").Product & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    findAll(): Promise<{
        products: Omit<Omit<import("mongoose").Document<unknown, any, import("./entities/product.entity").Product> & import("./entities/product.entity").Product & {
            _id: import("mongoose").Types.ObjectId;
        }, never>, never>[];
    }>;
    findOne(id: string): Promise<import("mongoose").Document<unknown, any, import("./entities/product.entity").Product> & import("./entities/product.entity").Product & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    update(id: string, updateProductDto: UpdateProductDto): Promise<import("mongoose").Document<unknown, any, import("./entities/product.entity").Product> & import("./entities/product.entity").Product & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    replace(id: string, createProductDto: CreateProductDto): Promise<import("mongoose").Document<unknown, any, import("./entities/product.entity").Product> & import("./entities/product.entity").Product & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    remove(id: string): Promise<import("mongoose").Document<unknown, any, import("./entities/product.entity").Product> & import("./entities/product.entity").Product & {
        _id: import("mongoose").Types.ObjectId;
    }>;
}
