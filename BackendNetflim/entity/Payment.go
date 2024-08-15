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
	
	UserID uint
	User   User `gorm:"foreignKey:UserID"`

	PackageID uint
	MoviePackage   MoviePackage `gorm:"foreignKey:PackageID"`
	
	
}