import { UpdateProductImageDto } from './dto/update_product_image.dto';
import { CreateProductImageDto } from './dto/create_product_image.dto';
import { Controller, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { ProductImagesService } from './product_images.service';

@Controller('products/:productId/images')
export class ProductImagesController {
  constructor(private readonly productImagesService: ProductImagesService) {}

  @Patch(':id')
  async update(
    @Param('productId') productId: string,
    @Param('id') id: string,
    @Body() updateProductImageDto: UpdateProductImageDto,
  ) {
    return await this.productImagesService.update(
      productId,
      id,
      updateProductImageDto,
    );
  }

  @Delete(':id')
  async remove(@Param('productId') productId: string, @Param('id') id: string) {
    return await this.productImagesService.remove(productId, id);
  }

  @Put()
  async replaceBatch(
    @Param('productId') productId: string,
    @Body() productImages: CreateProductImageDto[],
  ) {
    return await this.productImagesService.replaceBatch(
      productId,
      productImages,
    );
  }
}
