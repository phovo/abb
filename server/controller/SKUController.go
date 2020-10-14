package controller

import (
	"abbp/model"
	"abbp/response"
	"abbp/service"
	"abbp/utils"
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
)

// CreateSKU new a SKU
func CreateSKU(context *gin.Context) {
	// initialization contact model
	var sku model.SKU
	// validate json
	err := context.ShouldBindJSON(&sku)
	// validation errors
	if err != nil {
		// generate validation errors response
		response.ERROR(context, http.StatusBadRequest, utils.INFO_SKU_INVALID)
		return
	}
	sku.Prepare()
	errValidate := sku.Validate()
	if errValidate != nil {
		response.ERROR(context, http.StatusUnprocessableEntity, errValidate.Error())
		return
	}

	operationResult := service.CreateSKU(sku)
	if operationResult.Error != nil {
		response.ERROR(context, http.StatusBadRequest, utils.ERROR_CREATE_ENTITY)
		return
	}

	response.JSON(context, http.StatusOK, operationResult.Result)
}

// GetSKUs all SKU
func GetSKUs(context *gin.Context) {
	page := context.DefaultQuery("page", utils.PAGE_DEFAULT)
	size := context.DefaultQuery("size", utils.SIZE_DEFAULT)
	textSearch := context.DefaultQuery("textSearch", utils.VALUE_EMPTY)
	operationResult := service.GetSKUs(page, size, textSearch)
	if operationResult.Error != nil {
		response.ERROR(context, http.StatusBadRequest, utils.NOT_FOUND_ENTITY)
		return
	}

	response.JSON(context, http.StatusOK, operationResult.Result)
}

// GetSKU detail SKU
func GetSKU(context *gin.Context) {
	id := context.Param("id")
	operationResult := service.GetSKU(id)
	if operationResult.Error != nil {
		response.ERROR(context, http.StatusBadRequest, utils.NOT_FOUND_ENTITY)
		return
	}
	response.JSON(context, http.StatusOK, operationResult.Result)
}

// UpdateSKU update a SKU
func UpdateSKU(context *gin.Context) {
	id := context.Param("id")
	// initialization contact model
	var sku model.SKU
	// validate json
	err := context.ShouldBindJSON(&sku)
	// validation errors
	if err != nil {
		// generate validation errors response
		response.ERROR(context, http.StatusBadRequest, utils.INFO_SKU_INVALID)
		return
	}

	sku.Prepare()
	errValidate := sku.Validate()
	if errValidate != nil {
		response.ERROR(context, http.StatusUnprocessableEntity, errValidate.Error())
		return
	}

	operationResult := service.UpdateSKU(id, &sku)
	if operationResult.Error != nil {
		response.ERROR(context, http.StatusBadRequest, utils.ERROR_UPDATE_ENTITY)
		return
	}
	response.JSON(context, http.StatusOK, operationResult.Result)
}

// DeleteSKU delete a SKU
func DeleteSKU(context *gin.Context) {
	id := context.Param("id")
	operationResult := service.DeleteSKU(id)
	if operationResult.Error != nil {
		response.ERROR(context, http.StatusBadRequest, utils.ERROR_DELETE_ENTITY)
		return
	}
	response.JSON(context, http.StatusOK, operationResult.Result)
}

func TestPage(context *gin.Context) {
	// limit := 10
	// page := 1
	// sort := "name asc"
	// var searchs []dto.Search
	// get current url path
	query := context.Request.URL.Query()
	for index, value := range query {
		queryValue := value[len(value)-1]
		fmt.Println(queryValue)
		fmt.Println(index)
	}
	fmt.Println("okkkkkkkk")
	// search query params
	// searchQueryParams := ""
	// for _, search := range []dto.Search {
	// 	// fmt.Sprintf("&%s.%s=%s", search.Column, search.Action, search.Query)
	// 	// searchQueryParams += String.form "&%s.%s=%s", search.Column, search.Action, search.Query)
	// }
}
