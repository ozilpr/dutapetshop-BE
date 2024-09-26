## Transaction API Spec (unfinished)

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
  "ownerId": "string, unique",
  "totalPrice": "number",
  "transactionData": [
    {
      "resourceId": "string, unique",
      "quantity": "number",
      "price": "number",
      "discount": "string",
      "finalPrice": "number"
    },
    {
      "resourceId": "string, unique",
      "quantity": "number",
      "price": "number",
      "discount": "string",
      "finalPrice": "number"
    }
  ]
}
```

Response :

```json
{
  "status": "string",
  "message": "string",
  "data": {
    "transactionDetailId": "string, unique",
    "transactionsId": [
      {
        "trans_id": "string, unique"
      },
      {
        "trans_id": "string, unique"
      }
    ]
  }
}
```

### List Transaction Details

Request :

- Method : Get
- Endpoint : `/transaction/detail`
- Header :
  - Accept : application/json

Response :

```json
{
  "status": "string",
  "data": [
    {
      "transaction_id": "string, unique",
      "owner_id": "string, unique",
      "owner_name": "string",
      "register_code": "string, unique",
      "total_price": "number",
      "transactionItems": [
        {
          "id": "string, unique",
          "resource_name": "string",
          "quantity": "number",
          "price": "number",
          "discount": "string",
          "final_price": "number"
        },
        {
          "id": "string, unique",
          "resource_name": "string",
          "quantity": "number",
          "price": "number",
          "discount": "string",
          "final_price": "number"
        }
      ]
    },
    {
      "transaction_id": "string, unique",
      "owner_id": "string, unique",
      "owner_name": "string",
      "register_code": "string, unique",
      "total_price": "number",
      "transactionItems": [
        {
          "id": "string, unique",
          "resource_name": "string",
          "quantity": "number",
          "price": "number",
          "discount": "string",
          "final_price": "number"
        },
        {
          "id": "string, unique",
          "resource_name": "string",
          "quantity": "number",
          "price": "number",
          "discount": "string",
          "final_price": "number"
        }
      ]
    }
  ]
}
```

### Get Transaction Detail By Id

Request :

- Method : Get
- Endpoint : `/transaction/detail/{id}`
- Header :
  - Accept : application/json

Response :

```json
{
  "status": "string",
  "data": {
    "transaction_id": "string, unique",
    "owner_id": "string, unique",
    "owner_name": "string",
    "register_code": "string, unique",
    "total_price": "number",
    "transactionItems": [
      {
        "id": "string, unique",
        "resource_name": "string",
        "quantity": "number",
        "price": "number",
        "discount": "string",
        "final_price": "number"
      },
      {
        "id": "string, unique",
        "resource_name": "string",
        "quantity": "number",
        "price": "number",
        "discount": "string",
        "final_price": "number"
      }
    ]
  }
}
```

### Get Transaction Detail by Owner Id

Request :

- Method : Get
- Endpoint : `/transaction/detail/owner/{ownerId}`
- Header :
  - Accept : application/json

Response :

```json
{
  "status": "string",
  "data": [
    {
      "transaction_id": "string, unique",
      "owner_id": "string, unique",
      "owner_name": "string",
      "register_code": "string, unique",
      "total_price": "number",
      "transactionItems": [
        {
          "id": "string, unique",
          "resource_name": "string",
          "quantity": "number",
          "price": "number",
          "discount": "string",
          "final_price": "number"
        },
        {
          "id": "string, unique",
          "resource_name": "string",
          "quantity": "number",
          "price": "number",
          "discount": "string",
          "final_price": "number"
        }
      ]
    },
    {
      "transaction_id": "string, unique",
      "owner_id": "string, unique",
      "owner_name": "string",
      "register_code": "string, unique",
      "transactionItems": [
        {
          "id": "string, unique",
          "resource_name": "string",
          "quantity": "number",
          "price": "number",
          "discount": "string",
          "final_price": "number"
        },
        {
          "id": "string, unique",
          "resource_name": "string",
          "quantity": "number",
          "price": "number",
          "discount": "string",
          "final_price": "number"
        }
      ]
    }
  ]
}
```

### Delete Transaction Detail by Id

Request :

- Method : Delete
- Endpoint : `/transaction/detail/{id}`
- Header :
  - Accept : application/json

Response :

```json
{
  "status": "string",
  "message": "string"
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
  "status": "string",
  "data": [
    {
      "id": "string, unique",
      "transaction_id": "string, unique",
      "resource_id": "string, unique",
      "resource_name": "string",
      "quantity": "number",
      "price": "number",
      "discount": "string",
      "final_price": "number",
      "created_at": "string",
      "updated_at": "string"
    },
    {
      "id": "string, unique",
      "transaction_id": "string, unique",
      "resource_id": "string, unique",
      "resource_name": "string",
      "quantity": "number",
      "price": "number",
      "discount": "string",
      "final_price": "number",
      "created_at": "string",
      "updated_at": "string"
    }
  ]
}
```

Response :

```json
{
  "status": "string",
  "message": "string"
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
  "status": "string",
  "message": "string"
}
```
