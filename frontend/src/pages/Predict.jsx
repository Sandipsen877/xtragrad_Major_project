import { useState, useRef } from "react"
import {
  Upload,
  Image as ImageIcon,
  X,
  Loader2,
  CheckCircle2,
  AlertTriangle,
  ScanLine,
  ShieldCheck,
  Activity,
  FileImage,
  ArrowUpRight,
  RocketIcon,
} from "lucide-react"
import toast from "react-hot-toast"
import { predictImage } from "../services/api"

const Predict = () => {
  const [selectedFile, setSelectedFile] = useState(null)
  const [preview, setPreview] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [errorMsg, setErrorMsg] = useState(null)

  const fileInputRef = useRef(null)

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (!file) return

    if (!file.type.startsWith("image/")) {
      toast.error("Please upload a valid image file")
      return
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image size should be less than 5MB")
      return
    }

    setSelectedFile(file)
    setResult(null)
    setErrorMsg(null)

    const reader = new FileReader()
    reader.onloadend = () => setPreview(reader.result)
    reader.readAsDataURL(file)
  }

  const handleRemove = () => {
    setSelectedFile(null)
    setPreview(null)
    setResult(null)
    setErrorMsg(null)

    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const handlePredict = async () => {
    if (!selectedFile) {
      toast.error("Please select an image first")
      return
    }

    setIsLoading(true)
    setResult(null)
    setErrorMsg(null)

    try {
      const data = await predictImage(selectedFile)
      setResult(data)
      toast.success("Prediction completed!")
    } catch (error) {
      console.error(error)

      const status = error.response?.status
      let message = "Failed to get prediction. Please try again."

      // Cold start / free-tier wake-up handling
      if (
        status === 502 ||
        status === 503 ||
        status === 504 ||
        error.code === "ECONNABORTED" ||
        error.message?.toLowerCase().includes("timeout")
      ) {
        message =
          "Server is waking up (free tier). Please wait 30–60 seconds and try again."
      } else if (error.response?.data?.message) {
        message = error.response.data.message
      }

      setErrorMsg(message)
      toast.error(message)
    } finally {
      setIsLoading(false)
    }
  }

  const isReal = result?.label?.toLowerCase() === "real"

  // API returns 0–1 confidence
  const confidence =
    result?.confidence != null
      ? (result.confidence).toFixed(1)
      : null

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-14">

      {/* HEADER */}
      <section className="mb-10 sm:mb-12">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-7 h-7 rounded-lg border border-zinc-800 bg-zinc-900 flex items-center justify-center">
            <ScanLine className="w-3.5 h-3.5 text-zinc-400" />
          </div>
          <span className="font-ai text-[8px] sm:text-[9px] tracking-[0.22em] text-zinc-500">
            Z-V / IMAGE ANALYSIS
          </span>
        </div>

        <h1 className="font-ai text-3xl sm:text-4xl text-zinc-100 tracking-tight">
          Detect Image
        </h1>

        <p className="text-sm sm:text-base text-zinc-500 mt-3 max-w-xl leading-relaxed">
          Upload an image and let Z-Vision analyze its visual patterns
          to determine whether it is real or AI-generated.
        </p>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

        {/* LEFT — IMAGE ANALYZER */}
        <div className="lg:col-span-7">
          <div className="rounded-3xl border border-zinc-800 bg-zinc-900/20 overflow-hidden">

            <div className="px-5 sm:px-6 py-4 border-b border-zinc-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-zinc-500" />
                <span className="font-ai text-[9px] tracking-[0.18em] text-zinc-400">
                  VISION INPUT
                </span>
              </div>
              <span className="font-ai text-[8px] tracking-widest text-zinc-600">
                MAX 5MB
              </span>
            </div>

            <div
              onClick={() => !preview && fileInputRef.current?.click()}
              className={`relative min-h-[350px] sm:min-h-[420px] flex items-center justify-center overflow-hidden
                ${
                  preview
                    ? "bg-zinc-950"
                    : "bg-zinc-950/40 cursor-pointer hover:bg-zinc-950/70"
                }
                transition-colors duration-300`}
            >
              <div
                className="absolute inset-0 opacity-[0.045] pointer-events-none"
                style={{
                  backgroundImage:
                    "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
                  backgroundSize: "30px 30px",
                }}
              />

              {preview && (
                <>
                  <div className="absolute top-5 left-5 w-8 h-8 border-l border-t border-zinc-600 z-10" />
                  <div className="absolute top-5 right-5 w-8 h-8 border-r border-t border-zinc-600 z-10" />
                  <div className="absolute bottom-5 left-5 w-8 h-8 border-l border-b border-zinc-600 z-10" />
                  <div className="absolute bottom-5 right-5 w-8 h-8 border-r border-b border-zinc-600 z-10" />
                </>
              )}

              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/*"
                className="hidden"
              />

              {!preview && (
                <div className="relative text-center px-6">
                  <div className="relative w-20 h-20 mx-auto mb-6">
                    <div className="absolute inset-0 rounded-2xl border border-zinc-700 rotate-6" />
                    <div className="relative w-full h-full rounded-2xl bg-zinc-900 border border-zinc-700 flex items-center justify-center">
                      <Upload className="w-7 h-7 text-zinc-300" />
                    </div>
                  </div>

                  <p className="font-ai text-xs sm:text-sm tracking-wide text-zinc-200">
                    DROP IMAGE TO ANALYZE
                  </p>
                  <p className="text-xs text-zinc-600 mt-3">
                    PNG · JPG · WEBP
                  </p>

                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      fileInputRef.current?.click()
                    }}
                    className="mt-6 px-5 py-2.5 rounded-xl border border-zinc-700 bg-zinc-900 hover:bg-zinc-800 text-xs font-medium text-zinc-300 transition-colors"
                  >
                    Select Image
                  </button>
                </div>
              )}

              {preview && (
                <div className="relative w-full h-full p-7 sm:p-10 flex items-center justify-center">
                  <img
                    src={preview}
                    alt="Selected image preview"
                    className="relative max-h-[330px] sm:max-h-[370px] max-w-full object-contain rounded-xl shadow-2xl"
                  />

                  <div className="absolute bottom-7 left-7 sm:left-10 flex items-center gap-2 px-3 py-1.5 rounded-lg bg-zinc-950/80 border border-zinc-800 backdrop-blur">
                    <FileImage className="w-3 h-3 text-zinc-500" />
                    <span className="max-w-[150px] truncate text-[10px] text-zinc-500">
                      {selectedFile?.name}
                    </span>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      handleRemove()
                    }}
                    className="absolute top-7 right-7 sm:top-10 sm:right-10 w-9 h-9 rounded-xl bg-zinc-100 hover:bg-white text-zinc-950 flex items-center justify-center transition-colors shadow-lg"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>

            <div className="p-4 sm:p-5 border-t border-zinc-800">
              <button
                onClick={handlePredict}
                disabled={!selectedFile || isLoading}
                className={`w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-medium transition-all duration-300
                  ${
                    !selectedFile || isLoading
                      ? "bg-zinc-800 text-zinc-600 cursor-not-allowed"
                      : "bg-zinc-100 hover:bg-white text-zinc-950 hover:shadow-lg"
                  }`}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span className="font-ai text-[9px] tracking-widest">
                      ANALYZING
                    </span>
                  </>
                ) : (
                  <>
                    <RocketIcon className="w-4 h-4" />
                    <span className="font-ai text-[9px] tracking-widest">
                      DETECT NOW
                    </span>
                  </>
                )}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between mt-4 px-1">
            <span className="text-[10px] text-zinc-600">
              Supported formats: PNG, JPG, WEBP
            </span>
            <span className="font-ai text-[8px] tracking-widest text-zinc-700">
              Z-VISION ENGINE
            </span>
          </div>
        </div>

        {/* RIGHT — RESULT CONSOLE */}
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-24 rounded-3xl border border-zinc-800 bg-zinc-900/30 overflow-hidden">

            <div className="px-5 sm:px-6 py-4 border-b border-zinc-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-zinc-500" />
                <span className="font-ai text-[9px] tracking-[0.18em] text-zinc-400">
                  DETECTION RESULT
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span
                  className={`w-1.5 h-1.5 rounded-full ${
                    isLoading
                      ? "bg-zinc-400 animate-pulse"
                      : result
                        ? isReal
                          ? "bg-emerald-400"
                          : "bg-red-400"
                        : errorMsg
                          ? "bg-amber-400"
                          : "bg-zinc-700"
                  }`}
                />
                <span className="font-ai text-[7px] tracking-widest text-zinc-600">
                  {isLoading
                    ? "PROCESSING"
                    : result
                      ? "COMPLETE"
                      : errorMsg
                        ? "RETRY"
                        : "STANDBY"}
                </span>
              </div>
            </div>

            <div className="min-h-[390px] p-6 sm:p-7">

              {/* EMPTY */}
              {!result && !isLoading && !errorMsg && (
                <div className="h-full min-h-[340px] flex flex-col items-center justify-center text-center">
                  <div className="w-16 h-16 rounded-2xl border border-zinc-800 bg-zinc-950 flex items-center justify-center mb-5">
                    <ScanLine className="w-6 h-6 text-zinc-700" />
                  </div>
                  <p className="font-ai text-[10px] tracking-[0.16em] text-zinc-500">
                    AWAITING INPUT
                  </p>
                  <p className="text-xs text-zinc-600 max-w-xs leading-relaxed mt-3">
                    Upload an image and run detection to receive
                    the model's prediction.
                  </p>
                </div>
              )}

              {/* COLD START / ERROR */}
              {!result && !isLoading && errorMsg && (
                <div className="h-full min-h-[340px] flex flex-col items-center justify-center text-center px-2">
                  <div className="w-16 h-16 rounded-2xl border border-amber-500/20 bg-amber-500/5 flex items-center justify-center mb-5">
                    <AlertTriangle className="w-6 h-6 text-amber-400" />
                  </div>
                  <p className="font-ai text-[10px] tracking-[0.16em] text-amber-400/90">
                    SERVER WAKING UP
                  </p>
                  <p className="text-xs text-zinc-400 max-w-xs leading-relaxed mt-3">
                    {errorMsg}
                  </p>
                  <button
                    onClick={handlePredict}
                    disabled={!selectedFile}
                    className="mt-6 px-5 py-2.5 rounded-xl border border-zinc-700 bg-zinc-900 hover:bg-zinc-800 text-xs font-medium text-zinc-300 transition-colors disabled:opacity-50"
                  >
                    Try Again
                  </button>
                </div>
              )}

              {/* LOADING */}
              {isLoading && (
                <div className="h-full min-h-[340px] flex flex-col items-center justify-center">
                  <div className="relative w-20 h-20 mb-6">
                    <div className="absolute inset-0 rounded-full border border-zinc-800" />
                    <div className="absolute inset-2 rounded-full border border-zinc-700 border-t-zinc-200 animate-spin" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <ScanLine className="w-6 h-6 text-zinc-300" />
                    </div>
                  </div>

                  <p className="font-ai text-[10px] tracking-[0.18em] text-zinc-300">
                    RUNNING INFERENCE
                  </p>
                  <p className="text-xs text-zinc-600 mt-3">
                    Analyzing visual patterns...
                  </p>

                  <div className="w-full max-w-xs space-y-2 mt-8">
                    <div className="h-1 rounded-full bg-zinc-800 overflow-hidden">
                      <div className="h-full w-2/3 bg-zinc-500 animate-pulse" />
                    </div>
                    <div className="flex justify-between">
                      <span className="font-ai text-[7px] tracking-widest text-zinc-700">
                        CNN INFERENCE
                      </span>
                      <span className="font-ai text-[7px] tracking-widest text-zinc-700">
                        ACTIVE
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* RESULT */}
              {result && (
                <div className="space-y-7">
                  <div
                    className={`relative overflow-hidden rounded-2xl border p-6
                      ${
                        isReal
                          ? "bg-emerald-500/[0.04] border-emerald-500/20"
                          : "bg-red-500/[0.04] border-red-500/20"
                      }`}
                  >
                    <div className="absolute -right-6 -bottom-6 opacity-[0.04]">
                      {isReal ? (
                        <CheckCircle2 className="w-40 h-40" />
                      ) : (
                        <AlertTriangle className="w-40 h-40" />
                      )}
                    </div>

                    <div className="relative">
                      <div className="flex items-center justify-between mb-5">
                        <span className="font-ai text-[8px] tracking-[0.2em] text-zinc-600">
                          CLASSIFICATION
                        </span>
                        {isReal ? (
                          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                        ) : (
                          <AlertTriangle className="w-5 h-5 text-red-400" />
                        )}
                      </div>

                      <p
                        className={`font-ai text-2xl sm:text-3xl tracking-wide
                          ${isReal ? "text-emerald-400" : "text-red-400"}`}
                      >
                        {result.label}
                      </p>
                      <p className="text-xs text-zinc-600 mt-2">
                        Model classification
                      </p>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-end justify-between mb-4">
                      <div>
                        <p className="font-ai text-[8px] tracking-[0.2em] text-zinc-600">
                          CONFIDENCE
                        </p>
                        <p className="font-ai text-4xl text-zinc-100 mt-2">
                          {confidence}
                          <span className="text-lg text-zinc-600 ml-1">%</span>
                        </p>
                      </div>
                      <ArrowUpRight className="w-4 h-4 text-zinc-700" />
                    </div>

                    <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-1000
                          ${isReal ? "bg-emerald-400" : "bg-red-400"}`}
                        style={{ width: `${result.confidence}%` }}
                      />
                    </div>

                    <div className="flex justify-between mt-2">
                      <span className="text-[9px] text-zinc-700">0%</span>
                      <span className="font-ai text-[7px] tracking-widest text-zinc-700">
                        MODEL CERTAINTY
                      </span>
                      <span className="text-[9px] text-zinc-700">100%</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="rounded-xl border border-zinc-800 bg-zinc-950/40 p-4">
                      <p className="font-ai text-[7px] tracking-widest text-zinc-700">
                        ENGINE
                      </p>
                      <p className="text-xs text-zinc-300 mt-2">
                        Modified CNN
                      </p>
                    </div>
                    <div className="rounded-xl border border-zinc-800 bg-zinc-950/40 p-4">
                      <p className="font-ai text-[7px] tracking-widest text-zinc-700">
                        OUTPUT
                      </p>
                      <p className="text-xs text-zinc-300 mt-2">
                        Binary Class
                      </p>
                    </div>
                  </div>

                  {result.message && (
                    <div className="border-t border-zinc-800 pt-5">
                      <p className="text-xs text-zinc-500 leading-relaxed">
                        {result.message}
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-1">
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-zinc-600" />
          <span className="text-[10px] text-zinc-600">
            Results are probabilistic and may vary by image.
          </span>
        </div>
        <span className="font-ai text-[7px] tracking-[0.2em] text-zinc-700">
          Z-VISION / AI DETECTION
        </span>
      </div>
    </div>
  )
}

export default Predict