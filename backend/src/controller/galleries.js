const galleryModel = require('../models/galleries')
const CommonHelper = require('../helper/common')

const createGallery = async (req, res) => {
  try {
    const { name, description, category } = req.body
    const owner_id = req.payload.id
    const cover_image_url = req.file ? req.file.secure_url : null

    if (!name) {
      return CommonHelper.response(res, null, 400, 'Gallery name is required')
    }

    const result = await galleryModel.create({
      owner_id,
      name,
      description,
      category,
      cover_image_url
    })

    CommonHelper.response(res, result.rows[0], 201, 'Gallery created successfully')
  } catch (error) {
    console.error(error)
    CommonHelper.response(res, null, 500, 'Internal server error')
  }
}

const getAllGalleries = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 10
    const offset = (page - 1) * limit
    const category = req.query.category
    const owner_id = req.query.owner_id

    const result = await galleryModel.findAll(limit, offset, category, owner_id)

    CommonHelper.response(res, result.rows, 200, 'Galleries fetched successfully', {
      page,
      limit,
      total: result.rowCount
    })
  } catch (error) {
    console.error(error)
    CommonHelper.response(res, null, 500, 'Internal server error')
  }
}

const getGalleryById = async (req, res) => {
  try {
    const { id } = req.params
    const result = await galleryModel.findById(id)

    if (result.rowCount === 0) {
      return CommonHelper.response(res, null, 404, 'Gallery not found')
    }

    CommonHelper.response(res, result.rows[0], 200, 'Gallery fetched successfully')
  } catch (error) {
    console.error(error)
    CommonHelper.response(res, null, 500, 'Internal server error')
  }
}

const updateGallery = async (req, res) => {
  try {
    const { id } = req.params
    const { name, description, category } = req.body
    const owner_id = req.payload.id

    // Check ownership
    const gallery = await galleryModel.findById(id)
    if (gallery.rowCount === 0) {
      return CommonHelper.response(res, null, 404, 'Gallery not found')
    }
    if (gallery.rows[0].owner_id !== owner_id) {
      return CommonHelper.response(res, null, 403, 'You are not authorized to update this gallery')
    }

    const cover_image_url = req.file ? req.file.secure_url : undefined

    const result = await galleryModel.update(id, {
      name,
      description,
      category,
      cover_image_url
    })

    CommonHelper.response(res, result.rows[0], 200, 'Gallery updated successfully')
  } catch (error) {
    console.error(error)
    CommonHelper.response(res, null, 500, 'Internal server error')
  }
}

const deleteGallery = async (req, res) => {
  try {
    const { id } = req.params
    const owner_id = req.payload.id

    // Check ownership
    const gallery = await galleryModel.findById(id)
    if (gallery.rowCount === 0) {
      return CommonHelper.response(res, null, 404, 'Gallery not found')
    }
    if (gallery.rows[0].owner_id !== owner_id) {
      return CommonHelper.response(res, null, 403, 'You are not authorized to delete this gallery')
    }

    await galleryModel.deleteGallery(id)
    CommonHelper.response(res, null, 200, 'Gallery deleted successfully')
  } catch (error) {
    console.error(error)
    CommonHelper.response(res, null, 500, 'Internal server error')
  }
}

const getGalleryArtworks = async (req, res) => {
  try {
    const { id } = req.params
    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 10
    const offset = (page - 1) * limit

    const result = await galleryModel.getArtworksByGalleryId(id, limit, offset)

    CommonHelper.response(res, result.rows, 200, 'Gallery artworks fetched successfully', {
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
  createGallery,
  getAllGalleries,
  getGalleryById,
  updateGallery,
  deleteGallery,
  getGalleryArtworks
}
