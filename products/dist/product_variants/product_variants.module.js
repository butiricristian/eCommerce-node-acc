"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductVariantsModule = void 0;
const common_1 = require("@nestjs/common");
const product_variants_service_1 = require("./product_variants.service");
const product_variants_controller_1 = require("./product_variants.controller");
const mongoose_1 = require("@nestjs/mongoose");
const product_variant_entity_1 = require("./entities/product_variant.entity");
let ProductVariantsModule = class ProductVariantsModule {
};
ProductVariantsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: product_variant_entity_1.ProductVariant.name, schema: product_variant_entity_1.ProductVariantSchema },
            ]),
        ],
        controllers: [product_variants_controller_1.ProductVariantsController],
        providers: [product_variants_service_1.ProductVariantsService],
        exports: [mongoose_1.MongooseModule],
    })
], ProductVariantsModule);
exports.ProductVariantsModule = ProductVariantsModule;
//# sourceMappingURL=product_variants.module.js.map