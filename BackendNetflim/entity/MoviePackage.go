package entity

import (
	
	"gorm.io/gorm"
)

type MoviePackage struct {
	gorm.Model
	Package_name   string `json:"Package_name"`
	Price     	   int    `json:"Price"`
	Duration	   int    `json:"Duration"`
	
}