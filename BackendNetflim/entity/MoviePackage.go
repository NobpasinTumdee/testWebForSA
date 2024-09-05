package entity

import (
	
	"gorm.io/gorm"
)

type MoviePackage struct {
	gorm.Model
	Package_name   string
	Price     	   float32 `gorm:"type:decimal(10,2)"`
	Duration	   int
	
}