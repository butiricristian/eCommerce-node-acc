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
exports.ProductImagesController = void 0;
const update_product_image_dto_1 = require("./dto/update_product_image.dto");
const common_1 = require("@nestjs/common");
const product_images_service_1 = require("./product_images.service");
let ProductImagesController = class ProductImagesController {
    constructor(productImagesService) {
        this.productImagesService = productImagesService;
    }
    async update(productId, id, updateProductImageDto) {
        return await this.productImagesService.update(productId, id, updateProductImageDto);
    }
    async remove(productId, id) {
        return await this.productImagesService.remove(productId, id);
    }
    async replaceBatch(productId, productImages) {
        return await this.productImagesService.replaceBatch(productId, productImages);
    }
};
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('productId')),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, update_product_image_dto_1.UpdateProductImageDto]),
    __metadata("design:returntype", Promise)
], ProductImagesController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('productId')),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], ProductImagesController.prototype, "remove", null);
__decorate([
    (0, common_1.Put)(),
    __param(0, (0, common_1.Param)('productId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Array]),
    __metadata("design:returntype", Promise)
], ProductImagesController.prototype, "replaceBatch", null);
ProductImagesController = __decorate([
    (0, common_1.Controller)('products/:productId/images'),
    __metadata("design:paramtypes", [product_images_service_1.ProductImagesService])
], ProductImagesController);
exports.ProductImagesController = ProductImagesController;
//# sourceMappingURL=product_images.controller.js.map