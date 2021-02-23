
/** ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export enum modeOfPayment {
    CASH = "CASH",
    POS = "POS",
    CASH_AND_POS = "CASH_AND_POS"
}

export class CategoryInput {
    category: string;
}

export class ProductCreateInput {
    name: string;
    code: string;
    unit_price: number;
    stock?: number;
    description?: string;
}

export class ProductUpdateInput {
    name?: string;
    code?: string;
    unit_price?: number;
    stock?: number;
    description?: string;
    shop?: number;
}

export class ShopCreateInput {
    name: string;
    description?: string;
    logo?: string;
    banner?: string;
}

export class ShopUpdateInput {
    name?: string;
    description?: string;
    logo?: string;
    banner?: string;
}

export class UserShopCreateInput {
    user?: number;
    shop?: number;
    role?: number;
}

export class CreateTransactionInput {
    mode_of_payment: modeOfPayment;
    cumulative_amount: number;
    amount_tendered: number;
    change_due?: number;
    vat_percentage?: number;
    vat_value: number;
    discount_percentage?: number;
    discount_value: number;
    total_items?: number;
    customer_phone?: string;
    customer_email?: string;
    seller_shop?: number;
    buyer_shop?: number;
}

export class UpdateTransactionInput {
    mode_of_payment?: modeOfPayment;
    cumulative_amount?: number;
    amount_tendered?: number;
    change_due?: number;
    vat_percentage?: number;
    vat_value?: number;
    discount_percentage?: number;
    discount_value?: number;
    total_items?: number;
    customer_phone?: string;
    customer_email?: string;
}

export class LoginInputData {
    phone: string;
    password: string;
}

export class RegistrationInputData {
    name: string;
    phone: string;
    password: string;
}

export class Category {
    id?: number;
    category?: string;
    name?: string;
}

export abstract class IQuery {
    abstract categories(): Category[] | Promise<Category[]>;

    abstract category(id: string): Category | Promise<Category>;

    abstract products(): Product[] | Promise<Product[]>;

    abstract product(id: number): Product | Promise<Product>;

    abstract shops(): Shop[] | Promise<Shop[]>;

    abstract shop(id: number): Shop | Promise<Shop>;

    abstract transactions(): Transaction[] | Promise<Transaction[]>;

    abstract transaction(id: number): Transaction | Promise<Transaction>;

    abstract users(page?: number): User[] | Promise<User[]>;

    abstract user(phone: string): User | Promise<User>;

    abstract userShops(userId: number): User | Promise<User>;

    abstract whoami(): User | Promise<User>;
}

export class CategoryUpdateResponse {
    categoryId?: number;
    message?: string;
    statusCode?: number;
}

export class CategoryDeleteResponse {
    message?: string;
    statusCode?: number;
}

export abstract class IMutation {
    abstract createCategory(data: CategoryInput): Category | Promise<Category>;

    abstract updateCategory(id: string): CategoryUpdateResponse | Promise<CategoryUpdateResponse>;

    abstract delCategory(id: string): CategoryDeleteResponse | Promise<CategoryDeleteResponse>;

    abstract createProduct(data: ProductCreateInput, shopId: number, categoryIds?: number[]): Product | Promise<Product>;

    abstract updateProduct(id: number, data: ProductUpdateInput): Product | Promise<Product>;

    abstract deleteProduct(id: number): string | Promise<string>;

    abstract createShop(data: ShopCreateInput): Shop | Promise<Shop>;

    abstract updateShop(id: number, data: ShopUpdateInput): Shop | Promise<Shop>;

    abstract addMember(shopId: number, userId: number): Shop | Promise<Shop>;

    abstract removeMember(shopId: number, userId: number): Shop | Promise<Shop>;

    abstract deleteShop(id: number): string | Promise<string>;

    abstract createTransaction(data: CreateTransactionInput): Transaction | Promise<Transaction>;

    abstract updateTransaction(id: number, data?: UpdateTransactionInput): Transaction | Promise<Transaction>;

    abstract removeTransaction(id: number): string | Promise<string>;

    abstract login(data?: LoginInputData): Auth | Promise<Auth>;

    abstract register(data?: RegistrationInputData): Auth | Promise<Auth>;
}

export class Product {
    id: number;
    name: string;
    code: string;
    unit_price: number;
    stock?: number;
    description?: string;
    shop?: Shop;
    categories?: Category[];
}

export class Shop {
    id?: number;
    name?: string;
    description?: string;
    logo?: string;
    banner?: string;
    products?: Product[];
    members?: User[];
}

export class Role {
    id?: number;
    role?: string;
}

export class Transaction {
    id: number;
    receipt_number: string;
    mode_of_payment?: modeOfPayment;
    cumulative_amount: number;
    amount_tendered?: number;
    change_due?: number;
    vat_percentage?: number;
    vat_value?: number;
    discount_percentage?: number;
    discount_value?: number;
    total_items?: number;
    customer_phone?: string;
    customer_email?: string;
    soft_removed?: boolean;
    seller_shop?: Shop;
    buyer_shop?: Shop;
    created_by?: User;
    updated_by?: User;
    removed_by?: User;
}

export class User {
    id: number;
    name: string;
    created?: string;
    phone?: string;
    email?: string;
    shops?: Shop[];
}

export class Auth {
    name: string;
    token: string;
}
