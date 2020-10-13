package web

import (
	"abbp/controller"
	"abbp/db"
	"abbp/middleware"

	"github.com/gin-gonic/gin"
	httpSwagger "github.com/swaggo/http-swagger"
)

//RunServer port 8080
func RunServer() {
	db.ConnectDatabase()
	router := gin.Default()
	router.Use(middleware.CORSMiddleware())
	router.POST("/login", controller.LoginHandle)
	router.POST("/logout", controller.Logouthandle)
	router.POST("/refresh", controller.RefreshHandle)

	api := router.Group("/api")
	{
		// check author
		api.Use(middleware.AuthorizeJWT())
		api.GET("/sku", controller.GetSKUs)
		api.GET("/sku/:id", controller.GetSKU)
		api.POST("/sku", controller.CreateSKU)
		api.PUT("/sku/:id", controller.UpdateSKU)
		api.DELETE("/sku/:id", controller.DeleteSKU)

		api.GET("/product", controller.GetProducts)
		api.GET("/product/:id", controller.GetProduct)
		api.POST("/product", controller.CreateProduct)
		api.PUT("/product/:id", controller.UpdateProduct)
		api.DELETE("/product/:id", controller.DeleteProduct)
	}

	router.GET("/swagger/*any", Swagger)
	router.Run(":8080")
}

// Swagger api
func Swagger(c *gin.Context) {
	httpSwagger.WrapHandler(c.Writer, c.Request)
}
