# API Spec (unfinished)

## Admin

### Create Admin

Request:
- Method : POST
- Endpoint : `/admin`
- Header :
  - Content-Type : application/json
  - Accept : application/json
- Body :
```json
{
  "username" : "string",
  "password" : "string",
  "confPassword" : "string",
  "fullname" : "string"
}
```

Response :
```json
{
  "status" : "string",
  "message" : "string",
  "data" : {
    "id": "string, unique"
  }
}
```

### Get Admin by Id

Request :
- Method : Get
- Endpoint : `/admin/{id}`
- Header : 
  - Accept : application/json

Response :
```json
{
  "status" : "string",
  "data" : {
    "id" : "string, unique",
    "username" : "string, unique",
    "fullname" : "string"
  }
}
```

### Get Admin by Username

Request :
- Method : Get
- Endpoint : `/admin?username={username}`
- Header :
  - Accept : application/json

Response :
```json
{
  "status" : "string",
  "data" : {
    "id" : "string, unique",
    "username" : "string, unique",
    "fullname" : "string"
  }
}
```

### Update Admin by Id

Request :
- Method : Put
- Endpoint : `/resource/{id}`
- Header :
  - Content-Type : application/json
  - Accept : application/json
- Body :
```json
{
  "username" : "string, unique",
  "password" : "string",
  "confPassword" : "string",
  "fullname" : "string"
}
```

Response :
```json
{
  "status" : "string",
  "message" : "string"
}
```

### Delete Admin

Request :
- Method : Delete
- Endpoint : `/admin/{id}`
- Header :
  - Accept : application/json

Response :
```json
{
  "status" : "string",
  "message" : "string"
}
```

## Authentications

### Create Authentication

Request :
- Method : Post
- Endpoint : `/authentication`
- Header :
  - Content-Type : application/json
  - Accept : application/json
- Body :
```json
{
  "username" : "string",
  "password" : "string"
}
```

- Response :
```json
{
  "status" : "string",
  "message" : "string",
  "data" : {
    "accessToken" : "string",
    "refreshToken" : "string"
  }
}
```

### Update Authentication

Request
- Method : Put
- Endpoint : `/authentication`
- Header :
  - Content-Type : application/json
  - Accept : application/json
- Body :
```json
{
  "reFreshToken" : "string"
}
```

Response :
```json
{
  "status" : "string",
  "message" : "string",
  "data" : {
    "accessToken" : "string"
  }
}
```

### Delete Authentication

Request :
- Method : Delete
- Endpoint : `/authenticaion/{id}`
- Header :
  - Accept : application/json

Response :
```json
{
  "status" : "string",
  "message" : "string"
}
```

## Resources (unfinished)

### Create Resource

Request : 
- Method : POST
- Endpoint : `/resource`
- Header :
  - Content-Type : application/json
  - Accept : application/json
- Body :
```json
{
  "name" : "string",
  "description" : "string",
  "type" : "string",
  "price" : "integer"
}
```
| the data type of price might change, bcs i'm not sure using integer in this condition..

Response :
```json
{
  "status" : "string",
  "message" : "string"
}
```

### List Resources

Request :
- Method : GET
- Endpoint : `/resource`
- Header :
  - Accept : application/json

Response :
```json
{
  "status" : "string",
  "data": [
    {
      "id" : "string, unique",
      "name" : "string",
      "description" : "string",
      "type" : "string",
      "price" : "integer",
      "created_at" : "string"
    },
    {
      "id" : "string, unique",
      "name" : "string",
      "description" : "string",
      "type" : "string",
      "price" : "integer",
      "created_at" : "string"
    }
  ]
}
```

### Get Resource by Id

Request : 
- Method : Get
- Endpoint : `/resource/{id}`
- Header :
  - Accept : application/json

Response : 
```json
{
  "status" : "string",
  "data" : {
    "id" : "string, unique",
    "name" : "string",
    "description" : "string",
    "type" : "string",
    "price" : "integer",
    "created_at" : "string"
  }
}
```

### Update Resource by Id

Request : 
- Method : Put
- Endpoint : `/resource/{id}`
- Header :
  - Content-Type : application/json
  - Accept : application/json
- Body :
```json
{
    "name" : "string",
    "description" : "string",
    "type" : "string",
    "price" : "integer",
}
```

Response :
```json
{
  "status" : "string",
  "message" : "string"
}
```

### Delete Resource

Request :
- Method : Delete
- Endpoint : `/resource/{id}`
- Header :
  - Accept : application/json

Response :
```json
{
  "status" : "string",
  "message" : "string"
}
```

## Owners (unfinished)

### Create Owner

Request :
- Method : Post
- Endpoint : `/owner`
- Header :
  - Content-Type : application/json
  - Accept : application/json
- Body :
```json
{
  "registerCode" : "string",
  "name" : "string",
  "phone" : "string"
}
```

Response :
```json
{
  "status" : "string",
  "message" : "string",
  "data" : {
    "ownerId" : "string"
  }
}
```

