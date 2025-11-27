import { Link, useLocation } from 'react-router-dom'
import { Droplets, MapPin, BarChart3, Sparkles, Upload, Target, Zap } from 'lucide-react'
import { motion } from 'framer-motion'

const Navbar = () => {
  const location = useLocation()
  
  // Hide navbar on landing page (it has its own navigation)
  if (location.pathname === '/') {
    return null
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-950/80 backdrop-blur-xl border-b border-white/5">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="max-w-7xl mx-auto px-8 py-5 flex items-center justify-between"
      >
        {/* Logo - Left Aligned */}
        <Link to="/" className="flex items-center gap-3 group">
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="relative w-12 h-12 bg-gradient-to-br from-cyan-500/20 to-blue-600/20 rounded-xl flex items-center justify-center transition-all border border-cyan-400/30 shadow-[0_0_20px_rgba(6,182,212,0.3)] group-hover:shadow-[0_0_30px_rgba(6,182,212,0.5)]"
          >
            <Droplets className="w-6 h-6 text-cyan-400 group-hover:scale-110 transition-transform" fill="currentColor" />
            <div className="absolute inset-0 bg-cyan-500/20 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity" />
          </motion.div>
          <h1 className="text-xl font-bold bg-gradient-to-r from-white via-cyan-100 to-white bg-clip-text text-transparent group-hover:from-cyan-200 group-hover:via-white group-hover:to-cyan-200 transition-all">
            HydroSense
          </h1>
        </Link>

        {/* Navigation Links - Right Side */}
        <div className="flex items-center gap-2">
          <Link 
            to="/map" 
            className={`group flex items-center gap-2 px-4 py-2.5 text-sm font-semibold rounded-full transition-all duration-300 ${
              location.pathname === '/map' 
                ? 'text-white bg-cyan-500/20 border border-cyan-400/50 shadow-[0_0_20px_rgba(6,182,212,0.3)]' 
                : 'text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 hover:border-cyan-400/40'
            }`}
          >
            <MapPin className="w-4 h-4" />
            Map
          </Link>
          <Link 
            to="/advanced" 
            className={`group flex items-center gap-2 px-4 py-2.5 text-sm font-semibold rounded-full transition-all duration-300 ${
              location.pathname === '/advanced' 
                ? 'text-white bg-violet-500/20 border border-violet-400/50 shadow-[0_0_20px_rgba(139,92,246,0.3)]' 
                : 'text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 hover:border-violet-400/40'
            }`}
          >
            <Zap className="w-4 h-4" />
            Advanced
          </Link>
          <Link 
            to="/batch" 
            className={`group flex items-center gap-2 px-4 py-2.5 text-sm font-semibold rounded-full transition-all duration-300 ${
              location.pathname === '/batch' 
                ? 'text-white bg-purple-500/20 border border-purple-400/50 shadow-[0_0_20px_rgba(168,85,247,0.3)]' 
                : 'text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 hover:border-purple-400/40'
            }`}
          >
            <Upload className="w-4 h-4" />
            Batch
          </Link>
          <Link 
            to="/compare" 
            className={`group flex items-center gap-2 px-4 py-2.5 text-sm font-semibold rounded-full transition-all duration-300 ${
              location.pathname === '/compare' 
                ? 'text-white bg-orange-500/20 border border-orange-400/50 shadow-[0_0_20px_rgba(251,146,60,0.3)]' 
                : 'text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 hover:border-orange-400/40'
            }`}
          >
            <Target className="w-4 h-4" />
            Compare
          </Link>
          <Link 
            to="/dashboard" 
            className={`group flex items-center gap-2 px-4 py-2.5 text-sm font-semibold rounded-full transition-all duration-300 ${
              location.pathname === '/dashboard' 
                ? 'text-white bg-cyan-500/20 border border-cyan-400/50 shadow-[0_0_20px_rgba(6,182,212,0.3)]' 
                : 'text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 hover:border-cyan-400/40'
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            Dashboard
          </Link>
          <Link 
            to="/about" 
            className={`group flex items-center gap-2 px-4 py-2.5 text-sm font-semibold rounded-full transition-all duration-300 ${
              location.pathname === '/about' 
                ? 'text-white bg-cyan-500/20 border border-cyan-400/50 shadow-[0_0_20px_rgba(6,182,212,0.3)]' 
                : 'text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 hover:border-cyan-400/40'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            About
          </Link>
        </div>
      </motion.div>
    </nav>
  )
}

export default Navbar
