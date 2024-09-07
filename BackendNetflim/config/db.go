package config

import (
	"backendproject/entity"
	"fmt"
	"time"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

var db *gorm.DB

func DB() *gorm.DB {
	return db
}

func ConnectionDB() {
	database, err := gorm.Open(sqlite.Open("Netfilm2.db?cache=shared"), &gorm.Config{})
	if err != nil {
		panic("failed to connect database")
	}
	fmt.Println("connected database")
	db = database
}

func SetupDatabase() {

	db.AutoMigrate(
		&entity.User{},
		&entity.Movie{},
		&entity.History{},
		&entity.MoviePackage{},
		&entity.Payment{},
		&entity.Collection{},
		&entity.CollectionMovie{},
	)



	hashedPassword, _ := HashPassword("123456")
	//BirthDay, _ := time.Parse("2006-01-02", "1988-11-12")

	//User
	User := []entity.User{
		{Email: "B6506407@g.sut.ac.th",Username:  "Nobpasin Tumdee",Password:    hashedPassword ,Status:  "Pass"},
		{Email: "B6525972@g.sut.ac.th",Username:  "Nichakorn Chanyutha",Password:    hashedPassword ,Status:  "Pass"},
	}
	for _, pkg := range User {
		db.FirstOrCreate(&pkg,entity.User{Username: pkg.Username})
	}

	//Movie
	Movie := []entity.Movie{
		{Movie_name: "Violet Evergarden", 
		Movie_poster: "https://musicart.xboxlive.com/7/e08a5200-0000-0000-0000-000000000002/504/image.jpg", 
		Movie_information:  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis totam et autem inventore aliquam nisi nemo in eos blanditiis odit repellendus corporis tenetur repellat, quasi, magni sunt beatae maiores. Error incidunt earum repudiandae dolore? Nostrum eveniet animi fuga alias iusto velit, aut officiis accusantium quam impedit tenetur excepturi facilis numquam.",
		Movie_video: "https://www.youtube.com/embed/BUfSen2rYQs?si=Qy6YbwiWETp44W5d&autoplay=1" , 
		Movie_length: 20},
		{Movie_name: "YourName", 
		Movie_poster: "https://m.media-amazon.com/images/M/MV5BNDBlYmY3MzktMTgyOS00MTAwLTlkZDMtMGUzNDIyNTU2NjcyXkEyXkFqcGdeQXVyMTAyOTE2ODg0._V1_.jpg", 
		Movie_information:  "Lorem YourName dolor sit amet consectetur adipisicing elit. Facilis totam et autem inventore aliquam nisi nemo in eos blanditiis odit repellendus corporis tenetur repellat, quasi, magni sunt beatae maiores. Error incidunt earum repudiandae dolore? Nostrum eveniet animi fuga alias iusto velit, aut officiis accusantium quam impedit tenetur excepturi facilis numquam.",
		Movie_video: "https://www.youtube.com/embed/a2GujJZfXpg?si=Ku8184mli1K3aHrC&autoplay=1" , 
		Movie_length: 20},
	}
	for _, pkg := range Movie {
		db.FirstOrCreate(&pkg,entity.Movie{Movie_name: pkg.Movie_name})
	}
	
	
	//MoviePackages
	MoviePackages := []entity.MoviePackage{
		{Package_name: "Week", Price: 59, Duration: 7},
		{Package_name: "Month", Price: 199, Duration: 30},
		{Package_name: "Year", Price: 1999, Duration: 365},
	}
	for _, pkg := range MoviePackages {
		db.FirstOrCreate(&pkg, entity.MoviePackage{Package_name: pkg.Package_name})
	}

	//History
	Historys := []entity.History{
		{Date: time.Now(), UserID: 1, MovieID: 1},

	}
	for _, history  := range Historys {
		// ใช้ UserID และ MovieID เป็นเงื่อนไขในการค้นหา
        db.FirstOrCreate(&history, entity.History{UserID: history.UserID, MovieID: history.MovieID})
	}


	//Payment , payments
	payments := []entity.Payment{
		{Payment_method: "PaymentMethodTest", Payment_status: "payStatusTest", Date: time.Now(),UserID: 1,PackageID:1},
	}
	for _, PaymentLoop  := range payments {
		// ใช้ UserID และ PackageID เป็นเงื่อนไขในการค้นหา
        db.FirstOrCreate(&PaymentLoop, entity.Payment{UserID: PaymentLoop.UserID, PackageID: PaymentLoop.PackageID})
	}


	//Collection
	Collections := []entity.Collection{
		{Collection_name: "MyCollection1", UserID: 1,},
	}
	for _, CollectionLoop := range Collections {
		db.FirstOrCreate(&CollectionLoop, entity.Collection{Collection_name: CollectionLoop.Collection_name})
	}


	//collection_movies
	collection_movies := []entity.CollectionMovie{
		{CollectionID: 1, MovieID: 1,},
	}
	for _, collection_moviesLoop := range collection_movies {
		db.FirstOrCreate(&collection_moviesLoop, entity.CollectionMovie{CollectionID: collection_moviesLoop.CollectionID , MovieID: collection_moviesLoop.MovieID})
	}
}