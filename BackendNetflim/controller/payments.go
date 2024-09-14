package controller

import (
	"net/http"
	"time"
	"backendproject/entity"
	"backendproject/config"
	"github.com/gin-gonic/gin"
)


// POST /Payments
func CreatePayment(c *gin.Context) {
	var Payment entity.Payment

	// bind เข้าตัวแปร user
	if err := c.ShouldBindJSON(&Payment); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	db := config.DB()


	u := entity.Payment{
		Payment_method: Payment.Payment_method, 
		Payment_status:  Payment.Payment_status,  
		Date:  time.Now(),
		UserID:  Payment.UserID,
		PackageID:  Payment.PackageID,
	}

	// บันทึก
	if err := db.Create(&u).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusCreated, gin.H{"message": "Created success", "data": u})
}


// GET /payments
func ListPayments(c *gin.Context) {
    var payments []struct {
        ID              uint      `json:"id"`
        Payment_method  string    `json:"Payment_method"`
        Payment_status  string    `json:"Payment_status"`
        Date            time.Time `json:"Date"`
        UserID          uint      `json:"UserID"`
        Username        string    `json:"Username"` // เอา username ของ user มาแสดง
        PackageID       uint      `json:"PackageID"`
        Package_name    string    `json:"Package_name"` // เอาชื่อแพ็กเกจมาแสดง
    }

    // Get the database connection
    db := config.DB()

    // Query with joins to get user and package details
    results := db.Table("payments").
        Select("payments.id, payments.payment_method, payments.payment_status, payments.date, payments.user_id, users.username AS username, payments.package_id, movie_packages.package_name AS package_name").
        Joins("left join users on users.id = payments.user_id").
        Joins("left join movie_packages on movie_packages.id = payments.package_id").
        Scan(&payments)

    // Check for errors in the query
    if results.Error != nil {
        c.JSON(http.StatusNotFound, gin.H{"error": results.Error.Error()})
        return
    }

    // Return the results as JSON
    c.JSON(http.StatusOK, payments)
}
//get by id user
func ListPaymentByID(c *gin.Context) {
    // รับค่า userID จากพารามิเตอร์ใน URL
    userID := c.Param("id")

    // กำหนด struct สำหรับเก็บผลลัพธ์ที่จะ return
    var payments []struct {
        ID              uint      `json:"id"`
        PaymentMethod   string    `json:"Payment_method"`
        PaymentStatus   string    `json:"Payment_status"`
        Date            time.Time `json:"DateP"`
        UserID          uint      `json:"UserID"`
        Username        string    `json:"username"`
        PackageID       uint      `json:"PackageID"`
        PackageName     string    `json:"Package_name"`
    }

    // Get the database connection
    db := config.DB()

    // Query with joins to get payment, user, and package details, filtered by userID
    results := db.Table("payments").
        Select("payments.id, payments.payment_method, payments.payment_status, payments.date,payments.user_id, users.username,payments.package_id, movie_packages.package_name").
        Joins("left join users on users.id = payments.user_id").
        Joins("left join movie_packages on movie_packages.id = payments.package_id").
        Where("payments.user_id = ?", userID).
        Scan(&payments)

    // Check for errors in the query
    if results.Error != nil {
        c.JSON(http.StatusNotFound, gin.H{"error": results.Error.Error()})
        return
    }

    // Return the results as JSON
    c.JSON(http.StatusOK, payments)
}



// DELETE /Payments/:id
func DeletePayment(c *gin.Context) {

	id := c.Param("id")
	db := config.DB()
	if tx := db.Exec("DELETE FROM payments WHERE user_id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "id not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "Deleted successful"})

}

// PUT update Payment ใช้อันนี้นะจ๊ะ
func UpdatePaymentByid(c *gin.Context) {


	var Payment entity.Payment
 
 
	PaymentID := c.Param("id")
 
 
	db := config.DB()
 
	result := db.First(&Payment, PaymentID)
 
	if result.Error != nil {
 
		c.JSON(http.StatusNotFound, gin.H{"error": "NameUser not found"})
 
		return
 
	}
 
 
	if err := c.ShouldBindJSON(&Payment); err != nil {
 
		c.JSON(http.StatusBadRequest, gin.H{"error": "Bad request, unable to map payload"})
 
		return
 
	}
 
 
	result = db.Save(&Payment)
 
	if result.Error != nil {
 
		c.JSON(http.StatusBadRequest, gin.H{"error": "Bad request"})
 
		return
 
	}
 
 
	c.JSON(http.StatusOK, gin.H{"message": "Updated successful"})
 
 }
// PATCH /Payments
func UpdatePayment(c *gin.Context) {
	var Payment entity.Payment

	PaymentID := c.Param("id")

	db := config.DB()
	result := db.First(&Payment, PaymentID)
	if result.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "id not found"})
		return
	}

	if err := c.ShouldBindJSON(&Payment); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Bad request, unable to map payload"})
		return
	}

	result = db.Save(&Payment)
	if result.Error != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Bad request"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Updated successful"})
}