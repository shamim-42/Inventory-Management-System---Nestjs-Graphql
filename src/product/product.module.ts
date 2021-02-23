import { forwardRef, Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductResolver } from './product.resolver';
import { ShopModule } from '../shop/shop.module';
import { ShopService } from '../shop/shop.service';
import { ProductEntity } from './entities/product.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryEntity } from 'category/entities/category.entity';
import { CategoryModule } from 'category/category.module';
import { ShopEntity } from 'shop/entities/shop.entity';
import { UserService } from 'user/user.service';
import { UserModule } from 'user/user.module';
import { UserEntity } from 'user/entities/user.entity';

@Module({
  imports: [
    forwardRef(() => ShopModule),
    forwardRef(() => CategoryModule),
    forwardRef(() => UserModule),

    TypeOrmModule.forFeature([ProductEntity, CategoryEntity, UserEntity, ShopEntity]),
  ],
  providers: [
    ProductResolver,
    ProductService,
    ShopService,
    UserService
  ],
  exports: [ProductResolver, ProductService],
})
export class ProductModule {}
