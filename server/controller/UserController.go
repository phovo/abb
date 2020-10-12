package controller

import (
	"abbp/dto"
	"abbp/response"
	"abbp/service"
	"abbp/utils"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/gorilla/sessions"
)

var store = sessions.NewCookieStore([]byte(service.SECRET_KEY))

// LoginHandle controller
func LoginHandle(context *gin.Context) {
	var input dto.Credentials
	if err := context.ShouldBindJSON(&input); err != nil {
		response.ERROR(context, http.StatusUnprocessableEntity, utils.INFO_LOGIN_INVALID)
		return
	}
	// check DB
	isUser := service.LoginUser(input.Username, input.Password)
	if isUser {
		token := service.GenerateToken(input.Username, isUser)
		response.JSON(context, http.StatusOK, token)
		return
	}
	response.ERROR(context, http.StatusUnauthorized, utils.ERROR_LOGIN)
}

// Logouthandle controller
func Logouthandle(context *gin.Context) {
	// set time out cho token
	authHeader := context.GetHeader("Authorization")

	_, err := service.ValidateToken(authHeader)
	if err != nil {
		response.ERROR(context, http.StatusUnauthorized, utils.NO_PERMISSION)
		return
	}

}

// check lai timeout
// RefreshHandle controller
func RefreshHandle(context *gin.Context) {
	authHeader := context.GetHeader("Authorization")

	_, err := service.ValidateToken(authHeader)
	if err != nil {
		response.ERROR(context, http.StatusUnauthorized, utils.NO_PERMISSION)
		return
	}
	tokenRefresh := service.RefreshToken(authHeader)
	if tokenRefresh == "" {
		response.ERROR(context, http.StatusInternalServerError, utils.NO_PERMISSION)
		return
	}
	response.JSON(context, http.StatusOK, tokenRefresh)
}
