package dto

import (
	"errors"
	"strings"
)

// Credentials contains login request
type Credentials struct {
	Username string `json:"username" binding:"required"`
	Password string `json:"password" binding:"required"`
}

// Prepare cleans the inputs
func (u *Credentials) Prepare() {
	u.Username = strings.TrimSpace(u.Username)
	u.Password = strings.TrimSpace(u.Password)
}

// Validate validates the inputs
func (u *Credentials) Validate() error {
	if u.Username == "" {
		return errors.New("Username is required")
	}
	if u.Password == "" {
		return errors.New("Password is required")
	}
	return nil
}
