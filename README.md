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
  - Logout:
    Path: http://localhost:8080/logout
    Method: POST
- SKU:
  - Create
    Path: http://localhost:8080/api/sku
    Method: POST
  - Update
    Path: http://localhost:8080/api/sku/idSKU
    Method: PUT
  - Delete
    Path: http://localhost:8080/api/sku/idSKU
    Method: DELETE
  - GetAll
    Path: http://localhost:8080/api/sku?page= & size = (default page = 0, size = 3)
    Method: GET
  - GetDetail
    Path: http://localhost:8080/api/sku/idSKU
    Method: GET
