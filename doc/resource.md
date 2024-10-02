## Resource API Spec (unfinished)

### Create Resource

Request :

- Method : POST
- Endpoint : `/resource`
- Header :
  - Content-Type : application/json
  - Accept : application/json
  - Authorization : Bearer token
- Body :

```json
{
  "name": "string",
  "description": "string",
  "type": "string",
  "price": "number"
}
```

Response :

```json
{
  "status": "string",
  "message": "string",
  "data": {
    "resourceId": "string, unique"
  }
}
```

### List Resources

Request :

- Method : GET
- Endpoint : `/resource`
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
      "name": "string",
      "description": "string",
      "type": "string",
      "price": "number",
      "created_at": "string",
      "updated_at": "string"
    },
    {
      "id": "string, unique",
      "name": "string",
      "description": "string",
      "type": "string",
      "price": "number",
      "created_at": "string",
      "updated_at": "string"
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
  - Authorization : Bearer token

Response :

```json
{
  "status": "string",
  "data": {
    "id": "string, unique",
    "name": "string",
    "description": "string",
    "type": "string",
    "price": "number",
    "created_at": "string",
    "updated_at": "string"
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
  - Authorization : Bearer token
- Body :

```json
{
  "name": "string",
  "description": "string",
  "type": "string",
  "price": "number"
}
```

Response :

```json
{
  "status": "string",
  "message": "string"
}
```

### Delete Resource

Request :

- Method : Delete
- Endpoint : `/resource/{id}`
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
