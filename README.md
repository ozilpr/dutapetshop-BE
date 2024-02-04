# API Spec

## Admin

### Create Admin

Request:
- Method : POST
- Endpoint : `/admin`
- Header :
  - Content-Type: application/json
  - Accept: application/json
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
  "status" : "success",
  "data" : {
    "id": "string, unique"
  }
}
```

### Get Admin

Request :
- Method : GET
- Endpoint : `/admin/{id}`
- Header : 
  - Accept : application/json

Response :

```json
  {
    "status": "string",
    "message": "string"
  }
```

### Delete Admin

Request :
- Method : Delete
- Endpoint : `/admin/{id}`
- Header : 
  - Content-Type : application/json

Response :
```json
{
  "status": "string",
  "message": "string"
}
```

## Authentication

### Create Authentication

Request :
- Method : Get
- Endpoint : `/authentication`
- Header :
  - Content-Type : application/json
  - Accept : application/json
- Body :
```json
{
  "username": "string",
  "password": "string"
}
```
- Response :
```json
{
  "status": "string",
  "message": "string",
  "data": {
    "accessToken": "string",
    "refreshToken": "string"
  }
}
```

### Refresh Authentication
- Method : Put
- Endpoint : `/resource`
- Header :
  - Content-Type : application/json
  - Accept : application/json
- Body :
```json
{

}
```