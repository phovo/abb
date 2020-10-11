package dto

// Pagenation dto
type Pagenation struct {
	Items      interface{} `json:"items"`
	Page       int         `json:"page"`
	Size       int         `json:"size"`
	TotalPage  int         `json:"totalPage"`
	TotalItems int         `json:"totalItems"`
}
