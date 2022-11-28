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
exports.ProductImagesService = void 0;
const product_entity_1 = require("../products/entities/product.entity");
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let ProductImagesService = class ProductImagesService {
    constructor(product) {
        this.product = product;
    }
    async update(productId, id, updateProductImagetDto) {
        const product = await this.product.findById(productId);
        const image = product.images.id(id);
        image.set(updateProductImagetDto);
        return await product.save();
    }
    async replaceBatch(productId, images) {
        return await this.product.findByIdAndUpdate(productId, { images });
    }
    async remove(productId, id) {
        const product = await this.product.findById(productId);
        product.images.id(id).remove();
        return await product.save();
    }
};
ProductImagesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(product_entity_1.Product.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], ProductImagesService);
exports.ProductImagesService = ProductImagesService;
//# sourceMappingURL=product_images.service.js.map