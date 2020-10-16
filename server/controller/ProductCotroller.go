package controller

import (
	"abbp/dto"
	"abbp/model"
	"abbp/response"
	"abbp/service"
	"abbp/utils"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
)

// Createproduct controller
func CreateProduct(context *gin.Context) {
	var productDTO dto.Product
	err := context.ShouldBindJSON(&productDTO)
	if err != nil {
		response.ERROR(context, http.StatusBadRequest, utils.INFO_PRODUCT_INVALID)
		return
	}

	EffectiveDate, _ := time.Parse(time.RFC3339, productDTO.EffectiveDate)
	ExpiredDate, _ := time.Parse(time.RFC3339, productDTO.ExpiredDate)

	product := model.Product{
		Name:          productDTO.Name,
		Status:        productDTO.Status,
		EffectiveDate: EffectiveDate,
		ExpiredDate:   ExpiredDate,
		Type:          productDTO.Type,
		File:          productDTO.Attachments,
		SKUs:          productDTO.SKUs,
	}
	product.Prepare()
	errValidate := product.Validate()
	if errValidate != nil {
		response.ERROR(context, http.StatusUnprocessableEntity, errValidate.Error())
		return
	}
	operationResult := service.CreateProduct(product)
	if operationResult.Error != nil {
		response.ERROR(context, http.StatusBadRequest, utils.ERROR_CREATE_ENTITY)
		return
	}
	response.JSON(context, http.StatusOK, operationResult.Result)
}

// GetProducts controller
func GetProducts(context *gin.Context) {
	page := context.DefaultQuery("page", utils.PAGE_DEFAULT)
	size := context.DefaultQuery("size", utils.SIZE_DEFAULT)
	textSearch := context.DefaultQuery("searchText", utils.VALUE_EMPTY)
	operationResult := service.GetProducts(page, size, textSearch)
	if operationResult.Error != nil {
		response.ERROR(context, http.StatusBadRequest, utils.NOT_FOUND_ENTITY)
		return
	}

	response.JSON(context, http.StatusOK, operationResult.Result)
}

// GetProduct controller
func GetProduct(context *gin.Context) {
	id := context.Param("id")
	operationResult := service.GetProduct(id)
	if operationResult.Error != nil {
		response.ERROR(context, http.StatusBadRequest, utils.NOT_FOUND_ENTITY)
		return
	}
	response.JSON(context, http.StatusOK, operationResult.Result)
}

// UpdateProduct controller
func UpdateProduct(context *gin.Context) {
	id := context.Param("id")
	var product model.Product
	err := context.ShouldBindJSON(&product)
	if err != nil {
		response.ERROR(context, http.StatusBadRequest, utils.INFO_PRODUCT_INVALID)
		return
	}
	product.Prepare()
	errValidate := product.Validate()
	if errValidate != nil {
		response.ERROR(context, http.StatusUnprocessableEntity, errValidate.Error())
		return
	}
	operationResult := service.UpdateProduct(id, &product)
	if operationResult.Error != nil {
		response.ERROR(context, http.StatusBadRequest, utils.ERROR_UPDATE_ENTITY)
		return
	}
	response.JSON(context, http.StatusOK, operationResult.Result)
}

// DeleteProduct controller
func DeleteProduct(context *gin.Context) {
	id := context.Param("id")
	operationResult := service.DeleteProduct(id)
	if operationResult.Error != nil {
		response.ERROR(context, http.StatusBadRequest, operationResult.Error.Error())
		return
	}
	response.JSON(context, http.StatusOK, operationResult.Result)

}
