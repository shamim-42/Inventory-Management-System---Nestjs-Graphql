# Inventory Management System Backend (Nestjs + Graphql)

### You can start your Inventory Management Backend project from here. If you need the whole project (including backend RBAC) with frontend then contact me in my mail.

### How to run

1. Clone the project in your local pc
1. Go to the root directory and open terminal (or powershell)
1. Change the `.env` information according to your database information
1. Create a database with the same name that you wrote in `.env`
1. Run the command `npm install`
1. After installing all of the packages run `npm run start:dev`
1. Now open the browser and go to `localhost:3000/graphql`. If your port number is different in `.env` file then place that specific port instead of 3000
1. Now Enjoy your project with `query` or `mutation` in the graphql playground. Your first task should be creating and User by using `register` mutation. See the graphql query and mutation documentation below for details.

### Description

Authentication implemented with jwt but RBAC (role based access control is not implemented)

### Technology Used

1. Nestjs (JavaScript Backend Framework)
1. Graphql (instead of REST API)
1. JWT based authentication
1. TypeORM (TypeORM is an ORM that can run in NodeJS, Browser, Cordova, PhoneGap, Ionic, React Native, NativeScript, Expo, and Electron platforms and can be used with TypeScript and JavaScript (ES5, ES6, ES7, ES8))
1. Apollo Server Express
1. Mysql (You can use also Postgres as we used an ORM that supports multiple Databases)

### Graphql Query/Mutation Documentation

**1. User Registration.**

```
  mutation{
    register(data: {
      name: "Abdullah Al Mahbub",
      phone: "01234568956",
      password: "abdullah123"
    }){
      name
      token
    }
  }
```

**2. User Login.**

```
  mutation{
    login(data: {
      phone: "01995248464",
      password:"nayeem123"
    }){
      token
      name
    }
  }
```

**3. Get All Users.**

```
  query{
    users{
      name
      id
    }
  }
```

**4. Create New Category.**

```
  mutation{
    createCategory(data: {
      category: "Home Appliance"
    }){
      category
    }
  }
```

**5. Get all Categories.**

```
 query{
    categories{
      id
      category
    }
  }
```

**6. Get a Category Detail.**

```
 query{
  category(id: 1){
    category
    id
  }
}
```

**7. Create any Shop.**

```
  mutation{
    createShop(data: {
      name: "Smart Mobile Factory"
    }){
      name
      members{
        name
      }
    }
  }
```

**8. Update New Shop.**

```
  mutation {
    updateShop(
      id: 15
      data: { name: "Bismillah Car House", logo: "somesite.com/image.jpg"}
    ) {
      logo
        name
    }
  }

```

**9. Get a Shop.**

```
  query{
    shop(id: 3){
      name
      logo
      products{
        name
        code
        id
      }
    }
  }

```

**10. Get all Shop.**

```
  query{
      shops{
        name
        id
        products{
          name
          stock
          unit_price
          code
        }
        members{
          name
          id
          phone
          email
        }
      }
    }

```

**11. Delete a Shop.**

```
  mutation{
      deleteShop(id:1)
  }

```

**12. Create a product.**

```
  mutation {
    createProduct(
      data: {
        name: "Toyota Axio Custom"
        description: "Nice customization with Engineer Hasan"
        unit_price: 2500000
        code: "56259852589632"
        stock: 40
      }
      shopId: 3
      categoryIds: [2,3]
    ) {
      id
      name
      stock
      unit_price
      description
      code
      shop {
        name
        id
      }
      categories{
        category
        id
      }
    }
  }

```

**13. Get All Products.**

```
 query{
      products{
      	id
        name
        code
        stock
        unit_price
        description
        shop{
          id
          name
        }
        categories{
          name
          id
        }
      }
    }

```

**14. Get a Product detail.**

```
 query{
  product(id:1){
    id
    name
    code
    stock
    unit_price
    description
    shop{
      id
      name
    }
    categories{
      name
      id
    }
  }
}

```

**15.Update a product.**

