package entity

import (
	"gorm.io/gorm"
)

type Movie struct {
	gorm.Model
	Movie_name  		string  `json:"Movie_name"`
	Movie_poster  		string  `json:"Movie_poster"`
	Movie_information   string  `json:"Movie_information"`
	Movie_video 		string  `json:"Movie_video"`
	Movie_length        string `json:"Movie_length"`
	
	// 1 Movie เป็นเจ้าของได้หลาย History
	History []History `gorm:"foreignKey:MovieID"`
	CollectionMovie []CollectionMovie `gorm:"foreignKey:MovieID"`
	Review []Review `gorm:"foreignKey:MovieID"`
	//Collection []Collection `gorm:"many2many:CollectionMovie;"`
}
