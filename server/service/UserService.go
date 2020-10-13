package service

import (
	"abbp/db"
	"abbp/model"
)

// LoginUser fn
func LoginUser(username string, password string) bool {
	var user model.User
	if err := db.DB.Where("name = ? AND password = ?", username, password).First(&user).Error; err != nil {
		return false
	}
	return true
}
