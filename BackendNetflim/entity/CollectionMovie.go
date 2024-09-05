package entity

import (
 	"gorm.io/gorm"
)

type CollectionMovie struct {
	gorm.Model
	ID           uint
	CollectionID uint
	Collection   Collection `gorm:"foreignKey:CollectionID"`

	MovieID      uint
	Movie   Movie `gorm:"foreignKey:MovieID"`
}