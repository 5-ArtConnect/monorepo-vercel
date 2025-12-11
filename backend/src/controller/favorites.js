const favoriteModel = require('../models/favorites')
const CommonHelper = require('../helper/common')

const addToFavorites = async (req, res) => {
  try {
    const { id } = req.params // artwork_id
    const user_id = req.payload.id

    // Check if already favorited
    const existing = await favoriteModel.checkFavorite(user_id, id)
    if (existing.rowCount > 0) {
      return CommonHelper.response(res, null, 400, 'Artwork already in favorites')
    }

    const result = await favoriteModel.addFavorite(user_id, id)

    if (result.rowCount === 0) {
      return CommonHelper.response(res, null, 400, 'Failed to add to favorites (already exists)')
    }

    CommonHelper.response(res, result.rows[0], 201, 'Artwork added to favorites')
  } catch (error) {
    console.error(error)
    CommonHelper.response(res, null, 500, 'Internal server error')
  }
}

const removeFromFavorites = async (req, res) => {
  try {
    const { id } = req.params // artwork_id
    const user_id = req.payload.id

    const result = await favoriteModel.removeFavorite(user_id, id)

    if (result.rowCount === 0) {
      return CommonHelper.response(res, null, 404, 'Favorite not found')
    }

    CommonHelper.response(res, null, 200, 'Artwork removed from favorites')
  } catch (error) {
    console.error(error)
    CommonHelper.response(res, null, 500, 'Internal server error')
  }
}

const getUserFavorites = async (req, res) => {
  try {
    const { id } = req.params // user_id
    const requester_id = req.payload.id

    // Users can only view their own favorites
    if (id !== requester_id) {
      return CommonHelper.response(res, null, 403, 'You can only view your own favorites')
    }

    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 10
    const offset = (page - 1) * limit

    const result = await favoriteModel.getUserFavorites(id, limit, offset)

    CommonHelper.response(res, result.rows, 200, 'Favorites fetched successfully', {
      page,
      limit,
      total: result.rowCount
    })
  } catch (error) {
    console.error(error)
    CommonHelper.response(res, null, 500, 'Internal server error')
  }
}

module.exports = {
  addToFavorites,
  removeFromFavorites,
  getUserFavorites
}
