package entity

import (
	"gorm.io/gorm"
)

type Collection struct {
	gorm.Model
	CollectionName  string `json:"CollectionName"`
	
	UserID uint `json:"UserID"`
	User   User `gorm:"foreignKey:UserID"`
	
	CollectionMovie []CollectionMovie `gorm:"foreignKey:CollectionID"`
	//Movie []Movie `gorm:"many2many:CollectionMovie;"`
}