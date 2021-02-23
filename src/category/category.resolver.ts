import { forwardRef, Inject } from "@nestjs/common";
import { Query, Mutation, Resolver } from "@nestjs/graphql";
import { InjectRepository } from "@nestjs/typeorm";
import { CategoryService } from "./category.service";
import { CategoryEntity } from "./entities/category.entity";

@Resolver('Categories')
export class CategoryResolver {
    constructor(
        // @Inject(forwardRef(() => CategoryService))
        private readonly categoryService: CategoryService,
    ) { }

    @Query('categories')
    async getCategories() {
        return await this.categoryService.findAll();
    }


    @Query('category')
    async findOneById(obj, args, context, info): Promise<CategoryEntity> {
        const id = args['id']
        return await this.categoryService.findOneById(id);
    }

    @Mutation('createCategory')
    async create(obj, args: { data: CategoryEntity }, context, info): Promise<CategoryEntity> {
        return this.categoryService.create(args.data);
    }

    @Mutation('updateCategory')
    async updateUser(obj, args: { id: number, category: CategoryEntity }, context, info): Promise<any> {
        return await this.categoryService.updateOneById(args.id, args.category);
    }

    @Mutation('delCategory')
    async delCategory(obj, args: { id: number }, context, info): Promise<any> {
        return await this.categoryService.delOneById(args.id);
    }

}