import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Shop, ShopCreateInput, User } from 'graphql.schema';
import { ProductEntity } from 'product/entities/product.entity';
import { ProductService } from 'product/product.service';
import { getConnection, Repository } from 'typeorm';
import { ShopEntity } from './entities/shop.entity';
import { UserEntity } from '../user/entities/user.entity';
import { UserService } from 'user/user.service';
@Injectable()
export class ShopService {
  constructor(
    @Inject(forwardRef(() => ProductService))
    private productService: ProductService,

    // @Inject(forwardRef(() => UserService))
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,

    @InjectRepository(ShopEntity)
    private readonly shopRepository: Repository<ShopEntity>,
  ) {}

  private toResponseObject(shop: ShopEntity) {
    return {
      ...shop,
      products: shop.products,
    };
  }

  async create(
    data: ShopCreateInput,
    creatingUserId: any,
  ): Promise<ShopEntity> {
    console.log(creatingUserId);
    const userInstance = await this.userRepository.findOne({
      where: {
        id: creatingUserId,
      },
    });

    const createdShop = await this.shopRepository.save({
      ...data,
    });

    // this code adds a member (the user who is creating this
    // Shop) to this newly created Shop
    await getConnection()
      .createQueryBuilder()
      .relation(ShopEntity, 'members')
      .of(createdShop) // you can use just new Shop id as well
      .add(userInstance); // you can use just User id as well

    createdShop.members = await getConnection()
      .createQueryBuilder()
      .relation(ShopEntity, 'members')
      .of(createdShop) // you can use just new Shop id as well
      .loadMany();

    return createdShop;
  }

  async addNewMember(shopId: number, userId: number): Promise<ShopEntity> {
    const userInstance = await this.userRepository.findOne({
      where: {
        id: userId,
      },
    });

    const shopInstance = await this.shopRepository.findOne({
      where: {
        id: shopId,
      },
    });

    // this code adds a new member (the user who is creating this
    // Shop) to this newly created Shop
    await getConnection()
      .createQueryBuilder()
      .relation(ShopEntity, 'members')
      .of(shopInstance) // you can use just new Shop id as well
      .add(userInstance); // you can use just User id as well

    shopInstance.members = await getConnection()
      .createQueryBuilder()
      .relation(ShopEntity, 'members')
      .of(shopInstance) // you can use just new Shop id as well
      .loadMany();

    return shopInstance;
  }

  
  async removeMember(shopId: number, userId: number): Promise<ShopEntity> {
    const userInstance = await this.userRepository.findOne({
      where: {
        id: userId,
      },
    });

    const shopInstance = await this.shopRepository.findOne({
      where: {
        id: shopId,
      },
    });

    // this code adds a new member (the user who is creating this
    // Shop) to this newly created Shop
    await getConnection()
      .createQueryBuilder()
      .relation(ShopEntity, 'members')
      .of(shopInstance) // you can use just new Shop id as well
      .remove(userInstance); // you can use just User id as well

    shopInstance.members = await getConnection()
      .createQueryBuilder()
      .relation(ShopEntity, 'members')
      .of(shopInstance) // you can use just new Shop id as well
      .loadMany();

    return shopInstance;
  }



  findAll(): Promise<ShopEntity[]> {
    return this.shopRepository.find({
      relations: ['products', 'members'],
    });
  }

  findOneById(id: number): Promise<ShopEntity> {
    return this.shopRepository.findOne(id, {
      relations: ['products', 'members'],
    });
  }

  async updateOneById(id: number, data: ShopEntity) {
    let shop = Object.setPrototypeOf(data, {});
    await this.shopRepository.update(id, { ...shop });
    const updatedShop = await this.shopRepository.findOne({
      where: { id },
    });
    return updatedShop;
  }

  async delOneById(id: number) {
    if (await this.shopRepository.delete(id)) {
      return 'Shop Successfully Deleted';
    } else {
      return 'Something went wrong';
    }
  }
}
