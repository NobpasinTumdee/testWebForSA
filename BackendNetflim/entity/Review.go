package entity

import (
	"time"
	"gorm.io/gorm"
)

type Review struct {
	gorm.Model
	DateReview  time.Time 	`json:"DateReview"`
	Comment string		`json:"Comment"`
	Rating	uint		`json:"Rating"`
	UserID uint 		`json:"UserID"`
	User   User 		`gorm:"foreignKey:UserID"`

	MovieID uint 		`json:"MovieID"`
	Movie   Movie `gorm:"foreignKey:MovieID"`

}