package entity

import (
	"gorm.io/gorm"
)

type Collection struct {
	gorm.Model
	Collection_name  string
	
	User_ID uint
	User   User `gorm:"foreignKey:User_ID"`

	//Movie []Movie `gorm:"many2many:CollectionMovie;"`
}