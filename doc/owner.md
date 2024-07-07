## Owner API Spec (unfinished)

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
      "created_at" : "string",
      "updated_at" : "string"
    },
    {
      "id" : "string, unique",
      "register_code" : "string, unique",
      "name" : "string",
      "phone" : "string",
      "created_at" : "string",
      "updated_at" : "string"
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
    "created_at" : "string",
    "updated_at" : "string"
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
