"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SeederModule = void 0;
const categories_module_1 = require("../categories/categories.module");
const products_module_1 = require("./../products/products.module");
const common_1 = require("@nestjs/common");
const seeder_service_1 = require("./seeder.service");
const common_module_1 = require("../common/common.module");
const product_types_module_1 = require("../product_types/product_types.module");
const product_variants_module_1 = require("../product_variants/product_variants.module");
let SeederModule = class SeederModule {
};
SeederModule = __decorate([
    (0, common_1.Module)({
        imports: [
            common_module_1.CommonModule,
            categories_module_1.CategoriesModule,
            product_types_module_1.ProductTypesModule,
            products_module_1.ProductsModule,
            product_variants_module_1.ProductVariantsModule,
        ],
        providers: [seeder_service_1.SeederService],
    })
], SeederModule);
exports.SeederModule = SeederModule;
//# sourceMappingURL=seeder.module.js.map