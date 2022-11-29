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
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/enums/role.enum';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('products/:productId/images')
export class ProductImagesController {
  constructor(private readonly productImagesService: ProductImagesService) {}

  @Patch(':id')
  @Roles(Role.Admin)
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
  @Roles(Role.Admin)
  async remove(@Param('productId') productId: string, @Param('id') id: string) {
    return await this.productImagesService.remove(productId, id);
  }

  @Put()
  @Roles(Role.Admin)
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
