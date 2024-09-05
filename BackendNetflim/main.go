package main

import (
	"backendproject/config"
	"backendproject/controller"
	"github.com/gin-gonic/gin"
  "net/http"
)
const PORT = "8000"

func main() {

  // open connection database
	config.ConnectionDB()

	// Generate databases
	config.SetupDatabase()

	r := gin.Default()

	r.Use(CORSMiddleware())

	router := r.Group("")
  {

		// User Routes
		router.GET("/users", controller.ListUsers)
		router.POST("/users", controller.CreateUser)
		router.PATCH("/users", controller.UpdateUser)
		router.DELETE("/users/:id", controller.DeleteUser)
		// Movie Routes
		router.GET("/Movies", controller.ListMovies)
		router.POST("/Movies", controller.CreateMovie)
		router.PATCH("/Movies", controller.UpdateMovie)
		router.DELETE("/Movies/:id", controller.DeleteMovie)
		// MoviePackage Routes
		router.GET("/MoviePackages", controller.ListMoviePackages)
		router.POST("/MoviePackages", controller.CreateMoviePackage)
		router.PATCH("/MoviePackages", controller.UpdateMoviePackage)
		//router.DELETE("/MoviePackages/:id", controller.DeleteMoviePackage)
		// History Routes
		router.GET("/Historys", controller.ListHistorys)
		router.POST("/Historys", controller.CreateHistory)
		router.PATCH("/Historys", controller.UpdateHistory)
		router.DELETE("/Historys/:id", controller.DeleteHistory)
		// Payments Routes
		router.GET("/Payments", controller.ListPayments)
		router.POST("/Payments", controller.CreatePayment)
		router.PATCH("/Payments", controller.UpdatePayment)
		router.DELETE("/Payments/:id", controller.DeletePayment)
		// Collection Routes
		router.GET("/Collections", controller.ListCollection)
		router.POST("/Collections", controller.CreateCollection)
		router.PATCH("/Collections", controller.UpdateCollection)
		router.DELETE("/Collections/:id", controller.DeleteCollectiont)
		// CollectionMovie Routes
		router.GET("/CollectionMovies", controller.ListCollectionMovie)
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