"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsModule = void 0;
const product_entity_1 = require("./entities/product.entity");
const mongoose_1 = require("@nestjs/mongoose");
const common_1 = require("@nestjs/common");
const products_service_1 = require("./products.service");
const products_controller_1 = require("./products.controller");
const product_variant_entity_1 = require("../product_variants/entities/product_variant.entity");
const product_variants_module_1 = require("../product_variants/product_variants.module");
const categories_module_1 = require("../categories/categories.module");
const product_types_module_1 = require("../product_types/product_types.module");
let ProductsModule = class ProductsModule {
};
ProductsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeatureAsync([
                {
                    name: product_entity_1.Product.name,
                    useFactory(productVariantModel) {
                        const ProductSchema = mongoose_1.SchemaFactory.createForClass(product_entity_1.Product);
                        ProductSchema.pre('save', async function () {
                            console.log('Pre Save');
                        });
                        ProductSchema.post('findOneAndDelete', async function (product) {
                            console.log('Post Remove');
                            console.log(product);
                            await productVariantModel.deleteMany({ product: product.id });
                        });
                        ProductSchema.virtual('variants', {
                            ref: 'ProductVariant',
                            foreignField: 'product',
                            localField: '_id',
                        });
                        return ProductSchema;
                    },
                    inject: [(0, mongoose_1.getModelToken)(product_variant_entity_1.ProductVariant.name)],
                    imports: [product_variants_module_1.ProductVariantsModule],
                },
            ]),
            product_variants_module_1.ProductVariantsModule,
            categories_module_1.CategoriesModule,
            product_types_module_1.ProductTypesModule,
        ],
        controllers: [products_controller_1.ProductsController],
        providers: [products_service_1.ProductsService],
        exports: [mongoose_1.MongooseModule],
    })
], ProductsModule);
exports.ProductsModule = ProductsModule;
//# sourceMappingURL=products.module.js.map