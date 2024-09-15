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

	router := r.Group("")
  {
		router.Use(middlewares.Authorizes())

		// User Routes
		router.GET("/users", user.ListUsers) //getAll
		router.GET("/users/:id", user.GetUser) //getOnlyID
		router.POST("/users", user.CreateUser)
		router.PUT("/users/:id", user.UpdateUserByid)
		router.DELETE("/users/:id", user.DeleteUser)

		// Gender Routes
		router.GET("/genders", controller.ListGenders)
		
		// Movie Routes
		router.GET("/Movies", controller.ListMovies)
		router.GET("/Movies/:id", controller.GetMovieByid)
		router.POST("/Movies", controller.CreateMovie)
		router.PATCH("/Movies", controller.UpdateMovie)
		router.DELETE("/Movies/:id", controller.DeleteMovie)
		router.PUT("/Movies/:id" , controller.UpdateMovieByid)
		// MoviePackage Routes
		router.GET("/MoviePackages", controller.ListMoviePackages)
		router.POST("/MoviePackages", controller.CreateMoviePackage)
		router.PATCH("/MoviePackages", controller.UpdateMoviePackage)
		//router.DELETE("/MoviePackages/:id", controller.DeleteMoviePackage)
		// History Routes
		router.GET("/Historys", controller.ListHistorys)
		router.GET("/Historys/:id", controller.ListHistorysByID)
		router.POST("/Historys", controller.CreateHistory)
		router.PATCH("/Historys", controller.UpdateHistory)
		router.DELETE("/Historys/:id", controller.DeleteHistory)
		// Payments Routes
		router.GET("/Payments", controller.ListPayments)
		router.GET("/Payments/:id", controller.ListPaymentByID)
		router.POST("/Payments", controller.CreatePayment)
		router.PUT("/Payments/:id", controller.UpdatePaymentByid)
		//router.PATCH("/Payments", controller.UpdatePayment)//อัพเดท payment
		router.DELETE("/Payments/:id", controller.DeletePayment)
		// Collection Routes
		router.GET("/Collections", controller.ListCollection)//ทั้งหมด ไม่ได้ใช้
		router.GET("/Collections/:id", controller.ListCollectionByID)// หาจาก UserID
		router.POST("/Collections", controller.CreateCollection)//สร้าง
		router.PATCH("/Collections", controller.UpdateCollection)
		router.DELETE("/Collections/:id", controller.DeleteCollectiont)// ลบ
		// CollectionMovie Routes
		router.GET("/CollectionMovies", controller.ListCollectionMovie)
		router.GET("/CollectionMovies/:id", controller.ListCollectionByIDcollection)
		router.POST("/CollectionMovies", controller.CreateCollectionMovie)
		router.PATCH("/CollectionMovies", controller.UpdateCollectionMovie)
		router.DELETE("/CollectionMovies/:id", controller.DeleteCollectionMovie)
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