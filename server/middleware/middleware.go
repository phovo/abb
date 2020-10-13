package middleware

import (
	"abbp/response"
	"abbp/service"
	"abbp/utils"
	"net/http"

	"github.com/gin-gonic/gin"
)

// AuthorizeJWT author api
func AuthorizeJWT() gin.HandlerFunc {
	return func(c *gin.Context) {
		authHeader := c.GetHeader("Authorization")
		_, err := service.ValidateToken(authHeader)
		if err != nil {
			response.ERROR(c, http.StatusUnauthorized, utils.NO_PERMISSION)
			c.Abort()
		}
		c.Next()
	}
}

// CORSMiddleware cors domain
func CORSMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS, GET, PUT, DELETE")

		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}

		c.Next()
	}
}
