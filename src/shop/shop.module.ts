import { forwardRef, Module } from '@nestjs/common';
import { ShopService } from './shop.service';
import { ShopResolver } from './shop.resolver';
import { ProductModule } from 'product/product.module';
import { ProductService } from 'product/product.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShopEntity } from './entities/shop.entity';
import { ProductEntity } from 'product/entities/product.entity';
import { UserModule } from 'user/user.module';
import { UserEntity } from 'user/entities/user.entity';

@Module({
  imports: [
    forwardRef(() => ProductModule),
    forwardRef(() => UserModule),
    TypeOrmModule.forFeature([
      ShopEntity,
      ProductEntity,
      UserEntity
    ])
  ],
  providers: [ShopResolver, ShopService,
  ],
  exports: [ShopService, ShopResolver],
})
export class ShopModule {}
