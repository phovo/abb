package controller

import (
	"abbp/dto"
	"abbp/response"
	"abbp/service"
	"abbp/utils"
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
)

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
func Logouthandle(context *gin.Context) {
	fmt.Println("logout............")
}
