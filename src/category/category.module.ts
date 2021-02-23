import { forwardRef, Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryResolver } from './category.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryEntity } from './entities/category.entity';
import { ProductEntity } from 'product/entities/product.entity';
import { ProductModule } from 'product/product.module';

@Module({
  imports: [
    forwardRef(() => ProductModule),
    TypeOrmModule.forFeature([CategoryEntity, ProductEntity]),
  ],
  providers: [CategoryResolver, CategoryService],
  exports: [CategoryResolver, CategoryService]
})
export class CategoryModule {}