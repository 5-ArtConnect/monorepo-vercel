const likeModel = require('../models/likes')
const CommonHelper = require('../helper/common')

// Like Artwork
const likeArtwork = async (req, res) => {
  try {
    const { artwork_id } = req.params
    const user_id = req.payload.id

    // Check if already liked
    const existing = await likeModel.checkArtworkLike(user_id, artwork_id)

    if (existing.rowCount > 0) {
      // Unlike
      await likeModel.unlikeArtwork(user_id, artwork_id)
      return CommonHelper.response(res, { liked: false }, 200, 'Artwork unliked successfully')
    } else {
      // Like
      await likeModel.likeArtwork(user_id, artwork_id)
      return CommonHelper.response(res, { liked: true }, 200, 'Artwork liked successfully')
    }
  } catch (error) {
    console.error(error)
    CommonHelper.response(res, null, 500, 'Internal server error')
  }
}

// Unlike Artwork (explicit function)
const unlikeArtwork = async (req, res) => {
  try {
    const { artwork_id } = req.params
    const user_id = req.payload.id

    const result = await likeModel.unlikeArtwork(user_id, artwork_id)
    
    if (result.rowCount === 0) {
      return CommonHelper.response(res, null, 404, 'Like not found')
    }

    CommonHelper.response(res, { liked: false }, 200, 'Artwork unliked successfully')
  } catch (error) {
    console.error(error)
    CommonHelper.response(res, null, 500, 'Internal server error')
  }
}

// Like Comment
const likeComment = async (req, res) => {
  try {
    const { comment_id } = req.params
    const user_id = req.payload.id

    // Check if already liked
    const existing = await likeModel.checkCommentLike(user_id, comment_id)

    if (existing.rowCount > 0) {
      // Unlike
      await likeModel.unlikeComment(user_id, comment_id)
      return CommonHelper.response(res, { liked: false }, 200, 'Comment unliked successfully')
    } else {
      // Like
      await likeModel.likeComment(user_id, comment_id)
      return CommonHelper.response(res, { liked: true }, 200, 'Comment liked successfully')
    }
  } catch (error) {
    console.error(error)
    CommonHelper.response(res, null, 500, 'Internal server error')
  }
}

// Unlike Comment (explicit function)
const unlikeComment = async (req, res) => {
  try {
    const { comment_id } = req.params
    const user_id = req.payload.id

    const result = await likeModel.unlikeComment(user_id, comment_id)
    
    if (result.rowCount === 0) {
      return CommonHelper.response(res, null, 404, 'Like not found')
    }

    CommonHelper.response(res, { liked: false }, 200, 'Comment unliked successfully')
  } catch (error) {
    console.error(error)
    CommonHelper.response(res, null, 500, 'Internal server error')
  }
}

module.exports = {
  likeArtwork,
  unlikeArtwork,
  likeComment,
  unlikeComment
}
