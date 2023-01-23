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
exports.ProductsService = void 0;
const product_entity_1 = require("./entities/product.entity");
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let ProductsService = class ProductsService {
    constructor(product) {
        this.product = product;
    }
    async create(createProductDto) {
        return await this.product.create(createProductDto);
    }
    async findAll() {
        return await this.product
            .find()
            .populate('categories', 'name')
            .populate('product_type', 'name');
    }
    async findOne(id) {
        return await this.product
            .findById(id)
            .populate('categories')
            .populate('product_type')
            .populate('variants');
    }
    async update(id, updateProductDto) {
        return await this.product.findByIdAndUpdate(id, updateProductDto);
    }
    async replace(id, createProductDto) {
        return await this.product.findOneAndReplace({ _id: id }, createProductDto);
    }
    async remove(id) {
        return await this.product.findByIdAndDelete(id);
    }
};
ProductsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(product_entity_1.Product.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], ProductsService);
exports.ProductsService = ProductsService;
//# sourceMappingURL=products.service.js.map