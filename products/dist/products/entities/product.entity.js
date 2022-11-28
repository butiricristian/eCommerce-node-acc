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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const product_image_entity_1 = require("../../product_images/entities/product_image.entity");
const product_type_entity_1 = require("../../product_types/entities/product_type.entity");
let Product = class Product {
};
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Product.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Product.prototype, "description", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Product.prototype, "brand", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.default.Schema.Types.ObjectId, ref: 'ProductType' }),
    __metadata("design:type", product_type_entity_1.ProductType)
], Product.prototype, "product_type", void 0);
__decorate([
    (0, mongoose_1.Prop)([{ type: mongoose_2.default.Schema.Types.ObjectId, ref: 'Category' }]),
    __metadata("design:type", Array)
], Product.prototype, "categories", void 0);
__decorate([
    (0, mongoose_1.Prop)([product_image_entity_1.ProductImage]),
    __metadata("design:type", mongoose_2.Types.DocumentArray)
], Product.prototype, "images", void 0);
Product = __decorate([
    (0, mongoose_1.Schema)({
        toJSON: {
            virtuals: true,
        },
    })
], Product);
exports.Product = Product;
//# sourceMappingURL=product.entity.js.map