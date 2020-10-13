package model

import "time"

// Product model
type Product struct {
	ID            uint64    `gorm:"primary_id;auto_increment" json:"id"`
	Name          string    `json:"name" gorm:"size:100" `
	Status        bool      `json:"status" gorm:"type:boolean"`
	EffectiveDate time.Time `json:"effectiveDate" gorm:"type:timestamp"`
	ExpiredDate   time.Time `json:"expiredDate" gorm:"type:timestamp"`
	Type          string    `json:"type" gorm:"size:100" `
	File          string    `json:"file" gorm:"size:100" `
	SKUs          []SKU     `gorm:"many2many:product_sku;"`
}
