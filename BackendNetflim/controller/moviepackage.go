package controller

import (
	"net/http"
	"backendproject/entity"
	"backendproject/config"
	"github.com/gin-gonic/gin"
)

// POST /MoviePackages
func CreateMoviePackage(c *gin.Context) {
	var MoviePackage entity.MoviePackage

	// bind เข้าตัวแปร Movie
	if err := c.ShouldBindJSON(&MoviePackage); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	db := config.DB()

	// สร้าง Movie
	u := entity.MoviePackage{
		Package_name:        MoviePackage.Package_name,        // ตั้งค่าฟิลด์ FirstName
		Price:      MoviePackage.Price,      // ตั้งค่าฟิลด์ LastName
		Duration: MoviePackage.Duration, // ตั้งค่าฟิลด์ Email

	}

	// บันทึก
	if err := db.Create(&u).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusCreated, gin.H{"message": "Created success", "data": u})
}


// GET /MoviePackages
func ListMoviePackages(c *gin.Context) {
	var moviepackages []entity.MoviePackage
	db := config.DB()

	results := db.Select("id, Package_name, Price, Duration").Find(&moviepackages)

	if results.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": results.Error.Error()})
		return
	}

	c.JSON(http.StatusOK, moviepackages)
}

// DELETE /MoviePackages/:id
func DeleteMoviePackage(c *gin.Context) {

	id := c.Param("id")
	db := config.DB()
	if tx := db.Exec("DELETE FROM moviepackages WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "id not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "Deleted successful"})

}

// PATCH /MoviePackages
func UpdateMoviePackage(c *gin.Context) {
	var MoviePackage entity.MoviePackage

	MoviePackageID := c.Param("id")

	db := config.DB()
	result := db.First(&MoviePackage, MoviePackageID)
	if result.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "id not found"})
		return
	}

	if err := c.ShouldBindJSON(&MoviePackage); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Bad request, unable to map payload"})
		return
	}

	result = db.Save(&MoviePackage)
	if result.Error != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Bad request"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Updated successful"})
}