package entity

import (
 	"gorm.io/gorm"
)

type CollectionMovie struct {
	gorm.Model
	//ID           uint `json:"ID"`
	CollectionID uint `json:"CollectionID"`
	Collection   Collection `gorm:"foreignKey:CollectionID"`

	MovieID      uint `json:"MovieID"`
	Movie   Movie `gorm:"foreignKey:MovieID"`
}