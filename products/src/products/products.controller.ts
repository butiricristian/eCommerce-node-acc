import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Role } from '../auth/enums/role.enum';
import { Roles } from '../auth/decorators/roles.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @Roles(Role.Admin)
  async create(@Body() createProductDto: CreateProductDto) {
    return await this.productsService.create(createProductDto);
  }

  @Get()
  @Roles(Role.Admin, Role.Customer)
  async findAll() {
    const products = await this.productsService.findAll();
    return { products };
  }

  @Get(':id')
  @Roles(Role.Admin, Role.Customer)
  async findOne(@Param('id') id: string) {
    return await this.productsService.findOne(id);
  }

  @Patch(':id')
  @Roles(Role.Admin)
  async update(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return await this.productsService.update(id, updateProductDto);
  }

  @Put(':id')
  @Roles(Role.Admin)
  async replace(
    @Param('id') id: string,
    @Body() createProductDto: CreateProductDto,
  ) {
    return await this.productsService.replace(id, createProductDto);
  }

  @Delete(':id')
  @Roles(Role.Admin)
  async remove(@Param('id') id: string) {
    return await this.productsService.remove(id);
  }
}
