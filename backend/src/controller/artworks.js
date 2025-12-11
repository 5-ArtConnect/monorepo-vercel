const artworkModel = require('../models/artworks')
const CommonHelper = require('../helper/common')

// Artwork CRUD removed - Artist will upload via admin FE
// Users can only browse/view artworks

const getAllArtworks = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 10
    const offset = (page - 1) * limit

    const filters = {
      category: req.query.category,
      artist_id: req.query.artist_id,
      is_for_sale: req.query.is_for_sale === 'true' ? true : req.query.is_for_sale === 'false' ? false : undefined,
      user_id: req.payload ? req.payload.id : null
    }

    const result = await artworkModel.findAll(limit, offset, filters)

    CommonHelper.response(res, result.rows, 200, 'Artworks fetched successfully', {
      page,
      limit,
      total: result.rowCount
    })
  } catch (error) {
    console.error(error)
    CommonHelper.response(res, null, 500, 'Internal server error')
  }
}

const getArtworkById = async (req, res) => {
  try {
    const { id } = req.params
    const user_id = req.payload ? req.payload.id : null

    const result = await artworkModel.findById(id, user_id)

    if (result.rowCount === 0) {
      return CommonHelper.response(res, null, 404, 'Artwork not found')
    }

    // Increment view count
    await artworkModel.incrementViewCount(id)

    CommonHelper.response(res, result.rows[0], 200, 'Artwork fetched successfully')
  } catch (error) {
    console.error(error)
    CommonHelper.response(res, null, 500, 'Internal server error')
  }
}

module.exports = {
  getAllArtworks,
  getArtworkById
}
