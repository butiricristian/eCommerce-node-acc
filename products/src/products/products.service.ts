import { Product } from './entities/product.entity';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Model } from 'mongoose';

@Injectable()
export class ProductsService {
  constructor(@InjectModel(Product.name) private product: Model<Product>) {}

  async create(createProductDto: CreateProductDto) {
    return await this.product.create(createProductDto);
  }

  async findAll() {
    return await this.product
      .find()
      .populate('categories', 'name')
      .populate('product_type', 'name');
  }

  async findOne(id: string) {
    return await this.product
      .findById(id)
      .populate('categories')
      .populate('product_type')
      .populate('variants');
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    return await this.product.findByIdAndUpdate(id, updateProductDto);
  }

  async replace(id: string, createProductDto: CreateProductDto) {
    return await this.product.findOneAndReplace({ _id: id }, createProductDto);
  }

  async remove(id: string) {
    return await this.product.findByIdAndDelete(id);
  }
}
