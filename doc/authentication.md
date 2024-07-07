## Authentication API Spec

### Create Authentication

Request :
- Method : Post
- Endpoint : `/authentications`
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
- Endpoint : `/authentications`
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
- Endpoint : `/authentications`
- Header :
  - Content-Type : application/json
  - Accept : application/json
- Body :
```json
{
  "refreshToken" : "string"
}
```

Response :
```json
{
  "status" : "string",
  "message" : "string"
}
```
