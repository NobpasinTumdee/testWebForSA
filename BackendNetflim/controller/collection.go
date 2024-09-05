package controller

import (
	"net/http"
	//"time"
	"backendproject/entity"
	"backendproject/config"
	"github.com/gin-gonic/gin"
)

// POST /Collections
func CreateCollection(c *gin.Context) {
	var Collection entity.Collection

	// bind เข้าตัวแปร user
	if err := c.ShouldBindJSON(&Collection); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	db := config.DB()

	// สร้าง User
	u := entity.Collection{
		Collection_name: Collection.Collection_name,  
		UserID:  Collection.UserID,
	}

	// บันทึก
	if err := db.Create(&u).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusCreated, gin.H{"message": "Created success", "data": u})
}



// GET /Collections
func ListCollection(c *gin.Context) {
    var collections []struct {
        ID              uint   `json:"id"`
        Collection_name string `json:"Collection_name"`
        UserID          uint   `json:"UserID"`
        Username        string `json:"Username"` // เอา username ของ user มาแสดง
    }

    // Get the database connection
    db := config.DB()

    // Query with joins to get user details for the collection
    results := db.Table("collections").
        Select("collections.id, collections.collection_name, collections.user_id, users.username AS username").
        Joins("left join users on users.id = collections.user_id"). // Correct the join to use collections.user_id
        Scan(&collections)

    // Check for errors in the query
    if results.Error != nil {
        c.JSON(http.StatusNotFound, gin.H{"error": results.Error.Error()})
        return
    }

    // Return the results as JSON
    c.JSON(http.StatusOK, collections)
}


// DELETE /Collections/:id
func DeleteCollectiont(c *gin.Context) {

	id := c.Param("id")
	db := config.DB()
	if tx := db.Exec("DELETE FROM collections WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "id not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "Deleted successful"})

}

// PATCH /Collections
func UpdateCollection(c *gin.Context) {
	var Collection entity.Collection

	CollectionID := c.Param("id")

	db := config.DB()
	result := db.First(&Collection, CollectionID)
	if result.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "id not found"})
		return
	}

	if err := c.ShouldBindJSON(&Collection); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Bad request, unable to map payload"})
		return
	}

	result = db.Save(&Collection)
	if result.Error != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Bad request"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Updated successful"})
}