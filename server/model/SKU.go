package model

import (
	"errors"
	"strings"
)

// SKU model
type SKU struct {
	ID          uint64 `gorm:"primary_id;auto_increment" json:"id"`
	Name        string `gorm:"size:100;not null;" json:"name"`
	Status      bool
	Description string `gorm:"size:200" json:"description"`
}

// Prepare cleans the inputs
func (u *SKU) Prepare() {
	u.Name = strings.TrimSpace(u.Name)
	u.Description = strings.TrimSpace(u.Description)
}

// Validate validates the inputs
func (u *SKU) Validate() error {
	if u.Name == "" {
		return errors.New("Name is required")
	}
	return nil
}
