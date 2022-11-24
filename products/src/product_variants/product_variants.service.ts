import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ProductsService } from 'src/products/products.service';
import { CreateProductVariantDto } from './dto/create-product_variant.dto';
import { UpdateProductVariantDto } from './dto/update-product_variant.dto';
import { ProductVariant } from './entities/product_variant.entity';

@Injectable()
export class ProductVariantsService {
  constructor(
    @InjectModel(ProductVariant.name)
    private productVariant: Model<ProductVariant>,
  ) {}

  async update(id: string, updateProductVariantDto: UpdateProductVariantDto) {
    return await this.productVariant.findByIdAndUpdate(
      id,
      updateProductVariantDto,
    );
  }

  async replaceBatch(
    productId: string,
    productVariants: CreateProductVariantDto[],
  ) {
    await this.productVariant.deleteMany({ product: productId });
    const productVariantPromises = productVariants.map((pv) =>
      this.productVariant.create({ ...pv, product: productId }),
    );
    return await Promise.all(productVariantPromises);
  }

  async remove(id: string) {
    return await this.productVariant.findByIdAndDelete(id);
  }
}
