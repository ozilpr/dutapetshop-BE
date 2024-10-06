## Admin API Spec

### Create Admin

Request(If Admin NOT Exists Yet):

- Method : POST
- Endpoint : `/admin`
- Header :
  - Content-Type : application/json
  - Accept : application/json
- Body :

```json
{
  "username": "string",
  "password": "string",
  "confPassword": "string",
  "fullname": "string"
}
```

Response :

```json
{
  "status": "string",
  "message": "string",
  "data": {
    "id": "string, unique"
  }
}
```

Request(If Admin Already Exists) :

- Method : POST
- Endpoint : `/admin`
- Header :
  - Content-Type : application/json
  - Accept : application/json
  - Authorization : Bearer token
- Body :

```json
{
  "username": "string",
  "password": "string",
  "confPassword": "string",
  "fullname": "string"
}
```

Response :

```json
{
  "status": "string",
  "message": "string",
  "data": {
    "id": "string, unique"
  }
}
```

### Get Admin by Id

Request :

- Method : Get
- Endpoint : `/admin/{id}`
- Header :
  - Accept : application/json
  - Authorization : Bearer token

Response :

```json
{
  "status": "string",
  "data": {
    "id": "string, unique",
    "username": "string, unique",
    "fullname": "string"
  }
}
```

### Get Admin by Username

Request :

- Method : Get
- Endpoint : `/admin?username={username}`
- Header :
  - Accept : application/json
  - Authorization : Bearer token

Response :

```json
{
  "status": "string",
  "data": {
    "id": "string, unique",
    "username": "string, unique",
    "fullname": "string"
  }
}
```

### Update Admin by Id

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
  "username": "string, unique",
  "password": "string",
  "confPassword": "string",
  "fullname": "string"
}
```

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
  - Accept : application/json
  - Authorization : Bearer token

Response :

```json
{
  "status": "string",
  "message": "string"
}
```
