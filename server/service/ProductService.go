package service

import (
	"abbp/db"
	"abbp/dto"
	"abbp/model"
	"math"
	"strconv"
)

// CreateProduct returns a new product created or an error
func CreateProduct(product model.Product) dto.OperationResult {

	err := db.DB.Create(&product).Error
	if err != nil {
		return dto.OperationResult{Error: err}
	}
	return dto.OperationResult{Result: product}
}

// GetProducts get all
func GetProducts(page, size, textSearch string) dto.OperationResult {

	pageNumber, _ := strconv.Atoi(page)
	sizeNumber, _ := strconv.Atoi(size)

	var products []model.Product
	var pagination dto.Pagenation
	var offset, totalItem, totalPage int

	// db.DB.Model(products).Count(&totalItem)

	if pageNumber < 1 {
		pageNumber = 1
	}
	if sizeNumber == 0 {
		sizeNumber = 5
	}

	if pageNumber == 1 {
		offset = 0
	} else {
		offset = (pageNumber - 1) * sizeNumber
	}
	if textSearch == "" {
		db.DB.Offset(offset).Limit(sizeNumber).Find(&products).Order("id")
		db.DB.Model(products).Count(&totalItem)
	} else {
		db.DB.Where("name LIKE ?", textSearch+"%").Offset(offset).Limit(sizeNumber).Find(&products).Order("id")
		db.DB.Model(products).Where("name LIKE ?", textSearch+"%").Count(&totalItem)
	}
	// db.DB.Offset(offset).Limit(sizeNumber).Find(&products).Order("id")
	totalPage = int(math.Ceil(float64(totalItem) / float64(sizeNumber)))

	pagination.Items = products
	pagination.Page = pageNumber
	pagination.Size = sizeNumber
	pagination.TotalItems = totalItem
	pagination.TotalPage = totalPage

	return dto.OperationResult{Result: pagination}
}

// GetProduct detail product
func GetProduct(id string) dto.OperationResult {
	var product model.Product
	err := db.DB.Where("id = ?", id).First(&product).Error
	if err != nil {
		return dto.OperationResult{Error: err}
	}

	return dto.OperationResult{Result: &product}
}

// UpdateProduct  returns a product updated or an error
func UpdateProduct(id string, product *model.Product) dto.OperationResult {

	existingproductResponse := GetProduct(id)

	if existingproductResponse.Error != nil {
		return dto.OperationResult{Error: existingproductResponse.Error}
	}
	existingProduct := existingproductResponse.Result.(*model.Product)
	existingProduct.Name = product.Name
	existingProduct.Status = product.Status
	existingProduct.EffectiveDate = product.EffectiveDate
	existingProduct.ExpiredDate = product.ExpiredDate
	existingProduct.Type = product.Type
	existingProduct.File = product.File
	existingProduct.SKUs = product.SKUs

	err := db.DB.Save(&existingProduct).Error
	if err != nil {
		return dto.OperationResult{Error: err}
	}

	return dto.OperationResult{Result: &existingProduct}
}

// DeleteProduct return deleted product or an error
func DeleteProduct(id string) dto.OperationResult {

	existProductResponse := GetProduct(id)

	if existProductResponse.Error != nil {
		return dto.OperationResult{Error: existProductResponse.Error}
	}
	existingProduct := existProductResponse.Result.(*model.Product)
	err := db.DB.Delete(&existingProduct).Error
	if err != nil {
		return dto.OperationResult{Error: err}
	}

	return dto.OperationResult{Result: &existingProduct}
}
