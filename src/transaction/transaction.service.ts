import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTransactionInput, UpdateTransactionInput } from 'graphql.schema';
import { ShopEntity } from 'shop/entities/shop.entity';
import { ShopService } from 'shop/shop.service';
import { Repository } from 'typeorm';
import { UserEntity } from 'user/entities/user.entity';
import { UserService } from 'user/user.service';
import { TransactionEntity } from './entities/transaction.entity';
import { Connection } from 'typeorm';
@Injectable()
export class TransactionService {
  constructor(
    @InjectRepository(TransactionEntity)
    private readonly transactionRepository: Repository<TransactionEntity>,

    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,

    @InjectRepository(ShopEntity)
    private readonly shopRepository: Repository<ShopEntity>,
  ) {}

  async create(createTransactionInput: any, createdBy: number) {
    let data = createTransactionInput;

    const seller_shop_id = data.seller_shop;
    const buyer_shop_id = data.buyer_shop;
    delete data.seller_shop; // delete the primary key. we need actually the database instance of this id
    delete data.buyer_shop; // delete the primary key. we need actually the database instance of this id

    // lets create instance using PK
    const seller_instance = await this.shopRepository.findOne(seller_shop_id);
    const buyer_instance = await this.shopRepository.findOne(buyer_shop_id);
    const user_instance = await this.userRepository.findOne(createdBy);

    data.seller_shop = seller_instance;
    data.buyer_shop = buyer_instance;
    data.created_by = user_instance;

    const newTransaction = await this.transactionRepository.save({
      ...data,
    });

    return newTransaction;
  }

  async findAll() {
    const k = await this.transactionRepository.find({
      relations: [
        'seller_shop',
        'buyer_shop',
        'created_by',
        'updated_by',
        'removed_by',
      ],
    });
    console.log(k);
    return k;
  }

  async findOne(id: number) {
    return await this.transactionRepository.findOne({
      where: { id },
      relations: [
        'seller_shop',
        'buyer_shop',
        'created_by',
        'updated_by',
        'removed_by',
      ],
    });
  }

  async update(
    id: number,
    updateTransactionInput: UpdateTransactionInput,
    updated_by: number,
  ) {
    const userInstance = await this.userRepository.findOne(updated_by);
    updateTransactionInput['updated_by'] = userInstance;
    await this.transactionRepository.update(id, { ...updateTransactionInput });
    return await this.transactionRepository.findOne({
      where: { id },
      relations: [
        'updated_by',
        'created_by',
        'seller_shop',
        'buyer_shop',
        'removed_by',
      ],
    });
  }

  async remove(id: number, userId: number) {
    const removedBy = await this.userRepository.findOne(userId)
    console.log(removedBy);
    let updated_data = {}
    updated_data['soft_removed'] = true;
    updated_data['removed_by'] = removedBy

    if (
      await this.transactionRepository.update(id, {
       ...updated_data
      })
    ) {
      return 'Transaction Successfully (Soft) removed. (A transaction can never be completely deleted). It is still in the database.';
    } else {
      return 'Something went wrong';
    }
  }
}
