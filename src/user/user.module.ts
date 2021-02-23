import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { ShopModule } from 'shop/shop.module';
import { TransactionEntity } from 'transaction/entities/transaction.entity';

@Module({
  imports: [forwardRef(() => ShopModule), TypeOrmModule.forFeature([UserEntity, TransactionEntity])],
  providers: [UserResolver, UserService],
  exports: [UserService, UserResolver]
})
export class UserModule {}
