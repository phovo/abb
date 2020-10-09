package service

import (
	"abbp/db"
	"abbp/dto"
	"abbp/model"
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
func GetSKUs(page, size string) dto.OperationResult {
	var SKUs []model.SKU
	err := db.DB.Offset(page).Limit(size).Find(&SKUs).Order("id").Error
	if err != nil {
		return dto.OperationResult{Error: err}
	}
	return dto.OperationResult{Result: &SKUs}
}
