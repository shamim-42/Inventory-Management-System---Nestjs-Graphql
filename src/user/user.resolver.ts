import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'shared/auth.gaurd';

import { UserService } from './user.service';
import { UserEntity } from './entities/user.entity';
import { LoginInputData, RegistrationInputData } from 'graphql.schema';
// import { UserEntity } from './entities/user.entity';

@Resolver('UserEntity')
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @UseGuards(new AuthGuard())
  @Query('user')
  async user(@Args('phone') phone: string) {
    return await this.userService.read(phone);
  }

  @Query('userShops')
  @UseGuards(new AuthGuard())
  async userShopList(@Args('userId') userId: Number) {
    return await this.userService.userShops(userId);
  }

  @Query('user')
  @UseGuards(new AuthGuard())
  async whoami(@Context('user') user) {
    const { name } = user;
    return await this.userService.read(name);
  }

  @Mutation()
  async login(@Args('data') data: LoginInputData) {
    // const user: LoginInputData = { data };
    return await this.userService.login(data);
  }

  @Mutation()
  async register(@Args('data') data: RegistrationInputData) {
    // const user: RegistrationInputData = { name, phone, password };
    return await this.userService.register(data);
  }

  // @Mutation('userShops')
  // async usersShopList(
  //   @Args('userId') userId: string,
  //   @Context('user') user: Number
  // ) {
  //   return await this.userService.register(user);
  // }

  // @Mutation('createUser')
  // create(@Args('createUserInput') createUserInput: UserEntity) {
  //   return this.userService.create(createUserInput);
  // }

  @Query('users')
  async findAll() {
    return await this.userService.findAll();
  }

  @Query('user')
  findOne(@Args('id') id: number) {
    return this.userService.findOne(id);
  }

  // @Mutation('updateUser')
  // update(@Args('updateUserInput') updateUserInput: UserEntity) {
  //   return this.userService.update(updateUserInput.id, updateUserInput);
  // }

  // @Mutation('removeUser')
  // remove(@Args('id') id: number) {
  //   return this.userService.remove(id);
  // }
}
