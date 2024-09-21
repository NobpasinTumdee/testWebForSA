package controller

import (
	"net/http"
	"time"
	"backendproject/entity"
	"backendproject/config"
	"github.com/gin-gonic/gin"
)

// POST /Historys
func CreateHistory(c *gin.Context) {
	var History entity.History

	// bind เข้าตัวแปร user
	if err := c.ShouldBindJSON(&History); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	db := config.DB()

	// สร้าง User
	u := entity.History{
		Date: time.Now(), 
		UserID:  History.UserID,  
		MovieID:  History.MovieID,
	}

	// บันทึก
	if err := db.Create(&u).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusCreated, gin.H{"message": "Created success", "data": u})
}


func ListHistorys(c *gin.Context) {
    var historys []struct {
        ID        uint      `json:"id"`
        Date      time.Time `json:"date"`
        UserID    uint      `json:"user_id"`
        MovieID   uint      `json:"movie_id"`
        UserName  string    `json:"user_name"` // Assuming User has a Name field
        MovieName string    `json:"movie_name"` // Assuming Movie has a Movie_name field
    }

    // Get the database connection
    db := config.DB()

    // Query with joins to get user and movie details
    results := db.Table("histories").
        Select("histories.id, histories.date, histories.user_id, histories.movie_id, users.username AS user_name, movies.movie_name AS movie_name").
        Joins("left join users on users.id = histories.user_id").
        Joins("left join movies on movies.id = histories.movie_id").
        Scan(&historys)

    // Check for errors in the query
    if results.Error != nil {
        c.JSON(http.StatusNotFound, gin.H{"error": results.Error.Error()})
        return
    }

    // Return the results as JSON
    c.JSON(http.StatusOK, historys)
}
//get by id user
func ListHistorysByID(c *gin.Context) {
    // รับค่า userID จากพารามิเตอร์ใน URL
    userID := c.Param("id")

    // กำหนด struct สำหรับเก็บผลลัพธ์
    var historys []struct {
        ID        uint      `json:"id"`
        Date      time.Time `json:"date"`
        UserID    uint      `json:"user_id"`
        MovieID   uint      `json:"movie_id"`
        UserName  string    `json:"user_name"`
        MovieName string    `json:"movie_name"`
		Poster	  string	`json:"poster"`
		Movie_video 		string  `json:"movie_video"`
		Movie_information   string  `json:"movie_information"`
    }

    // Get the database connection
    db := config.DB()

    // Query with joins to get user and movie details, filtered by userID
    results := db.Table("histories").
        Select("histories.id, histories.date, histories.user_id, histories.movie_id, users.username AS user_name, movies.movie_name AS movie_name ,movies.movie_poster AS poster , movies.movie_information AS Movie_information, movies.movie_video AS Movie_video").
        Joins("left join users on users.id = histories.user_id").
        Joins("left join movies on movies.id = histories.movie_id").
        Where("histories.user_id = ?", userID).
        Scan(&historys)

    // Check for errors in the query
    if results.Error != nil {
        c.JSON(http.StatusNotFound, gin.H{"error": results.Error.Error()})
        return
    }

    // Return the results as JSON
    c.JSON(http.StatusOK, historys)
}




// DELETE /Historys/:id
func DeleteHistory(c *gin.Context) {

	id := c.Param("id")
	db := config.DB()
	if tx := db.Exec("DELETE FROM histories WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "id not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "Deleted successful"})

}


// PATCH /Historys
func UpdateHistory(c *gin.Context) {
	var History entity.History

	HistoryID := c.Param("id")

	db := config.DB()
	result := db.First(&History, HistoryID)
	if result.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "id not found"})
		return
	}

	if err := c.ShouldBindJSON(&History); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Bad request, unable to map payload"})
		return
	}

	result = db.Save(&History)
	if result.Error != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Bad request"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Updated successful"})
}