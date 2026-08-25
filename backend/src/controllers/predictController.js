import fs from 'fs'
import { callMLService } from '../services/mlService.js'

export const predictImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No image file uploaded'
      })
    }

    const filePath = req.file.path
    console.log('Image received:', req.file.filename)

    // Call the Python ML Service
    const mlResult = await callMLService(filePath)

    // Optional: Delete the uploaded file after processing
    fs.unlink(filePath, (err) => {
      if (err) console.error('Error deleting file:', err.message)
    })

    return res.status(200).json({
      success: true,
      label: mlResult.label,
      confidence: mlResult.confidence,
      heatmap: mlResult.heatmap || null,
      message: mlResult.message || 'Prediction successful'
    })

  } catch (error) {
    console.error('Prediction error:', error.message)

    // Clean up file if error occurs
    if (req.file) {
      fs.unlink(req.file.path, () => {})
    }

    return res.status(500).json({
      success: false,
      message: error.message || 'Error while processing the image'
    })
  }
}