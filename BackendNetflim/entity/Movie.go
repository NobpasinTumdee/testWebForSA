package entity

import (
	"gorm.io/gorm"
)

type Movie struct {
	gorm.Model
	Movie_name  		string
	Movie_poster  		string
	Movie_information   string
	Movie_video 		string
	Movie_length        float32
	
	// 1 Movie เป็นเจ้าของได้หลาย History
	History []History `gorm:"foreignKey:MovieID"`
	CollectionMovie []CollectionMovie `gorm:"foreignKey:MovieID"`
	//Collection []Collection `gorm:"many2many:CollectionMovie;"`
}
