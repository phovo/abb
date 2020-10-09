package model

// Role model
type Role struct {
	ID   uint64 `gorm:"primary_id;auto_increment" json:"id"`
	Name string `gorm:"size:20;not null;" json:"name"`
}
