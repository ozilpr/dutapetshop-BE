## Transaction API Spec (unfinished, due client ask for changes)

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
  "discount": "number",
  "transactionData": [
    {
      "resourceId": "string, unique",
      "quantity": "number",
      "price": "number"
    },
    {
      "resourceId": "string, unique",
      "quantity": "number",
      "price": "number"
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
      "discount": "number",
      "total_price": "number",
      "transactionItems": [
        {
          "id": "string, unique",
          "resource_name": "string",
          "quantity": "number",
          "price": "number"
        },
        {
          "id": "string, unique",
          "resource_name": "string",
          "quantity": "number",
          "price": "number"
        }
      ]
    },
    {
      "transaction_id": "string, unique",
      "owner_id": "string, unique",
      "owner_name": "string",
      "register_code": "string, unique",
      "discount": "number",
      "total_price": "number",
      "transactionItems": [
        {
          "id": "string, unique",
          "resource_name": "string",
          "quantity": "number",
          "price": "number"
        },
        {
          "id": "string, unique",
          "resource_name": "string",
          "quantity": "number",
          "price": "number"
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
    "discount": "number",
    "total_price": "number",
    "transactionItems": [
      {
        "id": "string, unique",
        "resource_name": "string",
        "quantity": "number",
        "price": "number"
      },
      {
        "id": "string, unique",
        "resource_name": "string",
        "quantity": "number",
        "price": "number"
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
      "discount": "number",
      "total_price": "number",
      "transactionItems": [
        {
          "id": "string, unique",
          "resource_name": "string",
          "quantity": "number",
          "price": "number"
        },
        {
          "id": "string, unique",
          "resource_name": "string",
          "quantity": "number",
          "price": "number"
        }
      ]
    },
    {
      "transaction_id": "string, unique",
      "owner_id": "string, unique",
      "owner_name": "string",
      "register_code": "string, unique",
      "discount": "number",
      "total_price": "number",
      "transactionItems": [
        {
          "id": "string, unique",
          "resource_name": "string",
          "quantity": "number",
          "price": "number"
        },
        {
          "id": "string, unique",
          "resource_name": "string",
          "quantity": "number",
          "price": "number"
        }
      ]
    }
  ]
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
