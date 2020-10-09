package service

import (
	"abbp/db"
	"abbp/model"
)

// LoginService login
type LoginService interface {
	LoginUser(email string, password string) bool
}

// LoginUser hard code
func LoginUser(username string, password string) bool {
	var user model.User
	if err := db.DB.Where("name = ? AND password = ?", username, password).First(&user).Error; err != nil {
		return false
	}
	return true
}
