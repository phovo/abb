package model

// SKU model
type SKU struct {
	ID          uint64 `gorm:"primary_id;auto_increment" json:"id"`
	Name        string `gorm:"size:100;not null;" json:"name"`
	Status      bool
	Description string `gorm:"size:200" json:"description"`
}
