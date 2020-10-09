package model

// User model
type User struct {
	ID       uint64 `gorm:"primary_id;auto_increment" json:"id"`
	Name     string `gorm:"size:100;not null;" json:"name"`
	Email    string `gorm:"size:100;not null;unique" json:"email"`
	Password string `gorm:"size:100;not null;unique" json:"password"`
	Roles    []Role `gorm:"many2many:user_role;"`
}
