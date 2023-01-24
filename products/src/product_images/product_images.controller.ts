import { UpdateProductImageDto } from './dto/update_product_image.dto';
import { CreateProductImageDto } from './dto/create_product_image.dto';
import {
  Controller,
  Body,
  Patch,
  Param,
  Delete,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ProductImagesService } from './product_images.service';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../auth/enums/role.enum';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.Admin)
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
