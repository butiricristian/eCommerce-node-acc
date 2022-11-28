import { CreateProductImageDto } from './dto/create_product_image.dto';
import { UpdateProductImageDto } from './dto/update_product_image.dto';
import { Product } from 'src/products/entities/product.entity';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class ProductImagesService {
  constructor(
    @InjectModel(Product.name)
    private product: Model<Product>,
  ) {}

  async update(
    productId: string,
    id: string,
    updateProductImagetDto: UpdateProductImageDto,
  ) {
    const product = await this.product.findById(productId);
    const image = product.images.id(id);
    image.set(updateProductImagetDto);
    return await product.save();
  }

  async replaceBatch(productId: string, images: CreateProductImageDto[]) {
    return await this.product.findByIdAndUpdate(productId, { images });
  }

  async remove(productId: string, id: string) {
    const product = await this.product.findById(productId);
    product.images.id(id).remove();
    return await product.save();
  }
}
