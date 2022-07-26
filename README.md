# API Spec

## Authentication

All API must use this authentication

Request :

- Header :
  - X-Api-Key : "your secret api key"

## Register

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

## Login

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

## Get All Items

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

## Get Items By Id

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
