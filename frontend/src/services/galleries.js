// src/services/galleries.js
// Galleries API calls (View-only for users)

import { get } from './api';

/**
 * Get all galleries with pagination
 * @param {Object} params - { page, limit, category }
 * @returns {Promise<Object>} { data: [], total, page, limit }
 */
export async function getAllGalleries(params = {}) {
  const query = new URLSearchParams(params).toString();
  return await get(`/galleries?${query}`);
}

/**
 * Get gallery by ID
 * @param {string} galleryId - Gallery UUID
 * @returns {Promise<Object>} Gallery detail
 */
export async function getGalleryById(galleryId) {
  return await get(`/galleries/${galleryId}`);
}

/**
 * Get artworks in a gallery
 * @param {string} galleryId - Gallery UUID
 * @param {Object} params - { page, limit }
 * @returns {Promise<Object>} { data: [], total, page, limit }
 */
export async function getGalleryArtworks(galleryId, params = {}) {
  const query = new URLSearchParams(params).toString();
  return await get(`/galleries/${galleryId}/artworks?${query}`);
}
