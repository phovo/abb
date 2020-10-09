package web

import (
	"abbp/controller"
	"abbp/db"
	"abbp/middleware"

	"github.com/gin-gonic/gin"
)

//RunServer port 8080
func RunServer() {
	db.ConnectDatabase()
	router := gin.Default()
	router.Use(middleware.CORSMiddleware())
	router.POST("/login", controller.LoginHandle)
	router.POST("/logout", controller.Logouthandle)

	api := router.Group("/api")
	{
		// check author
		api.Use(middleware.AuthorizeJWT())
		api.GET("/sku", controller.GetSKUs)
		api.GET("/sku/:id", controller.GetSKU)
		api.POST("/sku", controller.CreateSKU)
		api.PUT("/sku/:id", controller.UpdateSKU)
		api.DELETE("/sku/:id", controller.DeleteSKU)
	}

	router.Run(":8080")
}
