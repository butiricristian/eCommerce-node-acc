import { Controller, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { ProductVariantsService } from './product_variants.service';
import { CreateProductVariantDto } from './dto/create-product_variant.dto';
import { UpdateProductVariantDto } from './dto/update-product_variant.dto';

@Controller('products/:productId/variants')
export class ProductVariantsController {
  constructor(
    private readonly productVariantsService: ProductVariantsService,
  ) {}

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateProductVariantDto: UpdateProductVariantDto,
  ) {
    return await this.productVariantsService.update(
      id,
      updateProductVariantDto,
    );
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.productVariantsService.remove(id);
  }

  @Put()
  async replaceBatch(
    @Param('productId') productId: string,
    @Body() productVariants: CreateProductVariantDto[],
  ) {
    return await this.productVariantsService.replaceBatch(
      productId,
      productVariants,
    );
  }
}
