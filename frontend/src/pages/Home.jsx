import { Link } from 'react-router-dom'
import { 
  Upload, 
  Brain, 
  Eye, 
  Zap, 
  CheckCircle2,
  ArrowRight,
  Sparkles
} from 'lucide-react'
import Earthmotion from '../components/Earthjs'

const Home = () => {
  const features = [
    {
      icon: <Brain className="w-5 h-5 text-zinc-300" />,
      title: "Deep Learning Detection",
      description: "Modified CNN trained to distinguish real photographs from AI-generated images."
    },
    {
      icon: <Eye className="w-5 h-5 text-zinc-300" />,
      title: "Explainable AI Ready",
      description: "Supports Grad-CAM style visual explanations for model decisions."
    },
    {
      icon: <Zap className="w-5 h-5 text-zinc-300" />,
      title: "Real-time Inference",
      description: "Upload an image and get instant Real / Fake prediction with confidence."
    },
    {
      icon: <CheckCircle2 className="w-5 h-5 text-zinc-300" />,
      title: "Fully Deployed",
      description: "React + Express + FastAPI system live on Vercel and Render."
    }
  ]

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 pb-24">
      
      {/* Hero */}
      <section className="pt-14 pb-20 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        
        {/* Left Content */}
        <div className="lg:col-span-6 space-y-7">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-700 text-zinc-300 text-xs font-medium">
            <Sparkles className="w-3.5 h-3.5" />
            AI Image Authentication
          </div>

          <h1 className="text-4xl sm:text-5xl font-bold text-zinc-100 leading-[1.15] tracking-tight">
            Detect AI-Generated
            <br />
            <span className="text-zinc-300">
              Images with Confidence
            </span>
          </h1>

          <p className="text-zinc-400 text-lg leading-relaxed max-w-lg">
            Upload any image and find out whether it is a real photograph or created by artificial intelligence.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-1">
            <Link
              to="/predict"
              className="group inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-zinc-100 hover:bg-white text-zinc-950 font-semibold transition-all"
            >
              <Upload className="w-4 h-4" />
              Start Detection
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>

            <Link
              to="/about"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-zinc-700 text-zinc-300 hover:text-zinc-100 hover:border-zinc-500 transition-all"
            >
              View Project Details
            </Link>
          </div>
        </div>

        {/* Right - Earth */}
        <div className="lg:col-span-6">
          <Earthmotion />
        </div>
      </section>

      {/* Features */}
      <section className="space-y-8">
        <div className="max-w-xl py-14">
          <h2 className="text-2xl font-bold text-zinc-100 mb-2">Why Z-Vision?</h2>
          <p className="text-zinc-400">
            A practical system combining deep learning, clean architecture, and real deployment.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex gap-4 p-5 rounded-2xl bg-zinc-900/50 border border-zinc-800 hover:border-zinc-700 transition-colors"
            >
              <div className="shrink-0 p-2.5 rounded-xl bg-zinc-800 h-fit border border-zinc-700">
                {feature.icon}
              </div>
              <div>
                <h3 className="font-semibold text-zinc-100 mb-1">{feature.title}</h3>
                <p className="text-sm text-zinc-400 leading-relaxed">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default Home