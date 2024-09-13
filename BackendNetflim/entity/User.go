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
	Firstname string	`json:"firstname"`
	Lastname string		`json:"lastname"`
	Age string			`json:"age"`
	Phonenumber string	`json:"phonenumber"`


	GenderID uint 		`json:"GenderID"`
	Gender   Gender 	`gorm:"foreignKey:GenderID"`

	// 1 User เป็นเจ้าของได้หลาย History
	History []History `gorm:"foreignKey:UserID"`

	// 1 User เป็นเจ้าของได้หลาย Collection
	Collection []Collection `gorm:"foreignKey:UserID"`

	// 1 User เป็นเจ้าของได้หลาย Payment
	Payment []Payment `gorm:"foreignKey:UserID"`


}