import { ShopEntity } from 'shop/entities/shop.entity';
import {
  Column,
  Entity,
  Generated,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from 'user/entities/user.entity';

export enum modeOfPayment {
  CASH = 'CASH',
  POS = 'POS',
  CASH_AND_POS = 'CASH_AND_POS',
}
@Entity()
export class TransactionEntity {
  @PrimaryGeneratedColumn()
  id: Number;

  @Column()
  @Generated('uuid')
  receipt_number: string;

  @Column({
    type: 'enum',
    enum: modeOfPayment,
    default: modeOfPayment.CASH,
  })
  mode_of_payment: modeOfPayment;

  @Column({ type: 'float' })
  cumulative_amount: Number;

  @Column({ type: 'float' })
  amount_tendered: Number;

  @Column({ type: 'float', default: 0 })
  change_due: Number;

  @Column({ type: 'float', default: 0 })
  vat_percentage: Number;

  @Column({ type: 'float' })
  vat_value: Number;

  @Column({ type: 'float', default: 0 })
  discount_percentage: Number;

  @Column({ type: 'float' })
  discount_value: Number;

  @Column({ type: 'integer', default: 0 })
  total_items: Number;

  @Column({ type: 'varchar', nullable: true })
  customer_phone: String;

  @Column({ type: 'varchar', nullable: true })
  customer_email: String;

  @Column({ type: 'bool', default: false })
  soft_removed: Boolean;

  // Below are the relation columns

  @ManyToOne((type) => UserEntity, (user) => user.created_transactions)
  created_by: UserEntity[];

  @ManyToOne((type) => UserEntity, (user) => user.updated_transactions)
  updated_by: UserEntity[];

  @ManyToOne((type) => UserEntity, (user) => user.removed_transactions)
  removed_by: UserEntity[];

  @ManyToOne((type) => ShopEntity, (shop) => shop.selling_transactions, {
    cascade: true,
  })
  seller_shop: ShopEntity[];

  @ManyToOne((type) => ShopEntity, (shop) => shop.buying_transactions, {
    cascade: true,
  })
  buyer_shop: ShopEntity[];
}
