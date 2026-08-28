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
import Roadmap from '../components/Roadmap'
import TechStack from '../components/TechStack'

const Home = () => {
  const features = [
    {
      icon: <Brain className="w-5 h-5 text-zinc-300" />,
      title: "Deep Learning Detection",
      description:
        "Modified CNN trained to distinguish real photographs from AI-generated images."
    },
    {
      icon: <Eye className="w-5 h-5 text-zinc-300" />,
      title: "Explainable AI Ready",
      description:
        "Supports Grad-CAM style visual explanations for model decisions."
    },
    {
      icon: <Zap className="w-5 h-5 text-zinc-300" />,
      title: "Real-time Inference",
      description:
        "Upload an image and get instant Real / Fake prediction with confidence."
    },
    {
      icon: <CheckCircle2 className="w-5 h-5 text-zinc-300" />,
      title: "Fully Deployed",
      description:
        "React + Express + FastAPI system live on Vercel and Render."
    }
  ]

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 pb-24 font-body">

      {/* Hero */}
      <section className="pt-14 pb-20 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">

        {/* Left Content */}
        <div className="lg:col-span-6 space-y-7">

          

          {/* Main Heading */}
          <h1 className="font-ai text-4xl sm:text-5xl font-bold text-zinc-100 leading-[1.15] tracking-tight">
            See Beyond
            <br />
            <span className="text-zinc-300">
              The Image
            </span>
          </h1>

          {/* Description */}
          <p className="font-body text-zinc-400 text-lg leading-relaxed max-w-lg">
            Upload any image and find out whether it is a real photograph or
            created by artificial intelligence.
          </p>

          {/* Buttons */}
          <div className="flex flex-wrap items-center gap-4 pt-1">

            <Link
              to="/predict"
              className="group inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-zinc-100 hover:bg-white text-zinc-950 font-semibold transition-all"
            >
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

      <Roadmap features={features} />

      <TechStack />
    </div>
  )
}

export default Home