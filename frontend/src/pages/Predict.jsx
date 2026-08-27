import { useState, useRef } from 'react'
import { 
  Upload, 
  Image as ImageIcon, 
  X, 
  Loader2, 
  CheckCircle2, 
  AlertTriangle
} from 'lucide-react'
import toast from 'react-hot-toast'
import { predictImage } from '../services/api'

const Predict = () => {
  const [selectedFile, setSelectedFile] = useState(null)
  const [preview, setPreview] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState(null)
  const fileInputRef = useRef(null)

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (!file) return

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

    const reader = new FileReader()
    reader.onloadend = () => setPreview(reader.result)
    reader.readAsDataURL(file)
  }

  const handleRemove = () => {
    setSelectedFile(null)
    setPreview(null)
    setResult(null)
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

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
      const message = error.response?.data?.message || 'Failed to get prediction.'
      toast.error(message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
      
      {/* Header */}
      <div className="mb-10 max-w-2xl">
        <h1 className="text-3xl font-bold text-zinc-100 tracking-tight mb-2">
          Detect Image
        </h1>
        <p className="text-zinc-400">
          Upload an image to classify it as Real or AI-Generated
        </p>
      </div>

      {/* Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Upload */}
        <div className="lg:col-span-7 space-y-4">
          <div
            onClick={() => !preview && fileInputRef.current?.click()}
            className={`relative rounded-2xl border border-dashed transition-all overflow-hidden min-h-[320px] flex items-center justify-center
              ${preview 
                ? 'border-zinc-600 bg-zinc-900/50' 
                : 'border-zinc-700 hover:border-zinc-500 hover:bg-zinc-900/30 cursor-pointer'
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
              <div className="relative w-full p-5">
                <img
                  src={preview}
                  alt="Preview"
                  className="max-h-[360px] w-full object-contain rounded-xl"
                />
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    handleRemove()
                  }}
                  className="absolute top-7 right-7 p-2 rounded-full bg-zinc-100 hover:bg-white text-zinc-900 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="text-center px-6 py-12">
                <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-zinc-900 flex items-center justify-center border border-zinc-700">
                  <Upload className="w-6 h-6 text-zinc-300" />
                </div>
                <p className="text-zinc-100 font-medium mb-1">Click to upload image</p>
                <p className="text-sm text-zinc-500">PNG, JPG, WEBP up to 5MB</p>
              </div>
            )}
          </div>

          <button
            onClick={handlePredict}
            disabled={!selectedFile || isLoading}
            className={`w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-semibold transition-all
              ${!selectedFile || isLoading
                ? 'bg-zinc-800 text-zinc-500 cursor-not-allowed'
                : 'bg-zinc-100 hover:bg-white text-zinc-950'
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

        {/* Result */}
        <div className="lg:col-span-5">
          <div className="sticky top-24 rounded-2xl bg-zinc-900/50 border border-zinc-800 p-6 min-h-[320px] flex flex-col">
            <h2 className="text-xs font-medium text-zinc-500 uppercase tracking-wider mb-5">
              Result
            </h2>

            {!result && !isLoading && (
              <div className="flex-1 flex flex-col justify-center">
                <p className="text-zinc-500 text-sm leading-relaxed">
                  Your prediction result will appear here after you upload an image and run detection.
                </p>
              </div>
            )}

            {isLoading && (
              <div className="flex-1 flex flex-col items-center justify-center gap-3">
                <Loader2 className="w-8 h-8 text-zinc-300 animate-spin" />
                <p className="text-zinc-400 text-sm">Running inference...</p>
              </div>
            )}

            {result && (
              <div className="space-y-6">
                <div className={`p-4 rounded-xl border ${
                  result.label?.toLowerCase() === 'real'
                    ? 'bg-emerald-500/10 border-emerald-500/30'
                    : 'bg-red-500/10 border-red-500/30'
                }`}>
                  <div className="flex items-center gap-3">
                    {result.label?.toLowerCase() === 'real' ? (
                      <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                    ) : (
                      <AlertTriangle className="w-6 h-6 text-red-400" />
                    )}
                    <div>
                      <p className="text-xs text-zinc-400">Prediction</p>
                      <p className={`text-xl font-bold ${
                        result.label?.toLowerCase() === 'real' ? 'text-emerald-400' : 'text-red-400'
                      }`}>
                        {result.label}
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-zinc-400">Confidence</span>
                    <span className="text-zinc-100 font-medium">
                      {(result.confidence * 100).toFixed(1)}%
                    </span>
                  </div>
                  <div className="w-full h-2 bg-zinc-800 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-700 ${
                        result.label?.toLowerCase() === 'real' ? 'bg-emerald-500' : 'bg-red-500'
                      }`}
                      style={{ width: `${result.confidence * 100}%` }}
                    />
                  </div>
                </div>

                {result.message && (
                  <p className="text-xs text-zinc-500 leading-relaxed border-t border-zinc-800 pt-4">
                    {result.message}
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Predict