```
 mutation {
  updateProduct(id: 14, data: { name: "Seventeenth Product", shop: 3 }) {
    name
    shop {
      name
      id
    }
    code
  }
}

```

**16.Delete a product.**

```
  mutation{
    deleteProduct(id: 29)
  }


```

**17.Add A member in specific shop.**

```
  mutation{
      addMember(shopId: 3, userId: 1){
        name
        id
        members{
          name
          id
        }
        products{
          name
          categories{
            category
          }
        }
      }
    }
```

**18.Remove A member from any specific shop.**

```
  mutation{
      removeMember(shopId: 3, userId: 1){
        name
        members{
          name
          id
        }
      }
    }
```

**19.Create a transaction between two Shop. (We would request to create a shop (like `Anonymous Shop`) for all general anonymous customers.**

```
  mutation{
  createTransaction(data:{
    mode_of_payment: POS
    cumulative_amount: 45252,
    amount_tendered: 6412,
    change_due: 65,
    vat_percentage: 2.5
    vat_value: 43,
    discount_percentage: 3,
    discount_value: 54,
    total_items: 23,
    customer_phone: "01512345678"
    customer_email: "abuhuraira.bd@gmail.com"
    seller_shop: 3,
    buyer_shop: 5
  }){
    mode_of_payment
    cumulative_amount
    amount_tendered
    change_due
    vat_value
    vat_percentage
    discount_value
    discount_percentage
    total_items
    customer_phone
    customer_email
    created_by{
      name
      id
    }
    seller_shop{
      name 
      id 
    }
    buyer_shop{
      name 
      id
    }
  }
}
```
N.B: there are three choices for **mode_of_payment**. `CASH`, `POS` and `CASH_AND_POS`

<br>

**20. Update a transaction.**

```
  mutation {
  updateTransaction(
    id: 24
    data: {
      mode_of_payment: CASH
      cumulative_amount: 452145
      amount_tendered: 6412
      change_due: 65
      vat_percentage: 2.5
      vat_value: 43
      discount_percentage: 3
      discount_value: 54
      total_items: 23
      customer_phone: "01911008348"
      customer_email: "shamim.cse.bd@gmail.com"
    }
  ) {
    mode_of_payment
    cumulative_amount
    amount_tendered
    change_due
    vat_value
    vat_percentage
    discount_value
    discount_percentage
    total_items
    customer_phone
    customer_email
    updated_by{
      name
    }
    removed_by{
      name 
    }
    seller_shop{
      name
    }
    buyer_shop{
      name
    }
    updated_by{
      name
      id
    }
     created_by{
      name
      id
    }
  }
}

```
N.B: there are three choices for **mode_of_payment**. `CASH`, `POS` and `CASH_AND_POS`

<br>

**21. Get all transactions.**

```
  query {
      transactions {
        id
        receipt_number
        mode_of_payment
        cumulative_amount
        amount_tendered
        change_due
        vat_percentage
        vat_value
        discount_percentage
        discount_value
        total_items
        customer_phone
        customer_email
        soft_removed
        removed_by{
          name
        }
        seller_shop {
          name
        }
        buyer_shop {
          name
        }
        created_by {
          name
        }
        updated_by {
          name
        }
      }
}


```
**22. Get a transaction.**

```
  query {
      transaction(id:7) {
        id
        receipt_number
        mode_of_payment
        cumulative_amount
        amount_tendered
        change_due
        vat_percentage
        vat_value
        discount_percentage
        discount_value
        total_items
        customer_phone
        customer_email
        soft_removed
        removed_by{
          name
        }
        seller_shop {
          name
        }
        buyer_shop {
          name
        }
        created_by {
          name
        }
        updated_by {
          name
        }
      }
  }

```
**23. Remove a transaction.**

```
  mutation{
      removeTransaction(id:19)
  }

```
**N.B: A transaction can never be completely deleted. It actually soft deletion. It still remains in the database.**


### If any mistakes you found, please inform me.

## May Allah give you Hidayah and Mercy.