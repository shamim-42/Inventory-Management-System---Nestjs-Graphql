import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ProductEntity } from "product/entities/product.entity";
import { PrimaryColumn, Repository } from "typeorm";
import { CategoryEntity } from "./entities/category.entity";


@Injectable()
export class CategoryService {
    constructor(
        @InjectRepository(CategoryEntity)
        private readonly categoryRepository: Repository<CategoryEntity>,

    ) { }

    create(category: CategoryEntity): Promise<CategoryEntity> {
        return this.categoryRepository.save(category);
    }

    findAll(): Promise<CategoryEntity[]> {
        return this.categoryRepository.find();
    }

    findOneById(id: number): Promise<CategoryEntity> {
        return this.categoryRepository.findOne(id);
    }

    updateOneById(id: number, user: CategoryEntity) {
        user = Object.setPrototypeOf(user, {});
        return this.categoryRepository.update(id, user);
        // const qb = this.userRepository.createQueryBuilder('user');
        // return qb.update(CategoryEntity).setParameters(user).where("user.id = :id", { id: uid }).execute();
    }

    delOneById(uid: number) {
        return this.categoryRepository.delete(uid);
    }
}