package routes

import (
	"abbp/controller"
	"abbp/middleware"

	"github.com/gin-gonic/gin"
)

// SetupRoutes route
func SetupRoutes() *gin.Engine {
	route := gin.Default()
	route.Use(middleware.CORSMiddleware())
	route.POST("/login", controller.LoginHandle)
	route.POST("/logout", controller.Logouthandle)
	route.POST("/refresh", controller.RefreshHandle)
	route.POST("/testtttt", controller.TestPage)

	api := route.Group("/api")
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
	return route
}
