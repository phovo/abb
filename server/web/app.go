package web

import (
	"abbp/db"
	"abbp/routes"
)

//RunServer port 8080
func RunServer() {
	db.ConnectDatabase()
	route := routes.SetupRoutes()
	route.Run(":8080")
}
