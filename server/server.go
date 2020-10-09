package main

import (
	"abbp/web"

	_ "github.com/lib/pq"
)

func main() {
	web.RunServer()
}
