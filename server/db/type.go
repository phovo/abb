package db

import (
	"abbp/model"
	"log"
)

func (d DB) GetTypes() ([]*model.Type, error) {
	log.Println("GetTypes")
	rows, err := d.db.Query("select code, name from types")
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	var types []*model.Type
	for rows.Next() {
		t := new(model.Type)
		err = rows.Scan(&t.Code, &t.Name)
		if err != nil {
			return nil, err
		}
		types = append(types, t)
	}
	return types, nil
}
