const commentModel = require('../models/comments')
const CommonHelper = require('../helper/common')

const createComment = async (req, res) => {
  try {
    const { artwork_id } = req.params
    const { text, rating } = req.body
    const author_id = req.payload.id

    if (!text) {
      return CommonHelper.response(res, null, 400, 'Comment text is required')
    }

    if (rating && (rating < 1 || rating > 5)) {
      return CommonHelper.response(res, null, 400, 'Rating must be between 1 and 5')
    }

    const result = await commentModel.create({
      artwork_id,
      author_id,
      text,
      rating: rating ? parseInt(rating) : null
    })

    CommonHelper.response(res, result.rows[0], 201, 'Comment created successfully')
  } catch (error) {
    console.error(error)
    CommonHelper.response(res, null, 500, 'Internal server error')
  }
}

const getCommentsByArtworkId = async (req, res) => {
  try {
    const { artwork_id } = req.params
    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 10
    const offset = (page - 1) * limit

    const result = await commentModel.findByArtworkId(artwork_id, limit, offset)

    CommonHelper.response(res, result.rows, 200, 'Comments fetched successfully', {
      page,
      limit,
      total: result.rowCount
    })
  } catch (error) {
    console.error(error)
    CommonHelper.response(res, null, 500, 'Internal server error')
  }
}

const updateComment = async (req, res) => {
  try {
    const { id } = req.params
    const { text, rating } = req.body
    const author_id = req.payload.id

    // Check ownership
    const comment = await commentModel.findById(id)
    if (comment.rowCount === 0) {
      return CommonHelper.response(res, null, 404, 'Comment not found')
    }
    if (comment.rows[0].author_id !== author_id) {
      return CommonHelper.response(res, null, 403, 'You are not authorized to update this comment')
    }

    if (rating && (rating < 1 || rating > 5)) {
      return CommonHelper.response(res, null, 400, 'Rating must be between 1 and 5')
    }

    const result = await commentModel.update(id, {
      text,
      rating: rating ? parseInt(rating) : undefined
    })

    CommonHelper.response(res, result.rows[0], 200, 'Comment updated successfully')
  } catch (error) {
    console.error(error)
    CommonHelper.response(res, null, 500, 'Internal server error')
  }
}

const deleteComment = async (req, res) => {
  try {
    const { id } = req.params
    const author_id = req.payload.id

    // Check ownership
    const comment = await commentModel.findById(id)
    if (comment.rowCount === 0) {
      return CommonHelper.response(res, null, 404, 'Comment not found')
    }
    if (comment.rows[0].author_id !== author_id) {
      return CommonHelper.response(res, null, 403, 'You are not authorized to delete this comment')
    }

    await commentModel.deleteComment(id)

    CommonHelper.response(res, null, 200, 'Comment deleted successfully')
  } catch (error) {
    console.error(error)
    CommonHelper.response(res, null, 500, 'Internal server error')
  }
}

const getAverageRating = async (req, res) => {
  try {
    const { artwork_id } = req.params
    const result = await commentModel.getAverageRating(artwork_id)

    CommonHelper.response(res, result.rows[0], 200, 'Average rating fetched successfully')
  } catch (error) {
    console.error(error)
    CommonHelper.response(res, null, 500, 'Internal server error')
  }
}

module.exports = {
  createComment,
  getCommentsByArtworkId,
  updateComment,
  deleteComment,
  getAverageRating
}
