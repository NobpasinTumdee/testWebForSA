package entity

import (
	"time"
	"gorm.io/gorm"
)

type History struct {
	gorm.Model
	Date  time.Time 	`json:"Date"`
	
	UserID uint 		`json:"UserID"`
	User   User 		`gorm:"foreignKey:UserID"`

	MovieID uint 		`json:"MovieID"`
	Movie   Movie `gorm:"foreignKey:MovieID"`
	
	
}