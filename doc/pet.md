## Pet API Spec (unfinished)

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
      "created_at" : "string",
      "updated_at" : "string"
    },
    {
      "id" : "string, unique",
      "name" : "string",
      "type" : "string",
      "race" : "string",
      "gender" : "string",
      "birthdate" : "string",
      "created_at" : "string",
      "updated_at" : "string"
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
    "created_at" : "string",
    "updated_at" : "string"
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
  "type" : "string",
  "race" : "string",
  "gender" : "string",
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