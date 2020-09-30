package db

import (
	"abbp/model"
	"log"
)

func (d DB) GetTechnologies() ([]*model.Technology, error) {
	log.Println("GetTechnologies")
	rows, err := d.db.Query("select name, details from technologies")
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	var tech []*model.Technology
	for rows.Next() {
		t := new(model.Technology)
		err = rows.Scan(&t.Name, &t.Details)
		if err != nil {
			return nil, err
		}
		tech = append(tech, t)
	}
	return tech, nil
}
