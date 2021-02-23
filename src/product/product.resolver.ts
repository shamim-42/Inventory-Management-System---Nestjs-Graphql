import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ProductService } from './product.service';

import { ProductEntity } from './entities/product.entity';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from "shared/auth.gaurd";

@Resolver('ProductEntity')
export class ProductResolver {
  constructor(
    // @Inject(forwardRef(() => ShopEntity))
    private readonly productService: ProductService,
  ) {}

  @Query('products')
  async getCategories() {
    return await this.productService.findAll();
  }

  @Query('product')
  async findOne(obj, args, context, info): Promise<ProductEntity> {
    const id = args['id'];
    return await this.productService.findOne(id);
  }

  @Mutation('createProduct')
  @UseGuards(new AuthGuard())
  async create(
    @Args('data') data: any,
    @Args('shopId') shopId: number,
    @Args('categoryIds') categoryIds: number[],
  ): Promise<ProductEntity> {
    return this.productService.create(data, shopId, categoryIds);
  }

  @Mutation('updateProduct')
  @UseGuards(new AuthGuard())
  async updateproduct(
    obj,
    args: { id: number; data: ProductEntity },
    context,
    info,
  ): Promise<any> {
    return await this.productService.updateOneById(args.id, args.data);
  }

  @Mutation('deleteProduct')
  @UseGuards(new AuthGuard())
  async deleteproduct(obj, args: { id: number }, context, info): Promise<any> {
    return await this.productService.delOneById(args.id);
  }
}
