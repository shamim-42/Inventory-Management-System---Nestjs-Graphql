import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ShopService } from './shop.service';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'shared/auth.gaurd';
import { ShopEntity } from './entities/shop.entity';
import { ShopCreateInput } from '../graphql.schema';

@Resolver('Shop')
export class ShopResolver {
  constructor(private readonly shopService: ShopService) {}

  @Query('shops')
  @UseGuards(new AuthGuard())
  async getShops(): Promise<ShopEntity[]> {
    return await this.shopService.findAll();
  }

  @Query('shop')
  @UseGuards(new AuthGuard())
  async getShop(obj, args, context, info): Promise<ShopEntity> {
    const { id } = args;
    return await this.shopService.findOneById(id);
  }

  @Mutation('createShop')
  @UseGuards(new AuthGuard())
  async create(
    obj,
    args: { data: ShopCreateInput },
    context,
    info,
  ): Promise<ShopEntity> {
    const newShop = args.data;
    const creatingUserId = context.user.id;
    return this.shopService.create(newShop, creatingUserId);
  }

  @Mutation('addMember')
  @UseGuards(new AuthGuard())
  async addMember(
    obj,
    args: { shopId: number; userId: number },
    context,
    info,
  ): Promise<ShopEntity> {
    const newMember = args.userId;
    const forShop = args.shopId;
    return this.shopService.addNewMember(forShop, newMember);
  }

  @Mutation('removeMember')
  @UseGuards(new AuthGuard())
  async removeMember(
    obj,
    args: { shopId: number; userId: number },
    context,
    info,
  ): Promise<ShopEntity> {
    const newMember = args.userId;
    const forShop = args.shopId;
    return this.shopService.removeMember(forShop, newMember);
  }

  @Mutation('updateShop')
  @UseGuards(new AuthGuard())
  async updateShop(
    obj,
    args: { id: number; data: ShopEntity },
    context,
    info,
  ): Promise<ShopEntity> {
    return await this.shopService.updateOneById(args.id, args.data);
  }

  @Mutation('deleteShop')
  @UseGuards(new AuthGuard())
  async delShop(obj, args: { id: number }, context, info): Promise<any> {
    return await this.shopService.delOneById(args.id);
  }
}
