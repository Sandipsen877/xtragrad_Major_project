import { Link, useLocation } from 'react-router-dom'
import { Upload, Sparkles, ScanEye } from 'lucide-react'

const Navbar = () => {
  const location = useLocation()
  const isActive = (path) => location.pathname === path

  return (
    <nav className="sticky top-0 z-50  bg-zinc-950/80 backdrop-blur-xl">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="p-1.5 rounded-lg bg-zinc-900 border border-zinc-700 group-hover:border-zinc-500 transition-colors">
              <ScanEye className="w-5 h-5 text-zinc-200" />
            </div>
            <div className="flex flex-col leading-none">
              <span className="font-bold text-lg tracking-tight text-zinc-100">
                Z-Vision
              </span>
              <span className="text-[10px] text-zinc-500 font-medium tracking-wider uppercase">
                AI Image Detector
              </span>
            </div>
          </Link>

          {/* Desktop Links */}
          <div className="hidden sm:flex items-center gap-1">
            <Link
              to="/"
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                isActive('/')
                  ? 'bg-zinc-800 text-zinc-100'
                  : 'text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900'
              }`}
            >
              Home
            </Link>

            <Link
              to="/predict"
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-1.5 ${
                isActive('/predict')
                  ? 'bg-zinc-800 text-zinc-100'
                  : 'text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900'
              }`}
            >
              <Upload className="w-3.5 h-3.5" />
              Detect
            </Link>

            <Link
              to="/about"
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                isActive('/about')
                  ? 'bg-zinc-800 text-zinc-100'
                  : 'text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900'
              }`}
            >
              About
            </Link>
          </div>

          {/* Mobile Detect Button */}
          <Link
            to="/predict"
            className="sm:hidden inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-900 text-zinc-200 text-sm font-medium border border-zinc-700"
          >
            <Sparkles className="w-3.5 h-3.5" />
            Detect
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar