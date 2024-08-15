package entity

import (
	"gorm.io/gorm"
)

type Collection struct {
	gorm.Model
	Collection_name  string
	
	UserID uint
	User   User `gorm:"foreignKey:UserID"`

	Movie []Movie `gorm:"many2many:CollectionMovie;"`
}