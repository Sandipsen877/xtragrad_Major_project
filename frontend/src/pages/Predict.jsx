import { useState, useRef } from 'react'
import { Upload, Image as ImageIcon, X, Loader2, CheckCircle2, AlertTriangle } from 'lucide-react'
import toast from 'react-hot-toast'
import axios from 'axios'
import { predictImage } from '../services/api'

const Predict = () => {
  const [selectedFile, setSelectedFile] = useState(null)
  const [preview, setPreview] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState(null)
  const fileInputRef = useRef(null)

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

  // Handle file selection
  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (!file) return

    // Validation
    if (!file.type.startsWith('image/')) {
      toast.error('Please upload a valid image file')
      return
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image size should be less than 5MB')
      return
    }

    setSelectedFile(file)
    setResult(null)

    // Create preview
    const reader = new FileReader()
    reader.onloadend = () => {
      setPreview(reader.result)
    }
    reader.readAsDataURL(file)
  }

  // Remove selected image
  const handleRemove = () => {
    setSelectedFile(null)
    setPreview(null)
    setResult(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  // Submit image for prediction
  const handlePredict = async () => {
  if (!selectedFile) {
    toast.error('Please select an image first')
    return
  }

  setIsLoading(true)
  setResult(null)

  try {
    const data = await predictImage(selectedFile)
    setResult(data)
    toast.success('Prediction completed!')
  } catch (error) {
    console.error(error)
    const message =
      error.response?.data?.message ||
      'Failed to get prediction. Please try again.'
    toast.error(message)
  } finally {
    setIsLoading(false)
  }
}

  return (
    <div className="max-w-4xl mx-auto space-y-10 py-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-3">Detect AI-Generated Image</h1>
        <p className="text-slate-400">
          Upload an image to check whether it is Real or AI-Generated
        </p>
      </div>

      {/* Upload Area */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left - Upload */}
        <div className="space-y-5">
          <div
            onClick={() => fileInputRef.current?.click()}
            className={`relative border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all duration-300
              ${preview
                ? 'border-cyan-500/50 bg-slate-900/40'
                : 'border-slate-700 hover:border-cyan-500/50 hover:bg-slate-900/40'
              }`}
          >
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/*"
              className="hidden"
            />

            {preview ? (
              <div className="relative">
                <img
                  src={preview}
                  alt="Preview"
                  className="max-h-72 mx-auto rounded-xl object-contain"
                />
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    handleRemove()
                  }}
                  className="absolute -top-3 -right-3 p-1.5 rounded-full bg-red-500 hover:bg-red-600 text-white transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="py-10">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-slate-800 flex items-center justify-center">
                  <Upload className="w-7 h-7 text-cyan-400" />
                </div>
                <p className="text-lg font-medium mb-1">Click to upload image</p>
                <p className="text-sm text-slate-500">PNG, JPG, JPEG up to 5MB</p>
              </div>
            )}
          </div>

          <button
            onClick={handlePredict}
            disabled={!selectedFile || isLoading}
            className={`w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-semibold transition-all
              ${!selectedFile || isLoading
                ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                : 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white shadow-lg shadow-cyan-500/20'
              }`}
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Analyzing...
              </>
            ) : (
              <>
                <ImageIcon className="w-5 h-5" />
                Detect Now
              </>
            )}
          </button>
        </div>

        {/* Right - Result */}
        <div className="min-h-[320px] rounded-2xl bg-slate-900/60 border border-slate-800 p-6 flex flex-col">
          <h2 className="text-lg font-semibold mb-4 text-slate-300">Prediction Result</h2>

          {!result && !isLoading && (
            <div className="flex-1 flex flex-col items-center justify-center text-slate-500">
              <ImageIcon className="w-12 h-12 mb-3 opacity-40" />
              <p>Upload an image and click Detect</p>
            </div>
          )}

          {isLoading && (
            <div className="flex-1 flex flex-col items-center justify-center">
              <Loader2 className="w-10 h-10 text-cyan-400 animate-spin mb-4" />
              <p className="text-slate-400">Running model inference...</p>
            </div>
          )}

          {result && (
            <div className="space-y-5">
              {/* Label */}
              <div className={`flex items-center gap-3 p-4 rounded-xl border
                ${result.label?.toLowerCase() === 'real'
                  ? 'bg-green-500/10 border-green-500/30'
                  : 'bg-red-500/10 border-red-500/30'
                }`}
              >
                {result.label?.toLowerCase() === 'real' ? (
                  <CheckCircle2 className="w-8 h-8 text-green-400" />
                ) : (
                  <AlertTriangle className="w-8 h-8 text-red-400" />
                )}
                <div>
                  <p className="text-sm text-slate-400">Prediction</p>
                  <p className={`text-2xl font-bold ${
                    result.label?.toLowerCase() === 'real' ? 'text-green-400' : 'text-red-400'
                  }`}>
                    {result.label}
                  </p>
                </div>
              </div>

              {/* Confidence */}
              <div>
                <div className="flex justify-between text-sm mb-1.5">
                  <span className="text-slate-400">Confidence</span>
                  <span className="font-medium">
                    {(result.confidence * 100).toFixed(1)}%
                  </span>
                </div>
                <div className="w-full h-2.5 bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-700 ${
                      result.label?.toLowerCase() === 'real'
                        ? 'bg-green-500'
                        : 'bg-red-500'
                    }`}
                    style={{ width: `${result.confidence * 100}%` }}
                  />
                </div>
              </div>

              {/* Grad-CAM (if available) */}
              {result.heatmap && (
                <div>
                  <p className="text-sm text-slate-400 mb-2">Grad-CAM Explanation</p>
                  <img
                    src={result.heatmap}
                    alt="Grad-CAM Heatmap"
                    className="w-full rounded-xl border border-slate-700"
                  />
                  <p className="text-xs text-slate-500 mt-2">
                    Highlighted regions show what the model focused on.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Predict