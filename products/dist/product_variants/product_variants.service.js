"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductVariantsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const product_variant_entity_1 = require("./entities/product_variant.entity");
let ProductVariantsService = class ProductVariantsService {
    constructor(productVariant) {
        this.productVariant = productVariant;
    }
    async update(id, updateProductVariantDto) {
        return await this.productVariant.findByIdAndUpdate(id, updateProductVariantDto);
    }
    async replaceBatch(productId, productVariants) {
        await this.productVariant.deleteMany({ product: productId });
        const productVariantPromises = productVariants.map((pv) => this.productVariant.create(Object.assign(Object.assign({}, pv), { product: productId })));
        return await Promise.all(productVariantPromises);
    }
    async remove(id) {
        return await this.productVariant.findByIdAndDelete(id);
    }
};
ProductVariantsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(product_variant_entity_1.ProductVariant.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], ProductVariantsService);
exports.ProductVariantsService = ProductVariantsService;
//# sourceMappingURL=product_variants.service.js.map