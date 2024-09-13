package entity

import (
	"gorm.io/gorm"
)

type Gender struct {
	gorm.Model
	Gender  string 		`json:"gender"`
	
	
	// 1 Gender เป็นเจ้าของได้หลาย User
	User []User `gorm:"foreignKey:GenderID"`

	
}