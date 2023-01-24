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
exports.SeederService = void 0;
const product_variant_entity_1 = require("../product_variants/entities/product_variant.entity");
const product_type_entity_1 = require("../product_types/entities/product_type.entity");
const category_entity_1 = require("./../categories/entity/category.entity");
const product_entity_1 = require("../products/entities/product.entity");
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let SeederService = class SeederService {
    constructor(category, productType, product, productVariant) {
        this.category = category;
        this.productType = productType;
        this.product = product;
        this.productVariant = productVariant;
    }
    async seedCategories() {
        await this.category.deleteMany();
        common_1.Logger.log('Seeding categories...');
        await Promise.all([
            this.category.create({ name: 'Clothes' }),
            this.category.create({ name: 'Shoes' }),
            this.category.create({ name: 'Accessories' }),
        ]);
        common_1.Logger.log('Seeding categories successful');
    }
    async seedProductTypes() {
        await this.productType.deleteMany();
        common_1.Logger.log('Seeding product types...');
        await Promise.all([
            this.productType.create({ name: 'Jackets' }),
            this.productType.create({ name: 'Shirts' }),
            this.productType.create({ name: 'Suits' }),
            this.productType.create({ name: 'Socks' }),
        ]);
        common_1.Logger.log('Seeding product types successful');
    }
};
SeederService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(category_entity_1.Category.name)),
    __param(1, (0, mongoose_1.InjectModel)(product_type_entity_1.ProductType.name)),
    __param(2, (0, mongoose_1.InjectModel)(product_entity_1.Product.name)),
    __param(3, (0, mongoose_1.InjectModel)(product_variant_entity_1.ProductVariant.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model])
], SeederService);
exports.SeederService = SeederService;
//# sourceMappingURL=seeder.service.js.map