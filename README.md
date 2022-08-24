## API Requirement

### User :

- Login 
- Regiter
- Get List Category
- Get Detail Category By Id
- Get List Item [can add query: category]
- Create Order
- Get Detail Pending Order
- Submit Order

### Admin
 
 - Login [is_admin = true]
 - Add Item
 - Update Item
 - Delete Item
 - Add Category
 - Update Category
 - Delete Category
 - Change Status Order [choose body: Processed / Completed / Canceled]
 - List Order [can add query: complete]
 
## ERD

<div style="width: 250px;">
  
  ![](public/images/erd_bingle_shop.jpeg)
  
</div>

## API Spec

### Authentication

All API must use this authentication

Request :

- Header :
  - X-Api-Key : "your secret api key"

### Register

Request :

- Method : POST
- Endpoint : `/api/users/register`
- Header :
  - Content-Type: application/json
  - Accept: application/json
- Body :

```json
{
    "name" : "string",
    "telp" : "integer",
    "email" : "string",
    "password" : "string"
    "address" : "string"
}
```

Response :

```json
{
    "status" : "string",
    "message" : "string"
    "data" : {
         "id" : "integer, unique",
         "name" : "string",
         "telp" : "integer",
         "email" : "string",
         "address" : "string",
         "updatedAt" : "date",
         "createdAt" : "date"
     }
}
```

### Login

Request :

- Method : POST
- Endpoint : `/api/users`
- Header :
  - Content-Type: application/json
  - Accept: application/json
- Body :

```json
{
  "email": "string",
  "password": "string"
}
```

Response :

```json
{
    "status" : "string",
    "message" : "string"
    "data" : {
         "id" : "integer, unique",
         "name" : "string",
         "telp" : "integer",
         "email" : "string",
         "address" : "string",
         "updatedAt" : "date",
         "createdAt" : "date"
     }
}
```

### Get All Items

Request :

- Method : GET
- Endpoint : `/api/items`
- Header :
  - Accept: application/json

Response :

```json
{
    "status" : "string",
    "message" : "string"
    "data" : [
        {
         "id" : "integer, unique",
         "name" : "string",
         "category" : "string",
         "description" : "string",
         "price" : "integer",
         "imageUrl" : "integer",
         "stock" : "integer",
         "sold" : "integer",
         "updatedAt" : "date",
         "createdAt" : "date"
        },
        {
         "id" : "integer, unique",
         "name" : "string",
         "category" : "string",
         "description" : "string",
         "price" : "integer",
         "imageUrl" : "integer",
         "stock" : "integer",
         "sold" : "integer",
         "updatedAt" : "date",
         "createdAt" : "date"
       }
     ]
}
```

### Get Items By Id

Request :

- Method : GET
- Endpoint : `/api/items/{id_item}`
- Header :
  - Accept: application/json

Response :

```json
{
    "status" : "string",
    "message" : "string"
    "data" : {
         "id" : "integer, unique",
         "name" : "string",
         "category" : "string",
         "description" : "string",
         "price" : "integer",
         "imageUrl" : "integer",
         "stock" : "integer",
         "sold" : "integer",
         "updatedAt" : "date",
         "createdAt" : "date"
     }
}
```

### Create Item

Request :

- Method : POST
- Endpoint : `/api/items`
- Header :

  - Content-Type: application/json
  - Accept: application/json

- Body :

```json
{
  "name": "string",
  "category": "string",
  "description": "string",
  "price": "string",
  "imageUrl": "string",
  "stock": "string"
}
```

Response :

```json
{
    "status" : "string",
    "message" : "string"
    "data" : {
         "id" : "integer, unique",
         "name" : "string",
         "category" : "string",
         "description" : "string",
         "price" : "integer",
         "imageUrl" : "integer",
         "stock" : "integer",
         "updatedAt" : "date",
         "createdAt" : "date"
     }
}
```

### Update Item

Request :

- Method : PUT
- Endpoint : `/api/items/{id_item}`
- Header :

  - Content-Type: application/json
  - Accept: application/json

- Body :

```json
{
  "name": "string",
  "category": "string",
  "description": "string",
  "price": "string",
  "imageUrl": "string",
  "stock": "string"
}
```

Response :

```json
  {
    "status" : "string",
    "message" : "string"
    "data" : {
         "id" : "integer, unique",
         "name" : "string",
         "category" : "string",
         "description" : "string",
         "price" : "integer",
         "imageUrl" : "integer",
         "stock" : "integer",
         "sold" : "integer",
         "updatedAt" : "date",
         "createdAt" : "date"
     }
}
```

### Delete Item

Request :

- Method : DELETE
- Endpoint : `/api/items/{id_item}`
- Header :
  - Accept: application/json

Response :

```json
{
  "status": "string",
  "message": "string"
}
```

### Create New Order

Request :

- Method : POST
- Endpoint : `/api/orders`
- Header :

  - Content-Type: application/json
  - Accept: application/json

- Body :

```json
{
  "user_id": "integer",
  "item_id": "integer",
  "total_item": "interger"
}
```

Response :

```json
{
    "status" : "string",
    "message" : "string"
    "data" : {
         "id" : "integer, unique",
         "name" : "string",
         "address" : "string",
         "item" : "string",
         "total_item" : "integer",
         "total_price" : "integer",
         "status" : "string"
         "createdAt" : "date"
         "updatedAt" : "date",

 }
```

### Update Order Status

Request :

- Method : PUT
- Endpoint : `/api/orders/update_status_order/{id_order}`
- Header :

  - Accept: application/json

Response :

```json
{
  "status": "string",
  "message": "string"
}
```
