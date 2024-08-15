package entity

import (
	"gorm.io/gorm"
)

type User struct {
	gorm.Model
	Email  string
	Username  string
	Password     string
	Status string
	
	// 1 User เป็นเจ้าของได้หลาย History
	History []History `gorm:"foreignKey:User_ID"`

	// 1 User เป็นเจ้าของได้หลาย Collection
	Collection []Collection `gorm:"foreignKey:User_ID"`

	// 1 User เป็นเจ้าของได้หลาย Payment
	Payment []Payment `gorm:"foreignKey:User_ID"`
}