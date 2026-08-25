import axios from 'axios'
import FormData from 'form-data'
import fs from 'fs'

const ML_SERVICE_URL = process.env.ML_SERVICE_URL || 'http://localhost:8000'

/**
 * Send image to Python FastAPI ML service
 * @param {string} filePath - Path of the uploaded image
 * @returns {Promise<Object>}
 */
export const callMLService = async (filePath) => {
  try {
    const formData = new FormData()
    formData.append('file', fs.createReadStream(filePath))

    const response = await axios.post(`${ML_SERVICE_URL}/predict`, formData, {
      headers: {
        ...formData.getHeaders(),
      },
      timeout: 60000, // 60 seconds
    })

    return response.data
  } catch (error) {
    console.error('ML Service Error:', error.message)

    // More detailed error
    if (error.code === 'ECONNREFUSED') {
      throw new Error('ML Service is not running. Please start the FastAPI server.')
    }

    throw new Error(
      error.response?.data?.detail || 
      error.message || 
      'Failed to get prediction from ML service'
    )
  }
}