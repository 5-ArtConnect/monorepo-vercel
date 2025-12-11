const cloudinary = require('cloudinary').v2
const { CloudinaryStorage } = require('multer-storage-cloudinary')
const multer = require('multer')

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
})

// Storage untuk profile pictures (300x300, optimized for avatars)
const profileStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'artconnect/profiles',
    allowed_formats: ['jpg', 'jpeg', 'png', 'gif', 'webp'],
    transformation: [
      { width: 300, height: 300, crop: 'fill', gravity: 'face' },
      { quality: 'auto', fetch_format: 'auto' }
    ]
  }
})

// Storage untuk artwork images (high quality, no resize)
const artworkStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'artconnect/artworks',
    allowed_formats: ['jpg', 'jpeg', 'png', 'gif', 'webp'],
    transformation: [
      { quality: 'auto', fetch_format: 'auto' }
    ]
  }
})

// Storage untuk gallery covers (800x600, landscape)
const galleryStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'artconnect/galleries',
    allowed_formats: ['jpg', 'jpeg', 'png', 'gif', 'webp'],
    transformation: [
      { width: 800, height: 600, crop: 'fill' },
      { quality: 'auto', fetch_format: 'auto' }
    ]
  }
})

// Middleware untuk setiap jenis upload
const uploadProfile = multer({
  storage: profileStorage,
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
})

const uploadArtwork = multer({
  storage: artworkStorage,
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB limit for artworks
})

const uploadGallery = multer({
  storage: galleryStorage,
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
})

module.exports = {
  cloudinary,
  uploadProfile,
  uploadArtwork,
  uploadGallery
}
