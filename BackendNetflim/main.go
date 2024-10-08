package main

import (
	"backendproject/config"
	"backendproject/controller"
	"backendproject/controller/user"
	"github.com/gin-gonic/gin"
  	"net/http"
	"backendproject/middlewares"
)
const PORT = "8000"

func main() {

  // open connection database
	config.ConnectionDB()

	// Generate databases
	config.SetupDatabase()

	r := gin.Default()

	r.Use(CORSMiddleware())

	r.POST("/signup", user.SignUp) //สมัคร
    r.POST("/signin", user.SignIn) //Sign in == login 
    r.PUT("/ResetPasswordUser", user.ResetPasswordUser) //Sign in == login 
	r.GET("/users/:id", user.GetUser) //getOnlyID
	r.GET("/Payments/:id", controller.ListPaymentByID)
	r.GET("/MoviePackages", controller.ListMoviePackages)
	r.GET("/Movies", controller.ListMovies)

	router := r.Group("")
  {
		router.Use(middlewares.Authorizes())

		// User Routes
		router.GET("/users", user.ListUsers) 
		//router.GET("/users/:id", user.GetUser) //getOnlyID ย้ายไปไว้ข้างนอกเพื่อให้มันเรียกใช้ในหน้า login ได้
		router.POST("/users", user.CreateUser)
		router.PUT("/users/:id", user.UpdateUserByid)
		router.DELETE("/users/:id", user.DeleteUser) //ไม่ได้เรียกใช้

		// Gender Routes
		router.GET("/genders", controller.ListGenders)
		
		// Movie Routes
		//router.GET("/Movies", controller.ListMovies) //getOnlyID ย้ายไปไว้ข้างนอกเพื่อให้มันแสดงตัวอย่างหนังได้
		router.GET("/Movies/:id", controller.GetMovieByid)
		router.POST("/Movies", controller.CreateMovie)
		router.PATCH("/Movies", controller.UpdateMovie) //ไม่ได้เรียกใช้
		router.DELETE("/Movies/:id", controller.DeleteMovie)
		router.PUT("/Movies/:id" , controller.UpdateMovieByid)
		router.GET("/ListsearchMovies", controller.ListsearchMovies)


		// MoviePackage Routes
		//router.GET("/MoviePackages", controller.ListMoviePackages)//getOnlyID ย้ายไปไว้ข้างนอกเพื่อให้มันเรียกใช้ในหน้า login ได้
		router.POST("/MoviePackages", controller.CreateMoviePackage) //ไม่ได้เรียกใช้
		router.PATCH("/MoviePackages", controller.UpdateMoviePackage) //ไม่ได้เรียกใช้
		//router.DELETE("/MoviePackages/:id", controller.DeleteMoviePackage)


		// History Routes
		router.GET("/Historys", controller.ListHistorys) //ไม่ได้เรียกใช้
		router.GET("/Historys/:id", controller.ListHistorysByID)
		router.POST("/Historys", controller.CreateHistory)
		router.PATCH("/Historys", controller.UpdateHistory) //ไม่ได้เรียกใช้
		router.DELETE("/Historys/:id", controller.DeleteHistory)



		// Payments Routes
		router.GET("/Payments", controller.ListPayments) //ไม่ได้เรียกใช้
		//router.GET("/Payments/:id", controller.ListPaymentByID) //getOnlyID ย้ายไปไว้ข้างนอกเพื่อให้มันเรียกใช้ในหน้า login ได้
		router.POST("/Payments", controller.CreatePayment)
		router.PUT("/Payments/:id", controller.UpdatePaymentByUserID)
		router.DELETE("/Payments/:id", controller.DeletePayment)
		//router.PATCH("/Payments", controller.UpdatePayment)//อัพเดท payment



		// Collection Routes
		router.GET("/Collections", controller.ListCollection)//ไม่ได้เรียกใช้
		router.GET("/Collections/:id", controller.ListCollectionByID)// หาจาก UserID
		router.POST("/Collections", controller.CreateCollection)//สร้าง
		router.PATCH("/Collections", controller.UpdateCollection)//ไม่ได้เรียกใช้
		router.DELETE("/Collections/:id", controller.DeleteCollectiont)// ลบ


		// CollectionMovie Routes
		router.GET("/CollectionMovies", controller.ListCollectionMovie)//ไม่ได้เรียกใช้
		router.GET("/CollectionMovies/:id", controller.ListCollectionByIDcollection)
		router.POST("/CollectionMovies", controller.CreateCollectionMovie)
		router.PATCH("/CollectionMovies", controller.UpdateCollectionMovie)//ไม่ได้เรียกใช้
		router.DELETE("/CollectionMovies/:id", controller.DeleteCollectionMovie)



		//Review Routes
		router.POST("/Review", controller.CreateReview)
		router.GET("/Review", controller.ListReview)
		//router.GET("/Review/:id", controller.GetCommentByidMovie)
		router.GET("/Review/:id", controller.GetCommentByidMovieRaw)
	}

  r.GET("/", func(c *gin.Context) {
		c.String(http.StatusOK, "API RUNNING... PORT: %s", PORT)
	})

	// Run the server

	r.Run("localhost:" + PORT)
  // Migrate the schema
  //db.AutoMigrate(&entity.Collection{},&entity.History{},&entity.Movie{},&entity.MoviePackage{},&entity.Payment{},&entity.User{})
}

func CORSMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS, GET, PUT, DELETE, PATCH")

		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}

		c.Next()
	}
}