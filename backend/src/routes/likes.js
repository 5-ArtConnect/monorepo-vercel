const express = require('express')
const router = express.Router()
const likeController = require('../controller/likes')
const { protect } = require('../helper/auth')

// All routes are protected
// Artwork likes
router.post('/artworks/:artwork_id/like', protect, likeController.likeArtwork)
router.delete('/artworks/:artwork_id/like', protect, likeController.unlikeArtwork)

// Comment likes
router.post('/comments/:comment_id/like', protect, likeController.likeComment)
router.delete('/comments/:comment_id/like', protect, likeController.unlikeComment)

module.exports = router