### List Owners

Request :
- Method : Get
- Endpoint : `/owner`
- Header :
  - Accept : application/json

Response :
```json
{
  "status" : "string",
  "data": [
    {
      "id" : "string, unique",
      "register_code" : "string, unique",
      "name" : "string",
      "phone" : "string",
      "created_at" : "string"
    },
    {
      "id" : "string, unique",
      "register_code" : "string, unique",
      "name" : "string",
      "phone" : "string",
      "created_at" : "string"
    }
  ]
}
```

### Get Owner by Id (unfinished)

Request :
- Method : Get
- Endpoint : `/owner/{id}`
- Header :
  - Accept : application/json

Response :
```json
{
  "status" : "string",
  "data" : {
    "id" : "string, unique",
    "register_code" : "string, unique",
    "name" : "string",
    "phone" : "string",
    "created_at" : "string"
  }
}
```

### Update Owner by Id (unfinished)

Request :
- Method : Put
- Endpoint : `/owner/{id}`
- Header :
  - Content-Type : application/json
  - Accept : application/json
- Body :
```json
{
  "registerCode" : "string, unique",
  "name" : "string",
  "phone" : "string",
}
```

Response :
```json
{
  "status" : "string",
  "message" : "string"
}
```

### Delete Owner by Id

Request :
- Method : Delete
- Endpoint : `/owner/{id}`
- Header : 
  - Accept : application/json

Response :
```json
{
  "status" : "string",
  "message" : "string"
}
```

## Pets (unfinished)

### Create Pet

Request :
- Method : Post
- Endpoint : `/pet`
- Header :
  - Content-Type : application/json
  - Accept : application/json
- Body :
```json
{
  "name" : "string",
  "type" : "string",
  "race" : "string",
  "gender" : "string",
  "birthdate" : "string"
}
```

Response :
```json
{
  "status" : "string",
  "message" : "string",
  "data" : {
    "petId" : "string, unique"
  }
}
```

### List Pets

Request :
- Method : Get
- Endpoint : `/pet`
- Header :
  - Accept : application/json

Response :
```json
{
  "status" : "string",
  "data" : [
    {
      "id" : "string, unique",
      "name" : "string",
      "type" : "string",
      "race" : "string",
      "gender" : "string",
      "birthdate" : "string",
      "created_at" : "string"
    },
    {
      "id" : "string, unique",
      "name" : "string",
      "type" : "string",
      "race" : "string",
      "gender" : "string",
      "birthdate" : "string",
      "created_at" : "string"
    }
  ]
}
```

### Get Pet by Id

Request :
- Method : Get
- Endpoint : `/pet/{id}`
- Header :
  - Accept : application/json

Response :
```json
{
  "status" : "string",
  "data" : {
    "id" : "string, unique",
    "name" : "string",
    "type" : "string",
    "race" : "string",
    "gender" : "string",
    "birthdate" : "string",
    "created_at" : "string"
  }
}
```

### Update Pet by Id

Request :
- Method : Put
- Endpoint : `/pet/{id}`
- Header :
  - Content-Type : application/json
  - Accept : application/json
- Body :
```json
{
  "name" : "string",
  "gender" : "string",
  "type" : "string",
  "birhtdate" : "string",
}
```

Response :
```json
{
  "status" : "string",
  "message" : "string",
}
```

### Delete Pet by Id

Request :
- Method : Delete
- Endpoint : `/pet/{id}`
- Header :
  - Accept : application/json

Response :
```json
{
  "status" : "string",
  "message" : "string"
}
```

## Transactions (unfinished)

### Create Transaction

Request :
- Method : Post
- Endpoint : `/transaction`
- Header : 
  - Content-Type : application/json
  - Accept : application/json
