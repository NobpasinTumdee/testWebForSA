package entity

import (
	"time"
	"gorm.io/gorm"
)

type History struct {
	gorm.Model
	Date  time.Time
	
	UserID uint
	User   User `gorm:"foreignKey:UserID"`

	MovieID uint
	Movie   Movie `gorm:"foreignKey:MovieID"`
	
	
}