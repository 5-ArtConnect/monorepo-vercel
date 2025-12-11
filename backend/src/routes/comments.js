const express = require('express')
const router = express.Router()
const commentController = require('../controller/comments')
const { protect } = require('../helper/auth')

// Public routes
router.get('/artworks/:artwork_id/comments', commentController.getCommentsByArtworkId)
router.get('/artworks/:artwork_id/rating', commentController.getAverageRating)

// Protected routes
router.post('/artworks/:artwork_id/comments', protect, commentController.createComment)
router.put('/comments/:id', protect, commentController.updateComment)
router.delete('/comments/:id', protect, commentController.deleteComment)

module.exports = router
