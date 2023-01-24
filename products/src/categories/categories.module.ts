import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import { Category, CategorySchema } from './entity/category.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Category.name, schema: CategorySchema },
    ]),
  ],
  controllers: [CategoriesController],
  providers: [CategoriesService],
  exports: [MongooseModule],
})
export class CategoriesModule {}
