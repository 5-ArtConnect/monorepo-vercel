// src/services/users.js
// User profile & management API calls

import { get, put, del } from './api';

/**
 * Get current user profile
 * @returns {Promise<Object>} User profile data
 */
export async function getProfile() {
  return await get('/users/profile');
}

/**
 * Get user by ID
 * @param {string} userId - User UUID
 * @returns {Promise<Object>} User data
 */
export async function getUserById(userId) {
  return await get(`/users/${userId}`);
}

/**
 * Get all users (with pagination)
 * @param {Object} params - { page, limit }
 * @returns {Promise<Object>} { data: [], total, page, limit }
 */
export async function getAllUsers(params = {}) {
  const query = new URLSearchParams(params).toString();
  return await get(`/users?${query}`);
}

/**
 * Update user profile (city & gender only)
 * @param {string} userId - User UUID
 * @param {Object} data - { city, gender }
 * @returns {Promise<Object>} Updated user data
 */
export async function updateProfile(userId, data) {
  return await put(`/users/${userId}`, data);
}

/**
 * Delete/deactivate user account
 * @param {string} userId - User UUID
 * @returns {Promise<Object>} Success message
 */
export async function deleteAccount(userId) {
  return await del(`/users/${userId}`);
}

/**
 * Get user's galleries
 * @param {string} userId - User UUID
 * @returns {Promise<Object>} User galleries
 */
export async function getUserGalleries(userId) {
  return await get(`/users/${userId}/galleries`);
}
