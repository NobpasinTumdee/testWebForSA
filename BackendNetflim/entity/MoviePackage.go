package entity

import (
	
	"gorm.io/gorm"
)

type MoviePackage struct {
	gorm.Model
	Package_name   string
	Price     	   int
	Duration	   int
	
}