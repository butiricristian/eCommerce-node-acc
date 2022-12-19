import {
  Controller,
  Body,
  Patch,
  Param,
  Delete,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ProductVariantsService } from './product_variants.service';
import { CreateProductVariantDto } from './dto/create-product_variant.dto';
import { UpdateProductVariantDto } from './dto/update-product_variant.dto';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../auth/enums/role.enum';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.Admin)
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
