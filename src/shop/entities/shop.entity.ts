import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from '../../user/entities/user.entity';
import { ProductEntity } from '../../product/entities/product.entity';
import { TransactionEntity } from 'transaction/entities/transaction.entity';

@Entity()
export class ShopEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 128 })
  name: string;

  @Column({ length: 1028, nullable: true })
  description: string;

  @Column({ length: 1028, nullable: true })
  logo: string;

  @Column({
    length: 1028,
    nullable: true,
  })
  banner: string;

  @OneToMany((type) => ProductEntity, (product) => product.shop)
  products: ProductEntity[];


  @OneToMany(
    (type) => TransactionEntity,
    (transaction) => transaction.seller_shop,
    // {cascade: true}
  )
  selling_transactions: TransactionEntity[];


  @OneToMany(
    (type) => TransactionEntity,
    (transaction) => transaction.buyer_shop,
    // {
    //     cascade: true
    // }
  )
  buying_transactions: TransactionEntity[];


  @ManyToMany(
    (type) => UserEntity,
    (user) => {
      return user.shops, { cascade: true };
    },
  )
  @JoinTable() // @JoinTable() can be used in only one side of a ManyToMany relation. We are using here, So can't be used in the other side (UserEntity)
  members: UserEntity[];

  @ManyToOne((type) => UserEntity)
  @JoinColumn() // this decorator is optional for @ManyToOne, but required for @OneToOne
  created_by: UserEntity;
}
