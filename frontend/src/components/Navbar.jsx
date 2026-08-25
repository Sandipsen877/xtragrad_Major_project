import { Link, useLocation } from 'react-router-dom'
import { ShieldCheck, Upload, Info } from 'lucide-react'

const Navbar = () => {
  const location = useLocation()

  const isActive = (path) =>
    location.pathname === path
      ? 'text-cyan-400 border-b-2 border-cyan-400'
      : 'text-slate-300 hover:text-cyan-300'

  return (
    <nav className="bg-slate-900/80 backdrop-blur-md border-b border-slate-800 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 font-bold text-xl">
            <ShieldCheck className="w-7 h-7 text-cyan-400" />
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              FakeVision
            </span>
          </Link>

          {/* Links */}
          <div className="flex items-center gap-8">
            <Link
              to="/"
              className={`flex items-center gap-1.5 pb-1 transition-colors ${isActive('/')}`}
            >
              Home
            </Link>

            <Link
              to="/predict"
              className={`flex items-center gap-1.5 pb-1 transition-colors ${isActive('/predict')}`}
            >
              <Upload className="w-4 h-4" />
              Detect
            </Link>

            <Link
              to="/about"
              className={`flex items-center gap-1.5 pb-1 transition-colors ${isActive('/about')}`}
            >
              <Info className="w-4 h-4" />
              About
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar