package controller

import (
	"abbp/model"
	"abbp/response"
	"abbp/service"
	"abbp/utils"
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
	operationResult := service.GetSKUs(page, size)
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
