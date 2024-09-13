package controller

import (
    "net/http"
    "backendproject/entity"
    "backendproject/config"
    "github.com/gin-gonic/gin"
)


// GET /genders
func ListGenders(c *gin.Context) {
    var genders []entity.Gender

    db := config.DB()
    if err := db.Find(&genders).Error; err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
        return
    }

    c.JSON(http.StatusOK, genders)
}




