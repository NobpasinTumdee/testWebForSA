package main

import (
	"backendproject/entity"

	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)


func main() {
  db, err := gorm.Open(sqlite.Open("Netfilm.db"), &gorm.Config{})
  if err != nil {
    panic("failed to connect database")
  }

  // Migrate the schema
  db.AutoMigrate(&entity.Collection{},&entity.History{},&entity.Movie{},&entity.MoviePackage{},&entity.Payment{},&entity.User{})
}