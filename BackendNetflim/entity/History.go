package entity

import (
	"time"
	"gorm.io/gorm"
)

type History struct {
	gorm.Model
	Date  time.Time
	
	User_ID uint
	User   User `gorm:"foreignKey:User_ID"`

	Movie_ID uint
	Movie   Movie `gorm:"foreignKey:Movie_ID"`
	
	
}