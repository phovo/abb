package model

import (
	"errors"
	"strings"
	"time"
)

// Product model
type Product struct {
	ID            uint64    `gorm:"primary_id;auto_increment" json:"id"`
	Name          string    `json:"name" gorm:"size:100" `
	Status        bool      `json:"status" gorm:"type:boolean"`
	EffectiveDate time.Time `json:"effectiveDate" gorm:"type:timestamp"`
	ExpiredDate   time.Time `json:"expiredDate" gorm:"type:timestamp"`
	Type          string    `json:"type" gorm:"size:100" `
	File          string    `json:"file" `
	SKUs          []SKU     `gorm:"many2many:product_sku;"`
}

// Prepare cleans the inputs
func (u *Product) Prepare() {
	u.Name = strings.TrimSpace(u.Name)
	u.Type = strings.TrimSpace(u.Type)
	u.File = strings.TrimSpace(u.File)
}

// Validate validates the inputs
func (u *Product) Validate() error {
	if u.Name == "" {
		return errors.New("Name is required")
	}
	if u.Type == "" {
		return errors.New("Type is required")
	}
	if u.File == "" {
		return errors.New("File is required")
	}
	if u.ExpiredDate.Before(u.EffectiveDate) {
		return errors.New("ExpiredDate is invalid")
	}
	return nil
}
