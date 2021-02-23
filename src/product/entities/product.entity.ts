// import { Shop } from "../shop/entities/shop.entity";
import { CategoryEntity } from "category/entities/category.entity";
import { Product } from "graphql.schema";
import { ShopEntity } from "shop/entities/shop.entity";
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ProductEntity {
    @PrimaryGeneratedColumn() id: number;

    @Column({ length: 255 })
    name: string;

    @Column({ length: 64 })
    code: string;

    @Column({ nullable: false })
    unit_price: number;

    @Column({ default: 0 })
    stock: number;

    @Column({ length: 255 })
    description: string;

    @ManyToOne(type => ShopEntity, shop => shop.products)
    @JoinColumn() // this decorator is optional for @ManyToOne, but required for @OneToOne
    shop: ShopEntity

    @ManyToMany(type => CategoryEntity, products=>products.products)
    @JoinTable() // @JoinTable decorator is required at least one side of ManyToMany
    categories: CategoryEntity[]
}