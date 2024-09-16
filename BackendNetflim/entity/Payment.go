package entity

import (
	"time"
	"gorm.io/gorm"
)

type Payment struct {
	gorm.Model
	Payment_method  string `json:"Payment_method"`
	Payment_status  string `json:"Payment_status"`
	Date  time.Time        `json:"DateP"`
	Expiration time.Time   `json:"Expiration"`
	
	UserID uint 		   `json:"UserID"`
	User   User `gorm:"foreignKey:UserID"`

	PackageID uint		   `json:"PackageID"`
	MoviePackage   MoviePackage `gorm:"foreignKey:PackageID"`
	
	
}