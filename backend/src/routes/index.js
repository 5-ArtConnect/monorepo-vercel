const express = require('express')
const router = express.Router()
const UserRouter = require('../routes/users')
const GalleryRouter = require('../routes/galleries')
const ArtworkRouter = require('../routes/artworks')
const CommentRouter = require('../routes/comments')
const LikeRouter = require('../routes/likes')
const FavoriteRouter = require('../routes/favorites')
// SearchRouter removed - use category filters instead
// CommunityRouter removed
// ExhibitionRouter removed

router
  .use('/users', UserRouter)
  .use('/galleries', GalleryRouter)
  .use('/artworks', ArtworkRouter)
  .use('/', CommentRouter)
  .use('/', LikeRouter)
  .use('/', FavoriteRouter)
// .use('/', SearchRouter) - REMOVED (use category filters)
// .use('/communities', CommunityRouter) - REMOVED
// .use('/exhibitions', ExhibitionRouter) - REMOVED

module.exports = router
