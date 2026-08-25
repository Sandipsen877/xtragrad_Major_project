import axios from 'axios'

// Base URL from environment variable
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  timeout: 60000, // 60 seconds (important for ML inference)
})

/**
 * Send image to backend for prediction
 * @param {File} file - The image file to upload
 * @returns {Promise} - { label, confidence, heatmap }
 */
export const predictImage = async (file) => {
  const formData = new FormData()
  formData.append('image', file)

  const response = await api.post('/api/predict', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })

  return response.data
}

/**
 * Health check (optional - useful later)
 */
export const checkBackendHealth = async () => {
  const response = await api.get('/api/health')
  return response.data
}

export default api