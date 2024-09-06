package entity

import (
	"gorm.io/gorm"
)

type User struct {
	gorm.Model
	Email  string 		`json:"email"`
	Username  string 	`json:"username"`
	Password     string `json:"password"`
	Status string 		`json:"status"`
	
	// 1 User เป็นเจ้าของได้หลาย History
	History []History `gorm:"foreignKey:UserID"`

	// 1 User เป็นเจ้าของได้หลาย Collection
	Collection []Collection `gorm:"foreignKey:UserID"`

	// 1 User เป็นเจ้าของได้หลาย Payment
	Payment []Payment `gorm:"foreignKey:UserID"`
}