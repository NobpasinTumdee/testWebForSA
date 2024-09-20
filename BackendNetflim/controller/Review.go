package controller

import (
	"backendproject/config"
	"backendproject/entity"
	"github.com/gin-gonic/gin"
	"net/http"
	"time"
	"errors"  // เพิ่ม import สำหรับ package errors
	"gorm.io/gorm" // เพิ่ม import สำหรับ gorm
)

// POST /Review
func CreateReview(c *gin.Context) {
	var Review entity.Review

	// bind เข้าตัวแปร user
	if err := c.ShouldBindJSON(&Review); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	db := config.DB()

	// สร้าง User
	u := entity.Review{
		Comment:    Review.Comment,
		Rating:     Review.Rating,
		DateReview: time.Now(),
		UserID:     Review.UserID,
		MovieID:    Review.MovieID,
	}

	// บันทึก
	if err := db.Create(&u).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusCreated, gin.H{"message": "Created success", "data": u})
}

func ListReview(c *gin.Context) {
	var Review []struct {
		ID			uint	`json:"IDReview"`
		DateReview time.Time `json:"DateReview"`
		Comment    string    `json:"Comment"`
		Rating     uint      `json:"Rating"`
		UserID     uint      `json:"UserID"`
		MovieID uint  			`json:"MovieID"`
	}

	// Get the database connection
	db := config.DB()

	// Query with joins to get user and movie details
	results := db.Table("reviews").
		Select("reviews.id, reviews.date_review, reviews.user_id, reviews.movie_id,reviews.comment,reviews.rating, users.username AS user_name, movies.movie_name AS movie_name").
		Joins("left join users on users.id = reviews.user_id").
		Joins("left join movies on movies.id = reviews.movie_id").
		Scan(&Review)

	// Check for errors in the query
	if results.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": results.Error.Error()})
		return
	}

	// Return the results as JSON
	c.JSON(http.StatusOK, Review)
}



// GET /Review/:id
func GetCommentByidMovie(c *gin.Context) {
	MovieID := c.Param("id")
	var Reviews []entity.Review

	db := config.DB()

	// Query all reviews by MovieID และ preload User และ Movie
	results := db.Preload("User").Preload("Movie").Where("movie_id = ?", MovieID).Find(&Reviews)
	if results.Error != nil {
		if errors.Is(results.Error, gorm.ErrRecordNotFound) {
			c.JSON(http.StatusNotFound, gin.H{"error": "No reviews found for this movie"})
		} else {
			c.JSON(http.StatusInternalServerError, gin.H{"error": results.Error.Error()})
		}
		return
	}

	c.JSON(http.StatusOK, Reviews)
}

//get by id Collection Where("collection_movies.collection_id = ?", CollectID).
func GetCommentByidMovieRaw(c *gin.Context) {
    // รับค่า CollectionID จากพารามิเตอร์ใน URL
    MovieID := c.Param("id")

    var Review []struct {
		ID              uint   `json:"id"`
		DateReview  time.Time 	`json:"DateReview"`
		Comment string		`json:"Comment"`
		Rating	uint		`json:"Rating"`
		UserID uint 		`json:"UserID"`
		Username  string 	`json:"username"`
		Status string 		`json:"status"`
		MovieID uint 		`json:"MovieID"`
		UserPhoto string	`json:"userphoto"`
	}

	// Get the database connection
	db := config.DB()

	// Query with joins to get collection and movie details
	results := db.Table("reviews").
		Select("reviews.id, reviews.Comment, reviews.rating, reviews.date_review, reviews.movie_id, reviews.user_id, users.username , users.status , users.user_photo").
		Joins("left join users on users.id = reviews.user_id").
		Joins("left join movies on movies.id = reviews.movie_id").
		Where("reviews.movie_id = ?", MovieID).
		Scan(&Review)

    // Check for errors in the query
    if results.Error != nil {
        c.JSON(http.StatusNotFound, gin.H{"error": results.Error.Error()})
        return
    }

    // Return the results as JSON
    c.JSON(http.StatusOK, Review)
}