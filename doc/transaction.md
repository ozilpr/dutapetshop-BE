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

### Export Transactions to PDF

Request :

- Method : Get
- Endpoint : `/transaction/export/{ownerId}`
- Header :
  - Accept : application/pdf
  - Authorization : Bearer token

Parameters:

- {ownerId}: If an ownerId is provided, transactions for that owner will be fetched. Otherwise, all transactions will be fetched.

Response :

- Returns a PDF document containing the transaction report. The report includes:
  - Transaction Details: Lists of resources, quantities, prices, discounts, and total amounts.
  - If the ownerId is provided, the report will include only transactions for that specific owner.
  - If the ownerId is not provided, the report will include all transactions.

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
