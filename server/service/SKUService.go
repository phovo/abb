package service

import (
	"abbp/db"
	"abbp/dto"
	"abbp/model"
	"math"
	"strconv"
)

// CreateSKU returns a new SKU created or an error
func CreateSKU(SKU model.SKU) dto.OperationResult {

	err := db.DB.Create(&SKU).Error
	if err != nil {
		return dto.OperationResult{Error: err}
	}
	return dto.OperationResult{Result: SKU}
}

// UpdateSKU  returns a SKU updated or an error
func UpdateSKU(id string, SKU *model.SKU) dto.OperationResult {

	existingSKUResponse := GetSKU(id)

	if existingSKUResponse.Error != nil {
		return dto.OperationResult{Error: existingSKUResponse.Error}
	}
	existingSKU := existingSKUResponse.Result.(*model.SKU)
	existingSKU.Name = SKU.Name
	existingSKU.Status = SKU.Status
	existingSKU.Description = SKU.Description

	err := db.DB.Save(&existingSKU).Error
	if err != nil {
		return dto.OperationResult{Error: err}
	}

	return dto.OperationResult{Result: &existingSKU}
}

// DeleteSKU return deleted SKU or an error
func DeleteSKU(id string) dto.OperationResult {

	existingSKUResponse := GetSKU(id)

	if existingSKUResponse.Error != nil {
		return dto.OperationResult{Error: existingSKUResponse.Error}
	}
	existingSKU := existingSKUResponse.Result.(*model.SKU)
	err := db.DB.Delete(&existingSKU).Error
	if err != nil {
		return dto.OperationResult{Error: err}
	}

	return dto.OperationResult{Result: &existingSKU}
}

// GetSKU detail SKU
func GetSKU(id string) dto.OperationResult {
	var SKU model.SKU
	err := db.DB.Where("id = ?", id).First(&SKU).Error
	if err != nil {
		return dto.OperationResult{Error: err}
	}

	return dto.OperationResult{Result: &SKU}
}

// GetSKUs get all
func GetSKUs(page, size, textSearch string) dto.OperationResult {

	pageNumber, _ := strconv.Atoi(page)
	sizeNumber, _ := strconv.Atoi(size)

	var SKUs []model.SKU
	var pagination dto.Pagenation
	var offset, totalItem, totalPage int

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
		db.DB.Offset(offset).Limit(sizeNumber).Find(&SKUs).Order("id")
		db.DB.Model(SKUs).Count(&totalItem)
	} else {
		db.DB.Where("name LIKE ?", textSearch+"%").Offset(offset).Limit(sizeNumber).Find(&SKUs).Order("id")
		db.DB.Model(SKUs).Where("name LIKE ?", textSearch+"%").Count(&totalItem)
	}

	totalPage = int(math.Ceil(float64(totalItem) / float64(sizeNumber)))

	pagination.Items = SKUs
	pagination.Page = pageNumber
	pagination.Size = sizeNumber
	pagination.TotalItems = totalItem
	pagination.TotalPage = totalPage

	return dto.OperationResult{Result: pagination}
}

// func PageingCommon(data []interface{}, pageNumber int, sizeNumber int) *dto.Pagenation {

// 	var pagination dto.Pagenation
// 	var offset, limit, totalItem int //totalPage
// 	db.DB.Model(data).Count(&totalItem)

// 	if pageNumber < 1 {
// 		pageNumber = 1
// 	}
// 	if sizeNumber == 0 {
// 		limit = 5
// 	}

// 	if pageNumber == 1 {
// 		offset = 0
// 	} else {
// 		offset = (pageNumber - 1) * limit
// 	}
// 	db.DB.Limit(limit).Offset(offset).Find(data)
// 	//totalPage = int(math.Ceil(float64(totalItem) / float64(limit)))

// 	pagination.Items = data
// 	// pagination.page = 8
// 	// pagination.size = 8
// 	// pagination.totalPage = 8
// 	// pagination.totalItems = 8

// 	return &pagination
// }
