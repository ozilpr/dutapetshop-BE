## Pet Owner API Spec

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