- Body :
```json
{
  "resourceId" : "string, unique",
  "quantity" : "integer",
  "price" : "integer"
}

Response : 
```json
{
  "status" : "string",
  "message" : "string",
  "data" : {
    "transactionId" : "string, unique"
  }
}
```

### List Transactions

Request :
- Method : Get
- Endpoint : `/transaction`
- Header :
  - Accept : application/json

Response :
```json
{
  "status" : "string",
  "data" : [
    {
      "id" : "string, unique",
      "resource_id" : "string, unique",
      "resource_name" : "string",
      "quantity" : "integer",
      "price" : "integer",
      "created_at" : "string"
    },
    {
      "id" : "string, unique",
      "resource_id" : "string, unique",
      "resource_name" : "string",
      "quantity" : "integer",
      "price" : "integer",
      "created_at" : "string"
    }
  ]
}
```

### Get Transaction by Id

Request : 
- Method : Get
- Endpoint : `/transaction/{id}`
- Header : 
  - Accept : application/json

Response :
```json
{
  "status" : "string",
  "data" : {
      "id" : "string, unique",
      "resource_id" : "string, unique",
      "resource_name" : "string",
      "quantity" : "integer",
      "price" : "integer",
      "created_at" : "string"
    }
}
```

### Update Transaction by Id

Request :
- Method : Put
- Endpoint : `/transaction/{id}`
- Header : 
  - Accept : application/json
- Body :
```json
{
  "resourceId" : "string, unique",
  "quantity" : "integer",
  "price" : "integer"
}
```
Response :
```json
{
  "status" : "string",
  "message" : "string"
}
```

### Delete Transaction by Id

Request :
- Method : Delete
- Endpoint : `/transaction/{id}`
- Header : 
  - Accept : application/json

Response :
```json
{
  "status" : "string",
  "message" : "string"
}
```

## Transaction Details (unfinished)

### Create Transaction Detail

Request :
- Method : Post
- Endpoint : `/transaction-detail`
- Header :
  - Content-Type : application/json
  - Accept : application/json
- Body :
```json
{
  "transactionId" : "string, unique",
  "ownerId" : "string, unique"
}
```

Response : 
```json
{
  "status" : "string",
  "message" : "string",
  "data" : {
    "transactionDetailId" : "string, unique"
  }
}
```

### List Transaction Details
Request :
- Method : Get
- Endpoint : `/transaction-detail`
- Header :
  - Accept : application/json

Response :
```json
{
  "status" : "string",
  "data" : [
    {
      "id" : "string, unique",
      "resource_name" : "string",
      "quantity" : "integer",
      "price" : "integer",
      "owner_id" : "string, unique",
      "owner_name" : "string",
      "register_code" : "string, unique",
      "phone" : "string"
    },
    {
      "id" : "string, unique",
      "resource_name" : "string",
      "quantity" : "integer",
      "price" : "integer",
      "owner_id" : "string, unique",
      "owner_name" : "string",
      "register_code" : "string, unique",
      "phone" : "string"
    }
  ]
}
```

### Get Transaction Detail By Id

Request :
- Method : Get
- Endpoint : `/transaction-detail/{id}`
- Header :
  - Accept : application/json

Response :
```json
{
  "status" : "string",
  "data" : {
    "id" : "string, unique",
    "resource_name" : "string",
    "quantity" : "integer",
    "price" : "integer",
    "owner_id" : "string, unique",
    "owner_name" : "string",
    "register_code" : "string, unique",
    "phone" : "string"
  }
}
```

### Get Transaction Detail by Owner Id

Request :
- Method : Get
- Endpoint : `/transaction-detail/owner/{ownerId}`
- Header :
  - Accept : application/json

Response :
```json
{
  "status" : "string",
  "data" : {
    "id" : "string, unique",
    "resource_name" : "string",
    "quantity" : "integer",
    "price" : "integer",
    "owner_id" : "string, unique",
    "owner_name" : "string",
    "register_code" : "string, unique",
    "phone" : "string"
  }
}
```

### Edit Transaction Detail by Id (is this really neccessary? prolly will disable this)

Request :
- Method : Put
- Endpoint : `/transaction-detail/{id}`
- Header :
  - Content-Type : application/json
  - Accept : application/json
- Body :
```json
{
  "transactionId" : "string, unique",
  "ownerId" : "string, unique"
}
```

Response :
```json
{
  "status" : "string",
  "message" : "string"
}
```

### Delete Transaction Detail by Id

Request :
- Method : Delete
- Endpoint : `/transaction-detail/{id}`
- Header :
  - Accept : application/json

Response :
```json
{
  "status" : "string",
  "message" : "string"
}
```

## Pet Owner

### Create Pet Owner

Request :
- Method : Post
- Endpoint : `/pet-owner`
- Header :
  - Accept : application/json
- Body :
```json
{
  "ownerId" : "string, unique",
  "petId" : "string, unique"
}
```

Response :
```json
{
  "status" : "string",
  "message" : "string",
  "data" : {
    "petOwnerId" : "string, unique",
  }
}
```

### Get Pet Owner by Id

Request : 
- Method : Get
- Endpoint : `/pet-owner/{id}`
- Header :
  - Accept : application/json

Response :
```json
{
  "status" : "string",
  "message" : "string",
  "data" : {
    "id" : "string, unique",
    "owner_id" : "string, unique",
    "owner_name" : "string",
    "pets" : [
      {
        "pet_id" : "string, unique",
        "pet_name" : "string"
      },
      {
        "pet_id" : "string, unique",
        "pet_name" : "string"
      }
    ]
  }
}
```

### Update Pet Owner by Id

Request :
- Method : Put
- Endpoint : `/pet-owner/{id}`
- Header :
  - Content-Type : application/json
  - Accept : application/json
- Body :
```json
{
  "ownerId" : "string, unique",
  "petId" : "string, unique"
}
```

Response :
```json
{
  "status" : "string",
  "message" : "string"
}
```

### Delete Pet Owner by Id

Request :
- Method : Delete
- Endpoint : `/pet-owner/{id}`
- Header :
  - Accept : application/json

Response :
```json
{
  "status" : "string",
  "message" : "string"
}
```