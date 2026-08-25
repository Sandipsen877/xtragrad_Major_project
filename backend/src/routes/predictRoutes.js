import express from 'express'
import { predictImage } from '../controllers/predictController.js'
import upload from '../middleware/upload.js'

const router = express.Router()

// POST /api/predict
router.post('/predict', upload.single('image'), predictImage)

export default router