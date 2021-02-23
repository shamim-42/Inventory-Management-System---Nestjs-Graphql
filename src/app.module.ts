import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { join } from 'path';
import { ProductModule } from './product/product.module';
// import { ShopModule } from '../shop/shop.module';
// import { CategoryModule } from '../category/category.module';
import * as path from 'path';
import { UserModule } from 'user/user.module';
import { ShopModule } from 'shop/shop.module';
import { CategoryModule } from 'category/category.module';
import { TransactionModule } from './transaction/transaction.module';
require('dotenv').config();

@Module({
  imports: [
    TypeOrmModule.forRoot({
      name: 'default',
      type: 'mysql',
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      synchronize: true,
      dropSchema: false,
      logging: true,
      // entities: ['*/**/*.entity.ts', 'dist/**/*.entity.js'],
      entities: [path.join(__dirname, '**/*.entity{.ts,.js}')],
    }),
    GraphQLModule.forRoot({
      debug: true,
      playground: true,
      typePaths: ['./**/*.graphql'],
      definitions: {
        path: join(process.cwd(), 'src/graphql.schema.ts'),
        outputAs: 'class',
      },
      context: ({ req }) => ({ headers: req.headers }),
    }),
    UserModule,
    ProductModule,
    ShopModule,
    CategoryModule,
    TransactionModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
