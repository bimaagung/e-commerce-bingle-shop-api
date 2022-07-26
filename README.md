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
    "telp" : "interger",
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
         "id" : "string, unique",
         "name" : "string",
         "telp" : "interger",
         "email" : "string",
         "createdAt" : "date",
         "updatedAt" : "date"
     }
}
```
