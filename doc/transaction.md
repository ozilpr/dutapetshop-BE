## Transaction API Spec (unfinished, due client ask for changes)

### Create Transaction

Request :

- Method : Post
- Endpoint : `/transaction`
- Header :
  - Content-Type : application/json
  - Accept : application/json
  - Authorization : Bearer token
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
    "transactionId": "string, unique",
    "transactionItems": [
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

### List Transactions

Request :

- Method : Get
- Endpoint : `/transaction`
- Header :
  - Accept : application/json
  - Authorization : Bearer token

Response :

```json
{
  "status": "string",
  "data": [
    {
      "id": "string, unique",
      "owner_id": "string, unique",
      "owner_name": "string",
      "register_code": "string, unique",
      "discount": "number",
      "total_price": "number",
      "transaction_date": "string",
      "transaction_items": [
        {
          "item_id": "string, unique",
          "resource_name": "string",
          "quantity": "number",
          "price": "number"
        },
        {
          "item_id": "string, unique",
          "resource_name": "string",
          "quantity": "number",
          "price": "number"
        }
      ]
    },
    {
      "id": "string, unique",
      "owner_id": "string, unique",
      "owner_name": "string",
      "register_code": "string, unique",
      "discount": "number",
      "total_price": "number",
      "transaction_date": "string",
      "transaction_items": [
        {
          "item_id": "string, unique",
          "resource_name": "string",
          "quantity": "number",
          "price": "number"
        },
        {
          "item_id": "string, unique",
          "resource_name": "string",
          "quantity": "number",
          "price": "number"
        }
      ]
    }
  ]
}
```

### Get Transaction By Id

Request :

- Method : Get
- Endpoint : `/transaction/{id}`
- Header :
  - Accept : application/json
  - Authorization : Bearer token

Response :

```json
{
  "status": "string",
  "data": {
    "id": "string, unique",
    "owner_id": "string, unique",
    "owner_name": "string",
    "register_code": "string, unique",
    "discount": "number",
    "total_price": "number",
    "transaction_date": "string",
    "transaction_items": [
      {
        "item_id": "string, unique",
        "resource_name": "string",
        "quantity": "number",
        "price": "number"
      },
      {
        "item_id": "string, unique",
        "resource_name": "string",
        "quantity": "number",
        "price": "number"
      }
    ]
  }
}
```

### Get Transactions by Owner Id

Request :

- Method : Get
- Endpoint : `/transaction/owner/{ownerId}`
- Header :
  - Accept : application/json
  - Authorization : Bearer token

Response :

```json
{
  "status": "string",
  "data": [
    {
      "owner_id": "string, unique",
      "owner_name": "string",
      "register_code": "string, unique",
      "transactions": [
        {
          "id": "string, unique",
          "discount": "number",
          "total_price": "number",
          "transaction_date": "string",
          "transaction_items": [
            {
              "item_id": "string, unique",
              "resource_name": "string",
              "quantity": "number",
              "price": "number"
            },
            {
              "item_id": "string, unique",
              "resource_name": "string",
              "quantity": "number",
              "price": "number"
            }
          ]
        },
        {
          "id": "string, unique",
          "discount": "number",
          "total_price": "number",
          "transaction_date": "string",
          "transaction_items": [
            {
              "item_id": "string, unique",
              "resource_name": "string",
              "quantity": "number",
              "price": "number"
            },
            {
              "item_id": "string, unique",
              "resource_name": "string",
              "quantity": "number",
              "price": "number"
            }
          ]
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
  - Authorization : Bearer token

Response :

```json
{
  "status": "string",
  "message": "string"
}
```
