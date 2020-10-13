# abbp

## Environment setup

You need to have [Go](https://golang.org/),
[Node.js](https://nodejs.org/),
[Docker](https://www.docker.com/), and
[Docker Compose](https://docs.docker.com/compose/)
(comes pre-installed with Docker on Mac and Windows)
installed on your computer.

Verify the tools by running the following commands:

```sh
go version
npm --version
docker --version
docker-compose --version
```

## Start in development mode

In the project directory run the command (you might
need to prepend it with `sudo` depending on your setup):

```sh
docker-compose -f docker-compose-dev.yml up
```

This starts a local PostgreSQL database on `localhost:5432`.
The database will be populated with test records from the
[init-db.sql](init-db.sql) file.

Navigate to the `server` folder and start the back end:

```sh
cd server
go run server.go
```

The back end will serve on http://localhost:8080.

Navigate to the `webapp` folder, install dependencies,
and start the front end development server by running:

```sh
cd webapp
npm install
npm start
```

The application will be available on http://localhost:3000.

## Start in production mode

Perform:

```sh
docker-compose up
```

This will build the application and start it together with
its database. Access the application on http://localhost:8080.

## API BackEnd

- USER:
  - Login
    Path: http://localhost:8080/login
    Method: POST
    Data: {
    "Username": "system",
    "Password":"sa123456"
    }
    Response:
    - successed:
      {
      "data": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoic3lzdGVtIiwidXNlciI6dHJ1ZSwiZXhwIjoxNjAyNDcxMzY2LCJpYXQiOjE2MDI0NzEwNjYsImlzcyI6ImdvbGFuZyJ9.JA00ZSwUBA8cNy69jntU3ldUhoNbdptinHYHvWtL9GM"
      }
    - failed:
      {
      "message": "username or password is incorrect"
      }
  - Logout:
    Path: http://localhost:8080/logout
    Method: POST
  - refresh:
    Path: http://localhost:8080/refresh
    Method: POST
    Response:
    - successed:
      {
      "data": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoic3lzdGVtIiwidXNlciI6dHJ1ZSwiZXhwIjoxNjAyNDcxMzY2LCJpYXQiOjE2MDI0NzEwNjYsImlzcyI6ImdvbGFuZyJ9.JA00ZSwUBA8cNy69jntU3ldUhoNbdptinHYHvWtL9GM"
      }
    - failed: code 401
- SKU:
  - Token is invalid :
    Response:
    {
    "message": "You have no permission to access"
    }
  - Create
    Path: http://localhost:8080/api/sku
    Method: POST
    Data:
    {
    "Name": "sku_1",
    "Status": true,
    "Description": "Desc 1"
    }
    Response:
    - successed: code 200
      {
      "data": {
      "id": 18,
      "name": "sku_1",
      "Status": true,
      "description": "Desc 1"
      }
      }
    - failed: code 400
      {
      "message": " infor SKU is invalid"
      }
  - Update
    Path: http://localhost:8080/api/sku/idSKU
    Method: PUT
    Data:
    {
    "Name": "update SKU_1",
    "status": false,
    "Description": "update Desc 1"
    }
    Response:
    - successed: code 200
      {
      "data": {
      "id": 18,
      "name": "update SKU_1",
      "Status": false,
      "description": "update Desc 1"
      }
      }
    - failed: code 400
      {
      "message": "Error update a entity db"
      }
  - Delete
    Path: http://localhost:8080/api/sku/idSKU
    Method: DELETE
    Response:
    - successed: code 200
    - failed: code 400
      {
      "message": "Error delete a entity db"
      }
  - GetAll
    Path: http://localhost:8080/api/sku?page= & size = (default page = 1, size = 5)
    Method: GET
    Response:
    - successed: code 200
      {
      "data": {
      "id": 19,
      "name": "sku_1",
      "Status": true,
      "description": "Desc 1"
      }
      }
    - failed: code 400
      {
      "message": "Data not found!"
      }
  - GetDetail
    Path: http://localhost:8080/api/sku/idSKU
    Method: GET
    Response:
    - successed: 200
      {
      "data": {
      "items": [
      {
      "id": 19,
      "name": "sku_1",
      "Status": true,
      "description": "Desc 1"
      }
      ],
      "page": 1,
      "size": 16,
      "totalPage": 1,
      "totalItems": 1
      }
      }
- Product:
  - Create
    Path: http://localhost:8080/api/product
    Method: POST
  - Update
    Path: http://localhost:8080/api/product
    Method: PUT
  - GETs
    Path: http://localhost:8080/api/product
    Method: GET
  - GET
    Path: http://localhost:8080/api/product/idProduct
    Method: GET
  - Delete
    Path: http://localhost:8080/api/product/idProduct
    Method: DELETE
