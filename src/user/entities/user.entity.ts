import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert, CreateDateColumn, ManyToMany, JoinTable, OneToMany, JoinColumn } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { ShopEntity } from 'shop/entities/shop.entity';
import { TransactionEntity } from 'transaction/entities/transaction.entity';
@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn() id: number;

  @Column({ length: 64 })
  name: string;

  @Column({ length: 32, type: 'varchar' })
  phone: string;

  @Column({ length: 64, type: 'varchar', nullable: true })
  email: string;

  @Column({ length: 64 })
  password: string;

  @CreateDateColumn()
  created: Date;

  @ManyToMany(type=>ShopEntity, shop=> shop.members)
  shops: ShopEntity[]

  @OneToMany(type=>TransactionEntity, transaction=> transaction.created_by)
  @JoinColumn()
  created_transactions: TransactionEntity[]

  @OneToMany(type=>TransactionEntity, transaction=> transaction.updated_by)
  @JoinColumn()
  updated_transactions: TransactionEntity[]

  @OneToMany(type=>TransactionEntity, transaction=> transaction.removed_by)
  @JoinColumn()
  removed_transactions: TransactionEntity[]




  ////////////////// Some essentials functions  ////////
  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }

  async comparePassword(attempt: string): Promise<boolean> {
    return await bcrypt.compare(attempt, this.password);
  }

  toResponseObject(showToken: boolean = true): any {
    const { id, created, name, token, phone, email } = this;
    const responseObject: any = {
      id,
      created,
      name,
      phone,
      email
    };

    if (showToken) {
      responseObject.token = token;
    }

    return responseObject;
  }

  private get token(): string {
    const { id, name } = this;

    return jwt.sign(
      {
        id,
        name,
      },
      process.env.SECRET,
      { expiresIn: '1d' },
    );
  }
}

