import { forwardRef, Module } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { TransactionResolver } from './transaction.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransactionEntity } from './entities/transaction.entity';
import { UserEntity } from 'user/entities/user.entity';
import { ShopEntity } from 'shop/entities/shop.entity';

@Module({
  imports: [
    forwardRef(()=>UserEntity),
    forwardRef(()=>ShopEntity),
    TypeOrmModule.forFeature([TransactionEntity, UserEntity, ShopEntity]),
  ],
  providers: [TransactionResolver, TransactionService]
})
export class TransactionModule {}
