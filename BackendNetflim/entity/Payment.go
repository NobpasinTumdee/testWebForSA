package entity

import (
	"time"
	"gorm.io/gorm"
)

type Payment struct {
	gorm.Model
	Payment_method  string
	Payment_status  string
	Date  time.Time
	
	User_ID uint
	User   User `gorm:"foreignKey:User_ID"`

	Package_ID uint
	MoviePackage   MoviePackage `gorm:"foreignKey:Package_ID"`
	
	
}