package db

import (
	"abbp/model"
	"log"
	"os"

	"github.com/jinzhu/gorm"
	_ "github.com/lib/pq" // import driver postgress
)

// DB source
var DB *gorm.DB

// ConnectDatabase to DB
func ConnectDatabase() {
	database, err := gorm.Open("postgres", dataSource())
	if err != nil {
		panic("Failed to connect to database!")
	}

	err = database.Debug().DropTableIfExists(&model.User{}, &model.Role{}, &model.SKU{}).Error
	if err != nil {
		log.Fatal(err)
	}

	err = database.AutoMigrate(&model.User{}, &model.Role{}, &model.SKU{}, &model.Product{}).Error
	if err != nil {
		log.Fatal(err)
	}
	// insert data roles
	for i, _ := range roles {
		err = database.Debug().Model(&model.Role{}).Create(&roles[i]).Error
		if err != nil {
			log.Fatal(err)
		}
	}
	// insert data user
	err = database.Debug().Create(&user).Error
	if err != nil {
		log.Fatal(err)
	}

	DB = database
}

func dataSource() string {
	host := "localhost"
	pass := "postgres"
	if os.Getenv("profile") == "prod" {
		host = "db"
		pass = os.Getenv("db_pass")
	}
	return "postgresql://" + host + ":5432/abb" +
		"?user=postgres&sslmode=disable&password=" + pass
}
