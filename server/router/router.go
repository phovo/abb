package router

import (
	"github.com/gorilla/mux"
)

// Router is exported and used in main.go
func Router() *mux.Router {

	router := mux.NewRouter()

	router.HandleFunc("/api/task", nil).Methods("GET", "OPTIONS")

	return nil
}
