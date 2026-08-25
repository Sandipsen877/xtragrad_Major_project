import { Link } from 'react-router-dom'
import { 
  ShieldCheck, 
  Upload, 
  Brain, 
  Eye, 
  Zap, 
  CheckCircle2,
  ArrowRight
} from 'lucide-react'

const Home = () => {
  const features = [
    {
      icon: <Brain className="w-8 h-8 text-cyan-400" />,
      title: "Deep Learning Detection",
      description: "Uses a modified CNN architecture trained to distinguish real photographs from AI-generated images with high accuracy."
    },
    {
      icon: <Eye className="w-8 h-8 text-blue-400" />,
      title: "Explainable AI (Grad-CAM)",
      description: "Visual heatmaps show exactly which regions of the image influenced the model's decision."
    },
    {
      icon: <Zap className="w-8 h-8 text-purple-400" />,
      title: "Fast Inference",
      description: "Get results in seconds. Upload an image and receive a clear Real or Fake prediction instantly."
    },
    {
      icon: <CheckCircle2 className="w-8 h-8 text-green-400" />,
      title: "High Accuracy",
      description: "Achieves strong performance on the CIFAKE-style dataset with balanced precision and recall."
    }
  ]

  return (
    <div className="space-y-20">
      {/* Hero Section */}
      <section className="text-center py-16 md:py-24">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-sm">
          <ShieldCheck className="w-4 h-4" />
          AI-Powered Image Authentication
        </div>

        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
          Detect{' '}
          <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
            AI-Generated
          </span>
          <br />
          Images Instantly
        </h1>

        <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
          Upload any image and find out whether it is a real photograph or created by artificial intelligence. 
          Powered by Convolutional Neural Networks and Explainable AI.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/predict"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold transition-all shadow-lg shadow-cyan-500/25"
          >
            <Upload className="w-5 h-5" />
            Start Detection
            <ArrowRight className="w-5 h-5" />
          </Link>

          <Link
            to="/about"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl border border-slate-700 hover:border-slate-500 text-slate-300 hover:text-white transition-all"
          >
            Learn More
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section>
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-3">Why FakeVision?</h2>
          <p className="text-slate-400 max-w-xl mx-auto">
            Built with modern deep learning techniques to help you verify the authenticity of visual content.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-cyan-500/40 transition-all duration-300"
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-slate-400 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="text-center py-12 px-6 rounded-3xl bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">
          Ready to check an image?
        </h2>
        <p className="text-slate-400 mb-8 max-w-lg mx-auto">
          Upload a photo and get an instant prediction along with a visual explanation of the result.
        </p>
        <Link
          to="/predict"
          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold transition-all"
        >
          <Upload className="w-5 h-5" />
          Go to Detector
        </Link>
      </section>
    </div>
  )
}

export default Home