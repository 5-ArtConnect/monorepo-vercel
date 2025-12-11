// src/services/auth.js
// Authentication related API calls

import { post } from './api';

/**
 * Register new user
 * @param {Object} userData - { email, password, fullname, username }
 * @returns {Promise<Object>} User data
 */
export async function register(userData) {
  const user = await post('/users/register', userData);
  
  // Save token if returned (backend now returns token on register)
  if (user.token) {
    localStorage.setItem('token', user.token);
    localStorage.setItem('refreshToken', user.refreshToken);
    localStorage.setItem('user', JSON.stringify(user));
  }
  
  return user;
}

/**
 * Login user
 * @param {Object} credentials - { email, password }
 * @returns {Promise<Object>} User data dengan token
 */
export async function login(credentials) {
  const userData = await post('/users/login', credentials);
  
  // Simpan token ke localStorage
  if (userData.token) {
    localStorage.setItem('token', userData.token);
    localStorage.setItem('refreshToken', userData.refreshToken);
    localStorage.setItem('user', JSON.stringify(userData));
  }
  
  return userData;
}

/**
 * Logout user (clear local storage)
 */
export function logout() {
  localStorage.removeItem('token');
  localStorage.removeItem('refreshToken');
  localStorage.removeItem('user');
  localStorage.removeItem('isLoggedIn');
}

/**
 * Refresh access token
 * @returns {Promise<Object>} New tokens
 */
export async function refreshToken() {
  const refreshToken = localStorage.getItem('refreshToken');
  
  if (!refreshToken) {
    throw new Error('No refresh token available');
  }
  
  const response = await post('/users/refresh-token', { refreshToken });
  
  // Update token
  if (response.token) {
    localStorage.setItem('token', response.token);
    localStorage.setItem('refreshToken', response.refreshToken);
  }
  
  return response;
}

/**
 * Check if user is authenticated
 * @returns {boolean}
 */
export function isAuthenticated() {
  const token = localStorage.getItem('token');
  return !!token;
}

/**
 * Get current user from localStorage
 * @returns {Object|null}
 */
export function getCurrentUser() {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
}
