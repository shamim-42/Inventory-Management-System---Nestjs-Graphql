import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ShopEntity } from '../shop/entities/shop.entity';
import { ShopModule } from '../shop/shop.module';
import { ShopService } from '../shop/shop.service';
import { getConnection, In, Repository } from 'typeorm';
import { ProductEntity } from './entities/product.entity';
import { CategoryService } from 'category/category.service';
import { CategoryEntity } from 'category/entities/category.entity';
import { ProductCreateInput } from 'graphql.schema';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,

    @InjectRepository(ShopEntity)
    private readonly shopRepository: Repository<ShopEntity>,

    @InjectRepository(CategoryEntity)
    private readonly categoryRepository: Repository<CategoryEntity>,
  ) {}

  private toResponseObject(product: ProductEntity) {
    return {
      ...product,
      shop: product.shop,
      categories: product.categories,
    };
  }

  // async create(data: ProductEntity, shopId: Number): Promise<ProductEntity> {
  async create(
    data: ProductCreateInput,
    shopId: number,
    categoryIds: number[],
  ): Promise<any> {
    const shop = await this.shopRepository.findOne(shopId);
    const createdProduct = await this.productRepository.save({
      ...data,
      shop: shop,
    });

    // CategoryEntity is connected with Product as ManyToMany. So
    // during saving the product we couldn't add the categories unlike shop.
    // Now it is time to add the categories with the saved product
    const categorisIds = categoryIds;
    const categories = await this.categoryRepository.find({
      where: { id: In(categorisIds) },
    });

    await getConnection()
      .createQueryBuilder()
      .relation(ProductEntity, 'categories')
      .of(createdProduct)
      .add(categories);

    // await this.productRepository.save(createdProduct);
    // return this.toResponseObject(createdProduct);
    return await this.productRepository.findOne({
      where: {
        id: createdProduct.id,
      },
      relations: ['categories', 'shop'],
    });
  }

  findAll(): Promise<ProductEntity[]> {
    return this.productRepository.find({
      relations: ['shop'],
    });
  }

  findOne(id: number): Promise<ProductEntity> {
    return this.productRepository.findOne({
      where: {
        id: id,
      },
      relations: ['shop', 'categories'],
    });
  }

  async updateOneById(id: number, data: ProductEntity) {
    console.log(data);
    let product = Object.setPrototypeOf(data, null);
    await this.productRepository.update(id, { ...product });
    return this.productRepository.findOne({
      where: { id },
      relations: ['categories', 'shop'],
    });
  }

  async delOneById(id: number) {
    if (await this.productRepository.delete(id)) {
      return 'Product Successfully Deleted';
    } else {
      return 'Something went wrong';
    }

  }
}
