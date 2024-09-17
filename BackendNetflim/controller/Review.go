package controller

import (
	"backendproject/config"
	"backendproject/entity"
	"github.com/gin-gonic/gin"
	"net/http"
	"time"
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
