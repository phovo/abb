package web

import (
	"encoding/json"
	"net/http"
)

func (a *App) GetTypes(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	types, err := a.d.GetTypes()
	if err != nil {
		sendErr(w, http.StatusInternalServerError, err.Error())
		return
	}
	err = json.NewEncoder(w).Encode(types)
	if err != nil {
		sendErr(w, http.StatusInternalServerError, err.Error())
	}
}
