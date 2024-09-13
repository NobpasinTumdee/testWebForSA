package controller

import (
	"net/http"
	"backendproject/entity"
	"backendproject/config"
	"github.com/gin-gonic/gin"
)

// POST /CollectionMovies
func CreateCollectionMovie(c *gin.Context) {
	var CollectionMovie entity.CollectionMovie

	// bind เข้าตัวแปร CollectionMovie
	if err := c.ShouldBindJSON(&CollectionMovie); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	db := config.DB()

	// สร้าง CollectionMovie
	u := entity.CollectionMovie{
		CollectionID: CollectionMovie.CollectionID, 
		MovieID:      CollectionMovie.MovieID,  
	}

	// บันทึก
	if err := db.Create(&u).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusCreated, gin.H{"message": "Created success", "data": u})
}

// GET /CollectionMovies
func ListCollectionMovie(c *gin.Context) {
	var CollectionMovies []struct {
		ID              uint   `json:"id"`
		CollectionID    uint   `json:"CollectionID"`
		CollectionName  string `json:"collection_name"`
		MovieID         uint   `json:"MovieID"`
		MovieName       string `json:"movie_name"` 
	}

	// Get the database connection
	db := config.DB()

	// Query with joins to get collection and movie details
	results := db.Table("collection_movies").
		Select("collection_movies.id, collection_movies.collection_id, collections.collection_name, collection_movies.movie_id, movies.movie_name").
		Joins("left join collections on collections.id = collection_movies.collection_id").
		Joins("left join movies on movies.id = collection_movies.movie_id").
		Scan(&CollectionMovies)

	// Check for errors in the query
	if results.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": results.Error.Error()})
		return
	}

	// Return the results as JSON
	c.JSON(http.StatusOK, CollectionMovies)
}

//get by id Collection Where("collection_movies.collection_id = ?", CollectID).
func ListCollectionByIDcollection(c *gin.Context) {
    // รับค่า CollectionID จากพารามิเตอร์ใน URL
    CollectID := c.Param("id")

    var CollectionMovies []struct {
		ID              uint   `json:"id"`
		CollectionID    uint   `json:"collection_id"`
		CollectionName  string `json:"collection_name"`
		MovieID         uint   `json:"movie_id"`
		MovieName       string `json:"movie_name"` 
		MoviePoster    string `json:"MoviePoster"`
	}

	// Get the database connection
	db := config.DB()

	// Query with joins to get collection and movie details
	results := db.Table("collection_movies").
		Select("collection_movies.id, collection_movies.collection_id, collections.collection_name, collection_movies.movie_id, movies.movie_name, movies.movie_poster AS MoviePoster").
		Joins("left join collections on collections.id = collection_movies.collection_id").
		Joins("left join movies on movies.id = collection_movies.movie_id").
		Where("collection_movies.collection_id = ?", CollectID).
		Scan(&CollectionMovies)

    // Check for errors in the query
    if results.Error != nil {
        c.JSON(http.StatusNotFound, gin.H{"error": results.Error.Error()})
        return
    }

    // Return the results as JSON
    c.JSON(http.StatusOK, CollectionMovies)
}
//ตรวจสอบ ไม่ใช้
func CheckCollections(c *gin.Context) {
    var collections []struct {
        CollectionID   uint   `json:"CollectionID"`
        CollectionName string `json:"CollectionName"`
    }

    db := config.DB()

    results := db.Table("collections").
        Select("collections.id AS CollectionID, collections.collection_name AS CollectionName").
        Scan(&collections)

    if results.Error != nil {
        c.JSON(http.StatusNotFound, gin.H{"error": results.Error.Error()})
        return
    }

    c.JSON(http.StatusOK, collections)
}
//ไม่ใช้
func CheckCollectionMovies(c *gin.Context) {
    var collectionMovies []struct {
        CollectionID uint `json:"CollectionID"`
        MovieID      uint `json:"MovieID"`
    }

    db := config.DB()

    results := db.Table("collection_movies").
        Select("collection_movies.collection_id AS CollectionID, collection_movies.movie_id AS MovieID").
        Scan(&collectionMovies)

    if results.Error != nil {
        c.JSON(http.StatusNotFound, gin.H{"error": results.Error.Error()})
        return
    }

    c.JSON(http.StatusOK, collectionMovies)
}


// DELETE /CollectionMovies/:id
func DeleteCollectionMovie(c *gin.Context) {

	id := c.Param("id")
	db := config.DB()
	if tx := db.Exec("DELETE FROM collection_movies WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "id not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "Deleted successfully"})

}

// PATCH /CollectionMovies/:id
func UpdateCollectionMovie(c *gin.Context) {
	var CollectionMovie entity.CollectionMovie

	CollectionMovieID := c.Param("id")

	db := config.DB()
	result := db.First(&CollectionMovie, CollectionMovieID)
	if result.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "id not found"})
		return
	}

	if err := c.ShouldBindJSON(&CollectionMovie); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Bad request, unable to map payload"})
		return
	}

	result = db.Save(&CollectionMovie)
	if result.Error != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Bad request"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Updated successfully"})
}
