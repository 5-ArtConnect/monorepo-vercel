const express = require('express')
const router = express.Router()
const galleryController = require('../controller/galleries')

// Public routes - User hanya bisa view/browse galleries
router.get('/', galleryController.getAllGalleries)
router.get('/:id', galleryController.getGalleryById)
router.get('/:id/artworks', galleryController.getGalleryArtworks)

module.exports = router
