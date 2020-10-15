package dto

import (
	"abbp/model"
)

// Product model
type Product struct {
	ID            uint64 `gorm:"primary_id;auto_increment" json:"id"`
	Name          string `json:"name" gorm:"size:100" `
	Status        bool   `json:"status" gorm:"type:boolean"`
	EffectiveDate string `json:"effectiveDate" gorm:"size:255"`
	ExpiredDate   string `json:"expiredDate" gorm:"size:255"`
	Type          string `json:"type" gorm:"size:100" `
	Attachments   string `json:"attachments" gorm:"size:100" `
	SKUs          []model.SKU
}
