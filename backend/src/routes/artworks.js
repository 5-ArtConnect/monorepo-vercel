const express = require('express')
const router = express.Router()
const artworkController = require('../controller/artworks')
const { optionalAuth } = require('../helper/auth')

// Public routes (browse artworks - view only)
router.get('/', optionalAuth, artworkController.getAllArtworks)
router.get('/:id', optionalAuth, artworkController.getArtworkById)

// Artwork CRUD removed - Artist will upload via admin FE

module.exports = router
