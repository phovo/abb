package db

import "abbp/model"

var roles = []model.Role{
	model.Role{Name: "SYSADMIN"},
	model.Role{Name: "ADMIN"},
	model.Role{Name: "MANAGER"},
}

var user = model.User{Name: "system", Email: "system@admin.com", Password: "sa123456", Roles: []model.Role{model.Role{ID: 1, Name: "SYSADMIN"}}}
