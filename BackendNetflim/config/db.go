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
		{Email: "B6506407@g.sut.ac.th",Username:  "Nobpasin Tumdee",Password:    hashedPassword ,Status:  "User"},
		{Email: "B6525972@g.sut.ac.th",Username:  "Nichakorn Chanyutha",Password:    hashedPassword ,Status:  "User"},
		{Email: "B6511975@g.sut.ac.th",Username:  "Supaluck Tohthong",Password:    hashedPassword ,Status:  "User"},
		{Email: "B6515454@g.sut.ac.th",Username:  "ธนวัฒน์ วัฒนกิจจา",Password:    hashedPassword ,Status:  "User"},
		{Email: "B6505387@g.sut.ac.th",Username:  "Pronaput Mai",Password:    hashedPassword ,Status:  "User"},
		{Email: "B1234567@g.sut.ac.th",Username:  "Admin",Password:    hashedPassword ,Status:  "Admin"},
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
		Movie_length: "20"},//1
		{Movie_name: "YourName", 
		Movie_poster: "https://m.media-amazon.com/images/M/MV5BNDBlYmY3MzktMTgyOS00MTAwLTlkZDMtMGUzNDIyNTU2NjcyXkEyXkFqcGdeQXVyMTAyOTE2ODg0._V1_.jpg", 
		Movie_information:  "Lorem YourName dolor sit amet consectetur adipisicing elit. Facilis totam et autem inventore aliquam nisi nemo in eos blanditiis odit repellendus corporis tenetur repellat, quasi, magni sunt beatae maiores. Error incidunt earum repudiandae dolore? Nostrum eveniet animi fuga alias iusto velit, aut officiis accusantium quam impedit tenetur excepturi facilis numquam.",
		Movie_video: "https://www.youtube.com/embed/a2GujJZfXpg?si=Ku8184mli1K3aHrC&autoplay=1" , 
		Movie_length: "20"},//2
		{Movie_name: "attack on titan 1", 
		Movie_poster: "https://m.media-amazon.com/images/I/81lNsz7Ox1S._AC_SL1500_.jpg", 
		Movie_information:  "Lorem YourName dolor sit amet consectetur adipisicing elit. Facilis totam et autem inventore aliquam nisi nemo in eos blanditiis odit repellendus corporis tenetur repellat, quasi, magni sunt beatae maiores. Error incidunt earum repudiandae dolore? Nostrum eveniet animi fuga alias iusto velit, aut officiis accusantium quam impedit tenetur excepturi facilis numquam.",
		Movie_video: "https://www.youtube.com/embed/LV-nazLVmgo?si=wEhL5_M3CQhuQVpd&autoplay=1" , 
		Movie_length: "20"},//3
		{Movie_name: "attack on titan 2", 
		Movie_poster: "https://images-cdn.ubuy.co.id/63b6146ddecbee137603e92a-attack-on-titan-24-x-36-poster-by-movie.jpg", 
		Movie_information:  "Lorem YourName dolor sit amet consectetur adipisicing elit. Facilis totam et autem inventore aliquam nisi nemo in eos blanditiis odit repellendus corporis tenetur repellat, quasi, magni sunt beatae maiores. Error incidunt earum repudiandae dolore? Nostrum eveniet animi fuga alias iusto velit, aut officiis accusantium quam impedit tenetur excepturi facilis numquam.",
		Movie_video: "https://www.youtube.com/embed/X2WGyFRKb8Y?si=e6wOKyAhZHzF3KsO&autoplay=1" , 
		Movie_length: "20"},//4
		{Movie_name: "attack on titan 3", 
		Movie_poster: "https://m.media-amazon.com/images/I/81wB0fBu6LL.jpg", 
		Movie_information:  "Lorem YourName dolor sit amet consectetur adipisicing elit. Facilis totam et autem inventore aliquam nisi nemo in eos blanditiis odit repellendus corporis tenetur repellat, quasi, magni sunt beatae maiores. Error incidunt earum repudiandae dolore? Nostrum eveniet animi fuga alias iusto velit, aut officiis accusantium quam impedit tenetur excepturi facilis numquam.",
		Movie_video: "https://www.youtube.com/embed/M_OauHnAFc8?si=vRowUPQvldjEbXuY&autoplay=1" , 
		Movie_length: "20"},//5
		{Movie_name: "ReZero", 
		Movie_poster: "https://i.ebayimg.com/images/g/02cAAOSwK0ldVzPq/s-l1200.jpg", 
		Movie_information:  "Lorem YourName dolor sit amet consectetur adipisicing elit. Facilis totam et autem inventore aliquam nisi nemo in eos blanditiis odit repellendus corporis tenetur repellat, quasi, magni sunt beatae maiores. Error incidunt earum repudiandae dolore? Nostrum eveniet animi fuga alias iusto velit, aut officiis accusantium quam impedit tenetur excepturi facilis numquam.",
		Movie_video: "https://www.youtube.com/embed/NKCyheFwvdw?si=6z6r-nP6G-GS_i9t&autoplay=1" , 
		Movie_length: "20"},//6
		{Movie_name: "5 Centimeters per Second", 
		Movie_poster: "https://m.media-amazon.com/images/M/MV5BODVmZjhhYTYtYzRiOC00YzFiLThlZjMtZTQxNWY0MTI1MzlmXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg", 
		Movie_information:  "Lorem YourName dolor sit amet consectetur adipisicing elit. Facilis totam et autem inventore aliquam nisi nemo in eos blanditiis odit repellendus corporis tenetur repellat, quasi, magni sunt beatae maiores. Error incidunt earum repudiandae dolore? Nostrum eveniet animi fuga alias iusto velit, aut officiis accusantium quam impedit tenetur excepturi facilis numquam.",
		Movie_video: "https://www.youtube.com/embed/wdM7athAem0?si=6OAmtSFtguyPJVx_&autoplay=1" , 
		Movie_length: "20"},//7
		{Movie_name: "Evangelion", 
		Movie_poster: "https://m.media-amazon.com/images/I/51XFaesw92L._AC_UF894,1000_QL80_.jpg", 
		Movie_information:  "Lorem YourName dolor sit amet consectetur adipisicing elit. Facilis totam et autem inventore aliquam nisi nemo in eos blanditiis odit repellendus corporis tenetur repellat, quasi, magni sunt beatae maiores. Error incidunt earum repudiandae dolore? Nostrum eveniet animi fuga alias iusto velit, aut officiis accusantium quam impedit tenetur excepturi facilis numquam.",
		Movie_video: "https://www.youtube.com/embed/13nSISwxrY4?si=2vEg7iWCQxNLNdzz&autoplay=1" , 
		Movie_length: "20"},//8
		{Movie_name: "haikyuu", 
		Movie_poster: "https://images-cdn.ubuy.co.in/6350c81143baae1ae1777ad6-haikyuu-poster-karasuno-high-school.jpg", 
		Movie_information:  "Lorem YourName dolor sit amet consectetur adipisicing elit. Facilis totam et autem inventore aliquam nisi nemo in eos blanditiis odit repellendus corporis tenetur repellat, quasi, magni sunt beatae maiores. Error incidunt earum repudiandae dolore? Nostrum eveniet animi fuga alias iusto velit, aut officiis accusantium quam impedit tenetur excepturi facilis numquam.",
		Movie_video: "https://www.youtube.com/embed/jfw3GS-nixY?si=_g3UnegEG96cq9d3&autoplay=1" , 
		Movie_length: "20"},//9
		{Movie_name: "kimestu no yaiba", 
		Movie_poster: "https://m.media-amazon.com/images/I/71Nau-0ZheL._AC_UF1000,1000_QL80_.jpg", 
		Movie_information:  "Lorem YourName dolor sit amet consectetur adipisicing elit. Facilis totam et autem inventore aliquam nisi nemo in eos blanditiis odit repellendus corporis tenetur repellat, quasi, magni sunt beatae maiores. Error incidunt earum repudiandae dolore? Nostrum eveniet animi fuga alias iusto velit, aut officiis accusantium quam impedit tenetur excepturi facilis numquam.",
		Movie_video: "https://www.youtube.com/embed/wyiZWYMilgk?si=u7HFIjLI0uqgW-Ji&autoplay=1" , 
		Movie_length: "20"},//10
		{Movie_name: "dragonball", 
		Movie_poster: "https://i5.walmartimages.com/seo/Dragon-Ball-Z-Saiyans-Wall-Poster-22-375-x-34_5fcb39a7-4ae3-4062-82f8-2a55fc70d8a4.d194869c38bead0c149bc2fb1aa77c6b.jpeg", 
		Movie_information:  "Lorem YourName dolor sit amet consectetur adipisicing elit. Facilis totam et autem inventore aliquam nisi nemo in eos blanditiis odit repellendus corporis tenetur repellat, quasi, magni sunt beatae maiores. Error incidunt earum repudiandae dolore? Nostrum eveniet animi fuga alias iusto velit, aut officiis accusantium quam impedit tenetur excepturi facilis numquam.",
		Movie_video: "https://www.youtube.com/embed/CYcrmsdZuyw?si=AafJHhKNPJnCtAta&autoplay=1" , 
		Movie_length: "20"},//11
		{Movie_name: "DeatNote", 
		Movie_poster: "https://images-cdn.ubuy.co.id/6368c22732babd287a2689b2-death-note-manga-anime-tv-show-poster.jpg", 
		Movie_information:  "Lorem YourName dolor sit amet consectetur adipisicing elit. Facilis totam et autem inventore aliquam nisi nemo in eos blanditiis odit repellendus corporis tenetur repellat, quasi, magni sunt beatae maiores. Error incidunt earum repudiandae dolore? Nostrum eveniet animi fuga alias iusto velit, aut officiis accusantium quam impedit tenetur excepturi facilis numquam.",
		Movie_video: "https://www.youtube.com/embed/Amag3NrjBc0?si=IIsUVudRYN_OWHvi&autoplay=1" , 
		Movie_length: "20"},//12
		{Movie_name: "Naruto", 
		Movie_poster: "https://m.media-amazon.com/images/I/61nKUV0tAvL.jpg", 
		Movie_information:  "Lorem YourName dolor sit amet consectetur adipisicing elit. Facilis totam et autem inventore aliquam nisi nemo in eos blanditiis odit repellendus corporis tenetur repellat, quasi, magni sunt beatae maiores. Error incidunt earum repudiandae dolore? Nostrum eveniet animi fuga alias iusto velit, aut officiis accusantium quam impedit tenetur excepturi facilis numquam.",
		Movie_video: "https://www.youtube.com/embed/QczGoCmX-pI?si=Y7fk_sfzRmfd5McV&autoplay=1" , 
		Movie_length: "20"},//13
		{Movie_name: "jojo", 
		Movie_poster: "https://m.media-amazon.com/images/I/7128HHk1h3L._AC_UF1000,1000_QL80_.jpg", 
		Movie_information:  "Lorem YourName dolor sit amet consectetur adipisicing elit. Facilis totam et autem inventore aliquam nisi nemo in eos blanditiis odit repellendus corporis tenetur repellat, quasi, magni sunt beatae maiores. Error incidunt earum repudiandae dolore? Nostrum eveniet animi fuga alias iusto velit, aut officiis accusantium quam impedit tenetur excepturi facilis numquam.",
		Movie_video: "https://www.youtube.com/embed/EeCX8Y0a278?si=5szV3XrlfIe2aLWg&autoplay=1" , 
		Movie_length: "20"},//14
		{Movie_name: "Fullmetal", 
		Movie_poster: "https://m.media-amazon.com/images/I/61eyyyGXMKL.jpg", 
		Movie_information:  "Lorem YourName dolor sit amet consectetur adipisicing elit. Facilis totam et autem inventore aliquam nisi nemo in eos blanditiis odit repellendus corporis tenetur repellat, quasi, magni sunt beatae maiores. Error incidunt earum repudiandae dolore? Nostrum eveniet animi fuga alias iusto velit, aut officiis accusantium quam impedit tenetur excepturi facilis numquam.",
		Movie_video: "https://www.youtube.com/embed/-GoNo0DGroU?si=5kWK-BL2r5UnAldU&autoplay=1" , 
		Movie_length: "20"},//15
		{Movie_name: "Steinsgate", 
		Movie_poster: "https://m.media-amazon.com/images/I/61EObBCnIRL._AC_UF894,1000_QL80_.jpg", 
		Movie_information:  "Lorem YourName dolor sit amet consectetur adipisicing elit. Facilis totam et autem inventore aliquam nisi nemo in eos blanditiis odit repellendus corporis tenetur repellat, quasi, magni sunt beatae maiores. Error incidunt earum repudiandae dolore? Nostrum eveniet animi fuga alias iusto velit, aut officiis accusantium quam impedit tenetur excepturi facilis numquam.",
		Movie_video: "https://www.youtube.com/embed/uMYhjVwp0Fk?si=U9We0HaaVyLJzvma&autoplay=1" , 
		Movie_length: "20"},//16
		{Movie_name: "Jujutsu Kaisen", 
		Movie_poster: "https://m.media-amazon.com/images/I/71Wnxg6OJaL._AC_UF894,1000_QL80_.jpg", 
		Movie_information:  "Jujutsu Kaisen Wiki, a community created by the fans, for the fans, and is dedicated to housing everything about Jujutsu Kaisen created by Gege Akutami. Our goal is to become the best source of information on the series. Please help us by creating or editing any of our articles! We currently have 68,685 edits to 986 articles and 5,824 images on this wiki.",
		Movie_video: "https://www.youtube.com/embed/X8xLl_802UU?si=YzztegzJOvaGZsep&autoplay=1" , 
		Movie_length: "20:30"},//17
		{Movie_name: "Kyoukai no Kanata", 
		Movie_poster: "https://img.amiami.com/images/product/main/134/MED-DVD2-22037.jpg", 
		Movie_information:  "Jujutsu Kaisen Wiki, a community created by the fans, for the fans, and is dedicated to housing everything about Jujutsu Kaisen created by Gege Akutami. Our goal is to become the best source of information on the series. Please help us by creating or editing any of our articles! We currently have 68,685 edits to 986 articles and 5,824 images on this wiki.",
		Movie_video: "https://www.youtube.com/embed/s1JoJ7FdYcU?si=LjSKtFnzA8ahBv1u&autoplay=1" , 
		Movie_length: "2:30"},//18
		{Movie_name: "Aishang Ta de Liyou", 
		Movie_poster: "https://www.faselhds.care/wp-content/uploads/2023/09/53e59c94bb092540e8cdd526ae9d250d-400x600.jpg", 
		Movie_information:  "Jujutsu Kaisen Wiki, a community created by the fans, for the fans, and is dedicated to housing everything about Jujutsu Kaisen created by Gege Akutami. Our goal is to become the best source of information on the series. Please help us by creating or editing any of our articles! We currently have 68,685 edits to 986 articles and 5,824 images on this wiki.",
		Movie_video: "https://www.youtube.com/embed/KhymVsLJjCc?si=va6ziFz82RwGI7O_&autoplay=1" , 
		Movie_length: "2:30"},//18
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
		{Date: time.Now(), UserID: 1, MovieID: 2},
		{Date: time.Now(), UserID: 1, MovieID: 3},
		{Date: time.Now(), UserID: 1, MovieID: 4},
		{Date: time.Now(), UserID: 2, MovieID: 1},
		{Date: time.Now(), UserID: 2, MovieID: 4},

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
		{CollectionName: "MyCollection1", UserID: 1,},
	}
	for _, CollectionLoop := range Collections {
		db.FirstOrCreate(&CollectionLoop, entity.Collection{CollectionName: CollectionLoop.CollectionName})
	}


	//collection_movies
	collection_movies := []entity.CollectionMovie{
		{CollectionID: 1, MovieID: 1,},
		{CollectionID: 1, MovieID: 2,},
		{CollectionID: 1, MovieID: 3,},
		{CollectionID: 2, MovieID: 3,},
		{CollectionID: 16, MovieID: 3,},
		{CollectionID: 16, MovieID: 4,},
		{CollectionID: 16, MovieID: 5,},
	}
	for _, collection_moviesLoop := range collection_movies {
		db.FirstOrCreate(&collection_moviesLoop, entity.CollectionMovie{CollectionID: collection_moviesLoop.CollectionID , MovieID: collection_moviesLoop.MovieID})
	}
}