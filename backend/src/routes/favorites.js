const express = require('express')
const router = express.Router()
const favoriteController = require('../controller/favorites')
const { protect } = require('../helper/auth')

// All favorites routes require authentication
router.post('/artworks/:id/favorite', protect, favoriteController.addToFavorites)
router.delete('/artworks/:id/favorite', protect, favoriteController.removeFromFavorites)
router.get('/users/:id/favorites', protect, favoriteController.getUserFavorites)

module.exports = router
