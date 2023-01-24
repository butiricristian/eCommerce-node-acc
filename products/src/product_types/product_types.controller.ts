import { Controller } from '@nestjs/common';
import { ProductTypesService } from './product_types.service';

@Controller('product-types')
export class ProductTypesController {
  constructor(private readonly productTypesService: ProductTypesService) {}
}
