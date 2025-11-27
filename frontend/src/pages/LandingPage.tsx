import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { 
  MapPin,
  Droplets, 
  Brain, 
  BarChart3, 
  ArrowRight,
  CheckCircle,
  Satellite,
  Sparkles,
  Target,
  Layers,
  Zap,
  Users,
  DollarSign,
  Navigation,
  Play,
  FileCheck,
  Bell,
  Cloud,
  ChevronRight
} from 'lucide-react'
import { useEffect } from 'react'

const LandingPage = () => {
  useEffect(() => {
    // Smooth scroll behavior
    document.documentElement.style.scrollBehavior = 'smooth'
    return () => {
      document.documentElement.style.scrollBehavior = 'auto'
    }
  }, [])

  return (
    <div className="min-h-screen bg-slate-950 text-white overflow-hidden">
      {/* Enhanced animated mesh gradient background with stronger effects */}
      <div className="fixed inset-0 opacity-40">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-600/30 via-blue-600/25 to-slate-900/90" />
        <div className="absolute top-0 left-1/4 w-[700px] h-[700px] bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-25 animate-blob" />
        <div className="absolute top-0 right-1/4 w-[700px] h-[700px] bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000" />
        <div className="absolute bottom-0 left-1/3 w-[700px] h-[700px] bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000" />
        
        {/* Enhanced radial glow for hero section */}
        <div className="absolute top-0 left-0 w-[1000px] h-[1000px] bg-gradient-radial from-cyan-500/20 via-blue-500/12 to-transparent blur-3xl" />
        <div className="absolute top-1/4 right-0 w-[800px] h-[800px] bg-gradient-radial from-blue-500/15 via-indigo-500/8 to-transparent blur-3xl" />
      </div>

      {/* Enhanced grid pattern with better visibility */}
      <div className="fixed inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAgTSAwIDIwIEwgNDAgMjAgTSAyMCAwIEwgMjAgNDAgTSAwIDMwIEwgNDAgMzAgTSAzMCAwIEwgMzAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzFhMjMzYSIgb3BhY2l0eT0iMC4zIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-50" />
      
      {/* Enhanced diagonal gradient overlay */}
      <div className="fixed inset-0 bg-gradient-to-br from-blue-900/8 via-transparent to-cyan-900/8 pointer-events-none" />
      
      {/* Subtle animated scanline effect */}
      <motion.div
        animate={{ y: ['-100%', '200%'] }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        className="fixed inset-0 bg-gradient-to-b from-transparent via-cyan-500/5 to-transparent h-32 pointer-events-none"
      />

      <div className="relative z-10">
        {/* Floating Navigation - Top (scrolls with page) */}
        <motion.nav
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="absolute top-0 left-0 right-0 z-50"
        >
          <div className="max-w-7xl mx-auto px-8 py-6 flex items-center justify-between bg-slate-950/50 backdrop-blur-xl border-b border-white/5 rounded-b-2xl">
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
            <div className="flex items-center gap-4">
              <Link 
                to="/map" 
                className="group flex items-center gap-2.5 px-7 py-3.5 text-base font-bold text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 border-2 border-white/10 hover:border-cyan-400/50 rounded-full transition-all duration-300 shadow-lg hover:shadow-cyan-500/20"
              >
                <MapPin className="w-5 h-5" />
                Map
              </Link>
              <Link 
                to="/dashboard" 
                className="group flex items-center gap-2.5 px-7 py-3.5 text-base font-bold text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 border-2 border-white/10 hover:border-cyan-400/50 rounded-full transition-all duration-300 shadow-lg hover:shadow-cyan-500/20"
              >
                <BarChart3 className="w-5 h-5" />
                Dashboard
              </Link>
              <Link 
                to="/about" 
                className="group flex items-center gap-2.5 px-7 py-3.5 text-base font-bold text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 border-2 border-white/10 hover:border-cyan-400/50 rounded-full transition-all duration-300 shadow-lg hover:shadow-cyan-500/20"
              >
                <Sparkles className="w-5 h-5" />
                About
              </Link>
            </div>
          </div>
        </motion.nav>

        {/* Hero Section */}
        <section className="min-h-[85vh] flex items-center justify-center px-6 pt-40 pb-12">
          <div className="max-w-7xl mx-auto w-full">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              {/* Left Column - Text Content */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="text-center lg:text-left relative"
              >
                {/* Radial glow behind heading */}
                <div className="absolute top-0 left-0 lg:left-1/4 w-[400px] h-[400px] bg-gradient-radial from-blue-600/25 via-cyan-600/15 to-transparent blur-3xl -translate-x-1/2 -translate-y-1/4 pointer-events-none opacity-60" />
                
                {/* Small Tag Above Headline */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="mb-6 relative z-10"
                >
                  <span className="text-xs md:text-sm font-light text-cyan-300/70 tracking-[0.3em] uppercase">
                    Deep Learning Hydrology
                  </span>
                </motion.div>

                {/* Enhanced Headline with Gradient Animation */}
                <motion.h1 
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.8 }}
                  className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-8 leading-[1.05] tracking-tight relative z-10"
                >
                  Discover
                  <br />
                  <span className="relative inline-block">
                    <span className="bg-gradient-to-r from-cyan-300 via-cyan-400 to-blue-500 bg-clip-text text-transparent drop-shadow-[0_0_50px_rgba(6,182,212,0.4)] animate-gradient">
                      Groundwater
                    </span>
                    {/* Animated underline glow */}
                    <motion.div
                      animate={{ 
                        opacity: [0.5, 1, 0.5],
                        scaleX: [0.8, 1, 0.8]
                      }}
                      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                      className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500/0 via-cyan-400/60 to-cyan-500/0 blur-sm"
                    />
                  </span>
                  <br />
                  <span className="text-slate-100">Potential</span>
                </motion.h1>

                {/* Powered by ML Models Badge */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4 }}
                  className="flex flex-wrap gap-2 justify-center lg:justify-start mb-8 relative z-10"
                >
                  <span className="px-3 py-1.5 bg-gradient-to-r from-slate-800/80 to-slate-900/80 border border-cyan-500/20 rounded-full text-xs font-medium text-cyan-300 backdrop-blur-sm shadow-[0_0_15px_rgba(6,182,212,0.1)]">
                    U-Net CNN
                  </span>
                  <span className="px-3 py-1.5 bg-gradient-to-r from-slate-800/80 to-slate-900/80 border border-blue-500/20 rounded-full text-xs font-medium text-blue-300 backdrop-blur-sm shadow-[0_0_15px_rgba(59,130,246,0.1)]">
                    TensorFlow/Keras
                  </span>
                  <span className="px-3 py-1.5 bg-gradient-to-r from-slate-800/80 to-slate-900/80 border border-purple-500/20 rounded-full text-xs font-medium text-purple-300 backdrop-blur-sm shadow-[0_0_15px_rgba(168,85,247,0.1)]">
                    Sentinel-2 + DEM + Rainfall
                  </span>
                </motion.div>

                {/* Tagline */}
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="text-base md:text-lg text-slate-300 mb-12 leading-relaxed max-w-xl mx-auto lg:mx-0 relative z-10"
                >
                  Precision groundwater prediction powered by deep learning U-Net CNN, multi-spectral satellite imagery, and environmental data layers.
                </motion.p>

                {/* Premium CTA Buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12 relative z-10"
                >
                  <Link to="/map">
                    <motion.button
                      whileHover={{ scale: 1.05, y: -4 }}
                      whileTap={{ scale: 0.98 }}
                      className="group relative px-10 py-5 bg-gradient-to-r from-cyan-500 via-cyan-600 to-blue-600 hover:from-cyan-400 hover:via-cyan-500 hover:to-blue-500 rounded-[40px] font-bold text-lg flex items-center gap-3 shadow-[0_0_40px_rgba(6,182,212,0.5)] hover:shadow-[0_0_60px_rgba(6,182,212,0.7)] transition-all duration-300 cursor-pointer overflow-hidden border border-cyan-400/30"
                    >
                      {/* Glow effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/50 to-blue-500/50 blur-3xl opacity-0 group-hover:opacity-100 transition-all duration-300" />
                      
                      {/* Shimmer effect */}
                      <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/40 to-white/0 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700"></span>
                      
                      <Target className="w-6 h-6 relative z-10 group-hover:rotate-90 transition-transform duration-300" />
                      <span className="relative z-10">Find Groundwater</span>
                      <motion.div
                        className="relative z-10"
                        animate={{ x: [0, 4, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        <ArrowRight className="w-6 h-6" />
                      </motion.div>
                    </motion.button>
                  </Link>
                  <Link to="/dashboard">
                    <motion.button
                      whileHover={{ scale: 1.03, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      className="px-10 py-5 bg-white/5 hover:bg-white/10 border-2 border-slate-700 hover:border-cyan-500/50 rounded-[40px] font-bold text-lg transition-all flex items-center gap-3 backdrop-blur-sm hover:shadow-[0_0_30px_rgba(6,182,212,0.2)]"
                    >
                      <BarChart3 className="w-6 h-6" />
                      View Analytics
                    </motion.button>
                  </Link>
                </motion.div>

                {/* Thin divider before stats */}
                <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-white/8 to-transparent mb-6 relative z-10" />

                {/* Quick Stats */}
                <div className="grid grid-cols-3 gap-8 lg:gap-12 relative z-10">
                  <div>
                    <div className="text-2xl lg:text-3xl font-bold text-cyan-400 mb-2">99.3%</div>
                    <div className="text-xs text-slate-500 font-medium">Model Accuracy</div>
                  </div>
                  <div>
                    <div className="text-2xl lg:text-3xl font-bold text-blue-400 mb-2">15+</div>
                    <div className="text-xs text-slate-500 font-medium">Data Layers Used</div>
                  </div>
                  <div>
                    <div className="text-2xl lg:text-3xl font-bold text-indigo-400 mb-2">4200+ km²</div>
                    <div className="text-xs text-slate-500 font-medium">Region Coverage</div>
                  </div>
                </div>
              </motion.div>

              {/* Right Column - Clean Professional Floating Cards */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="relative flex items-center justify-center min-h-[600px] lg:min-h-[700px]"
                style={{ paddingLeft: '10%' }}
              >
                {/* Subtle background particles */}
                <div className="absolute inset-0 opacity-30 overflow-hidden">
                  {[...Array(20)].map((_, i) => (
                    <motion.div
                      key={`particle-${i}`}
                      className="absolute w-1 h-1 bg-cyan-400/60 rounded-full"
                      style={{
                        top: `${Math.random() * 100}%`,
                        left: `${Math.random() * 100}%`,
                      }}
                      animate={{
                        y: [0, -100],
                        opacity: [0, 0.8, 0],
                      }}
                      transition={{
                        duration: 3 + Math.random() * 2,
                        repeat: Infinity,
                        delay: Math.random() * 3,
                      }}
                    />
                  ))}
                </div>

                <div className="relative w-full max-w-md mx-auto px-6">
                  <div className="relative h-[550px] flex items-center justify-center" style={{ marginTop: '-80px' }}>
                    
                    {/* Main center card - Water Droplet - ENHANCED */}
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.6, delay: 0.5 }}
                      whileHover={{ scale: 1.05, y: -10 }}
                      className="relative z-30"
                    >
                      {/* Animated rotating rings around card */}
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-0 -m-8"
                      >
                        <div className="w-full h-full border-2 border-dashed border-cyan-500/20 rounded-full"></div>
                      </motion.div>
                      
                      <motion.div
                        animate={{ rotate: -360 }}
                        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-0 -m-12"
                      >
                        <div className="w-full h-full border border-dashed border-blue-500/15 rounded-full"></div>
                      </motion.div>

                      {/* Orbiting mini particles around card */}
                      {[...Array(6)].map((_, i) => (
                        <motion.div
                          key={`orbit-${i}`}
                          animate={{ 
                            rotate: 360,
                          }}
                          transition={{ 
                            duration: 8 + i * 2, 
                            repeat: Infinity, 
                            ease: "linear" 
                          }}
                          className="absolute inset-0"
                          style={{
                            width: '100%',
                            height: '100%',
                          }}
                        >
                          <div 
                            className="absolute w-2 h-2 bg-cyan-400/60 rounded-full blur-[1px] shadow-[0_0_10px_rgba(6,182,212,0.8)]"
                            style={{
                              top: '50%',
                              left: '50%',
                              transform: `translate(-50%, -50%) translateY(-${140 + i * 8}px)`,
                            }}
                          />
                        </motion.div>
                      ))}

                      {/* Pulsing corner accents */}
                      <motion.div
                        animate={{ 
                          opacity: [0.3, 0.8, 0.3],
                          scale: [0.8, 1.1, 0.8]
                        }}
                        transition={{ duration: 3, repeat: Infinity }}
                        className="absolute -top-2 -left-2 w-6 h-6 bg-cyan-400/40 rounded-full blur-md"
                      />
                      <motion.div
                        animate={{ 
                          opacity: [0.3, 0.8, 0.3],
                          scale: [0.8, 1.1, 0.8]
                        }}
                        transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                        className="absolute -bottom-2 -right-2 w-6 h-6 bg-blue-400/40 rounded-full blur-md"
                      />

                      {/* Main card with enhanced gradient border */}
                      <div className="relative w-56 h-56 lg:w-64 lg:h-64 bg-gradient-to-br from-slate-800/95 to-slate-900/95 backdrop-blur-2xl rounded-[40px] shadow-[0_20px_60px_rgba(0,0,0,0.5)] border border-slate-700/50 overflow-hidden">
                        {/* Animated gradient overlay */}
                        <motion.div
                          animate={{ 
                            rotate: 360,
                          }}
                          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                          className="absolute inset-0 opacity-30"
                          style={{
                            background: 'conic-gradient(from 0deg, transparent 0%, rgba(6,182,212,0.3) 50%, transparent 100%)',
                          }}
                        />

                        {/* Floating micro particles inside card */}
                        {[...Array(12)].map((_, i) => (
                          <motion.div
                            key={`inner-particle-${i}`}
                            className="absolute w-1 h-1 bg-cyan-400/40 rounded-full"
                            style={{
                              left: `${20 + Math.random() * 60}%`,
                              top: `${20 + Math.random() * 60}%`,
                            }}
                            animate={{
                              y: [0, -20, 0],
                              x: [0, Math.random() * 10 - 5, 0],
                              opacity: [0.2, 0.6, 0.2],
                            }}
                            transition={{
                              duration: 3 + Math.random() * 2,
                              repeat: Infinity,
                              delay: Math.random() * 2,
                            }}
                          />
                        ))}

                        {/* Icon with enhanced animation */}
                        <div className="flex items-center justify-center h-full relative z-10">
                          <motion.div
                            animate={{ 
                              y: [0, -8, 0],
                              rotate: [0, 5, 0, -5, 0]
                            }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                          >
                            <Droplets className="w-24 h-24 lg:w-28 lg:h-28 text-cyan-400 drop-shadow-[0_0_30px_rgba(6,182,212,0.6)]" strokeWidth={1.5} />
                          </motion.div>
                        </div>

                        {/* Shimmer effect on hover */}
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                          animate={{ x: ['-100%', '200%'] }}
                          transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
                        />
                      </div>
                    </motion.div>

                    {/* Top left card - Sparkles */}
                    <motion.div
                      initial={{ scale: 0, opacity: 0, x: 50, y: 50 }}
                      animate={{ scale: 1, opacity: 1, x: 0, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.7 }}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className="absolute top-0 left-0 z-20"
                    >
                      <div className="w-20 h-20 lg:w-24 lg:h-24 bg-gradient-to-br from-yellow-600/90 to-amber-700/90 backdrop-blur-xl rounded-3xl shadow-[0_15px_40px_rgba(234,179,8,0.4)] border border-yellow-500/50 flex items-center justify-center">
                        <Sparkles className="w-10 h-10 lg:w-12 lg:h-12 text-yellow-200" strokeWidth={1.5} />
                      </div>
                    </motion.div>

                    {/* Top right card - Zap */}
                    <motion.div
                      initial={{ scale: 0, opacity: 0, x: -50, y: 50 }}
                      animate={{ scale: 1, opacity: 1, x: 0, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.8 }}
                      whileHover={{ scale: 1.1, rotate: -5 }}
                      className="absolute top-0 right-0 z-20"
                    >
                      <div className="w-20 h-20 lg:w-24 lg:h-24 bg-gradient-to-br from-purple-600/90 to-violet-700/90 backdrop-blur-xl rounded-3xl shadow-[0_15px_40px_rgba(147,51,234,0.4)] border border-purple-500/50 flex items-center justify-center">
                        <Zap className="w-10 h-10 lg:w-12 lg:h-12 text-white" strokeWidth={1.5} fill="white" />
                      </div>
                    </motion.div>

                    {/* Bottom left card - Brain */}
                    <motion.div
                      initial={{ scale: 0, opacity: 0, x: 50, y: -50 }}
                      animate={{ scale: 1, opacity: 1, x: 0, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.9 }}
                      whileHover={{ scale: 1.1, rotate: -8 }}
                      className="absolute bottom-0 left-0 z-20"
                    >
                      <div className="w-20 h-20 lg:w-24 lg:h-24 bg-gradient-to-br from-pink-600/90 to-rose-700/90 backdrop-blur-xl rounded-3xl shadow-[0_15px_40px_rgba(236,72,153,0.4)] border border-pink-500/50 flex items-center justify-center">
                        <Brain className="w-10 h-10 lg:w-12 lg:h-12 text-white" strokeWidth={1.5} />
                      </div>
                    </motion.div>

                    {/* Bottom right card - Satellite */}
                    <motion.div
                      initial={{ scale: 0, opacity: 0, x: -50, y: -50 }}
                      animate={{ scale: 1, opacity: 1, x: 0, y: 0 }}
                      transition={{ duration: 0.6, delay: 1.0 }}
                      whileHover={{ scale: 1.1, rotate: 8 }}
                      className="absolute bottom-0 right-0 z-20"
                    >
                      <div className="w-20 h-20 lg:w-24 lg:h-24 bg-gradient-to-br from-orange-600/90 to-red-700/90 backdrop-blur-xl rounded-3xl shadow-[0_15px_40px_rgba(249,115,22,0.4)] border border-orange-500/50 flex items-center justify-center">
                        <Satellite className="w-10 h-10 lg:w-12 lg:h-12 text-white" strokeWidth={1.5} />
                      </div>
                    </motion.div>

                    {/* Glowing background circles */}
                    <motion.div
                      animate={{ 
                        scale: [1, 1.15, 1],
                        opacity: [0.3, 0.5, 0.3]
                      }}
                      transition={{ duration: 5, repeat: Infinity }}
                      className="absolute inset-0 flex items-center justify-center -z-10"
                    >
                      <div className="w-96 h-96 bg-cyan-500/20 rounded-full blur-[120px]"></div>
                    </motion.div>
                    
                    <motion.div
                      animate={{ 
                        scale: [1, 1.2, 1],
                        opacity: [0.2, 0.4, 0.2]
                      }}
                      transition={{ duration: 6, repeat: Infinity, delay: 1 }}
                      className="absolute inset-0 flex items-center justify-center -z-10"
                    >
                      <div className="w-[500px] h-[500px] bg-blue-500/15 rounded-full blur-[140px]"></div>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Data Sources / Social Proof - ENHANCED */}
        <section className="relative py-24 px-6 overflow-hidden">
          {/* Enhanced background effects */}
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-blue-500/8 to-cyan-500/5 blur-3xl pointer-events-none"></div>
          
          {/* Animated particles background */}
          <div className="absolute inset-0 opacity-30">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-cyan-400/40 rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [0, -30, 0],
                  opacity: [0.2, 0.6, 0.2],
                  scale: [1, 1.5, 1]
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                }}
              />
            ))}
          </div>
          
          {/* Flowing energy wave */}
          <motion.div
            animate={{ 
              x: ['-100%', '200%'],
              opacity: [0, 0.2, 0]
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/15 to-transparent blur-2xl pointer-events-none"
          />

          {/* Top and bottom glow lines */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent"></div>
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent"></div>

          <div className="max-w-6xl mx-auto relative z-10">
            {/* Enhanced Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 rounded-full mb-4">
                <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
                <span className="text-xs font-semibold text-cyan-300 uppercase tracking-wider">Verified Sources</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-3 bg-gradient-to-r from-white via-cyan-100 to-white bg-clip-text text-transparent">
                Powered By Trusted Data Sources
              </h2>
              <p className="text-slate-400 text-sm max-w-2xl mx-auto">
                Our Deep Learning model leverages premium datasets from leading space agencies and meteorological institutions
              </p>
            </motion.div>
            
            {/* Enhanced Data Source Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                whileHover={{ y: -8, scale: 1.03 }}
                className="relative text-center group cursor-help"
                title="High-resolution satellite imagery providing vegetation, soil, moisture and terrain insights"
              >
                <div className="relative bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-xl border border-orange-400/30 rounded-2xl p-6 group-hover:border-orange-400/60 transition-all overflow-hidden">
                  {/* Card glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  
                  {/* Icon container */}
                  <div className="relative w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-orange-500/30 to-red-600/20 border border-orange-400/50 rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(251,146,60,0.3)] group-hover:shadow-[0_0_35px_rgba(251,146,60,0.5)] transition-all">
                    <Satellite className="w-10 h-10 text-orange-300 group-hover:scale-110 transition-transform" />
                    <div className="absolute inset-0 bg-orange-500/20 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  </div>
                  
                  <h3 className="text-base font-bold text-white mb-1 relative z-10">Sentinel-2 Imagery</h3>
                  <p className="text-xs text-slate-400 mb-2 relative z-10">ESA Satellite</p>
                  <div className="flex items-center justify-center gap-1 text-[10px] text-orange-300/70 relative z-10">
                    <div className="w-1 h-1 bg-orange-400 rounded-full"></div>
                    <span>Multi-spectral</span>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                whileHover={{ y: -8, scale: 1.03 }}
                className="relative text-center group cursor-help"
                title="NASA Shuttle Radar Topography Mission - Digital Elevation Model"
              >
                <div className="relative bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-xl border border-blue-400/30 rounded-2xl p-6 group-hover:border-blue-400/60 transition-all overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  
                  <div className="relative w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-blue-500/30 to-cyan-600/20 border border-blue-400/50 rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(59,130,246,0.3)] group-hover:shadow-[0_0_35px_rgba(59,130,246,0.5)] transition-all">
                    <Layers className="w-10 h-10 text-blue-300 group-hover:scale-110 transition-transform" />
                    <div className="absolute inset-0 bg-blue-500/20 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  </div>
                  
                  <h3 className="text-base font-bold text-white mb-1 relative z-10">SRTM DEM Data</h3>
                  <p className="text-xs text-slate-400 mb-2 relative z-10">NASA/USGS</p>
                  <div className="flex items-center justify-center gap-1 text-[10px] text-blue-300/70 relative z-10">
                    <div className="w-1 h-1 bg-blue-400 rounded-full"></div>
                    <span>Elevation Model</span>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                whileHover={{ y: -8, scale: 1.03 }}
                className="relative text-center group cursor-help"
                title="India Meteorological Department daily and monthly rainfall datasets"
              >
                <div className="relative bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-xl border border-green-400/30 rounded-2xl p-6 group-hover:border-green-400/60 transition-all overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  
                  <div className="relative w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-green-500/30 to-emerald-600/20 border border-green-400/50 rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(34,197,94,0.3)] group-hover:shadow-[0_0_35px_rgba(34,197,94,0.5)] transition-all">
                    <Droplets className="w-10 h-10 text-green-300 group-hover:scale-110 transition-transform" />
                    <div className="absolute inset-0 bg-green-500/20 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  </div>
                  
                  <h3 className="text-base font-bold text-white mb-1 relative z-10">IMD Rainfall</h3>
                  <p className="text-xs text-slate-400 mb-2 relative z-10">India Met Dept</p>
                  <div className="flex items-center justify-center gap-1 text-[10px] text-green-300/70 relative z-10">
                    <div className="w-1 h-1 bg-green-400 rounded-full"></div>
                    <span>Climate Data</span>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                whileHover={{ y: -8, scale: 1.03 }}
                className="relative text-center group cursor-help"
                title="Official administrative boundary shapefiles from Survey of India"
              >
                <div className="relative bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-xl border border-purple-400/30 rounded-2xl p-6 group-hover:border-purple-400/60 transition-all overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  
                  <div className="relative w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-purple-500/30 to-indigo-600/20 border border-purple-400/50 rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(168,85,247,0.3)] group-hover:shadow-[0_0_35px_rgba(168,85,247,0.5)] transition-all">
                    <MapPin className="w-10 h-10 text-purple-300 group-hover:scale-110 transition-transform" />
                    <div className="absolute inset-0 bg-purple-500/20 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  </div>
                  
                  <h3 className="text-base font-bold text-white mb-1 relative z-10">District Shapefiles</h3>
                  <p className="text-xs text-slate-400 mb-2 relative z-10">Survey of India</p>
                  <div className="flex items-center justify-center gap-1 text-[10px] text-purple-300/70 relative z-10">
                    <div className="w-1 h-1 bg-purple-400 rounded-full"></div>
                    <span>Boundaries</span>
                  </div>
                </div>
              </motion.div>
            </div>
            
            {/* Bottom description */}
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="text-center text-slate-400 text-sm mt-10 max-w-3xl mx-auto leading-relaxed"
            >
              Model trained on <span className="text-cyan-400 font-semibold">Sentinel-2 bands</span> (B04, B08, B11), NDVI, NDWI indices, SRTM DEM elevation, and IMD rainfall climatology data
            </motion.p>
          </div>
        </section>

        {/* Section Divider */}
        <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-slate-700/50 to-transparent" />

        {/* How It Works - 3 Steps - ENHANCED */}
        <section className="relative py-24 px-6 overflow-hidden">
          {/* Background effects */}
          <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/5 via-transparent to-blue-500/5 pointer-events-none"></div>
          
          {/* Animated grid background */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute inset-0" style={{
              backgroundImage: 'radial-gradient(circle at center, rgba(6, 182, 212, 0.15) 1px, transparent 1px)',
              backgroundSize: '50px 50px'
            }}></div>
          </div>

          {/* Flowing data stream */}
          <motion.div
            animate={{ 
              x: ['0%', '100%'],
              opacity: [0, 0.3, 0]
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            className="absolute top-1/2 left-0 w-96 h-1 bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent blur-sm"
          />

          <div className="max-w-6xl mx-auto relative z-10">
            {/* Enhanced Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 rounded-full mb-4">
                <Zap className="w-3 h-3 text-cyan-400" />
                <span className="text-xs font-semibold text-cyan-300 uppercase tracking-wider">Deep Learning Pipeline</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-white via-cyan-100 to-white bg-clip-text text-transparent">
                How It Works
              </h2>
              <p className="text-base text-slate-400 max-w-2xl mx-auto">
                Our deep learning model processes multiple data layers to generate accurate groundwater predictions in three intelligent steps
              </p>
            </motion.div>

            {/* Process Flow with connecting lines */}
            <div className="relative">
              {/* Connection lines - hidden on mobile */}
              <div className="hidden md:block absolute top-[100px] left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-green-500/20 z-0"></div>
              
              <div className="grid md:grid-cols-3 gap-8 md:gap-12 relative z-10">
                {/* Step 1 */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                  whileHover={{ y: -8 }}
                  className="relative"
                >
                  <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-xl border border-cyan-400/30 rounded-2xl p-8 hover:border-cyan-400/60 transition-all shadow-xl hover:shadow-2xl hover:shadow-cyan-500/20 overflow-hidden group">
                    {/* Card glow */}
                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    
                    {/* Step number badge */}
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-12 h-12 bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-2xl flex items-center justify-center font-bold text-white text-xl shadow-lg shadow-cyan-500/50 border-4 border-slate-950 group-hover:scale-110 transition-transform">
                      1
                    </div>
                    
                    {/* Icon */}
                    <div className="w-20 h-20 mx-auto mb-6 mt-4 bg-gradient-to-br from-cyan-500/30 to-blue-600/20 rounded-2xl flex items-center justify-center relative group-hover:scale-110 transition-transform">
                      <Satellite className="w-10 h-10 text-cyan-300 relative z-10" />
                      <div className="absolute inset-0 bg-cyan-500/30 rounded-2xl blur-xl"></div>
                    </div>
                    
                    <h3 className="text-xl font-bold mb-3 text-white text-center relative z-10">Collect Data</h3>
                    <p className="text-slate-300 text-sm leading-relaxed text-center relative z-10">
                      Gather Sentinel-2 satellite bands (B04, B08, B11), SRTM DEM elevation data, and rainfall patterns from IMD
                    </p>
                    
                    {/* Tech tags */}
                    <div className="flex flex-wrap gap-2 justify-center mt-4">
                      <span className="px-2 py-1 bg-cyan-500/10 border border-cyan-500/30 rounded-md text-[10px] text-cyan-300">NDVI/NDWI</span>
                      <span className="px-2 py-1 bg-cyan-500/10 border border-cyan-500/30 rounded-md text-[10px] text-cyan-300">Multi-band</span>
                    </div>
                  </div>
                </motion.div>

                {/* Step 2 */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  whileHover={{ y: -8 }}
                  className="relative"
                >
                  <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-xl border border-purple-400/30 rounded-2xl p-8 hover:border-purple-400/60 transition-all shadow-xl hover:shadow-2xl hover:shadow-purple-500/20 overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center font-bold text-white text-xl shadow-lg shadow-purple-500/50 border-4 border-slate-950 group-hover:scale-110 transition-transform">
                      2
                    </div>
                    
                    <div className="w-20 h-20 mx-auto mb-6 mt-4 bg-gradient-to-br from-purple-500/30 to-pink-600/20 rounded-2xl flex items-center justify-center relative group-hover:scale-110 transition-transform">
                      <Brain className="w-10 h-10 text-purple-300 relative z-10" />
                      <div className="absolute inset-0 bg-purple-500/30 rounded-2xl blur-xl"></div>
                    </div>
                    
                    <h3 className="text-xl font-bold mb-3 text-white text-center relative z-10">Deep Learning Processing</h3>
                    <p className="text-slate-300 text-sm leading-relaxed text-center relative z-10">
                      U-Net Convolutional Neural Network analyzes satellite imagery using TensorFlow/Keras deep learning framework
                    </p>
                    
                    <div className="flex flex-wrap gap-2 justify-center mt-4">
                      <span className="px-2 py-1 bg-purple-500/10 border border-purple-500/30 rounded-md text-[10px] text-purple-300">U-Net CNN</span>
                      <span className="px-2 py-1 bg-purple-500/10 border border-purple-500/30 rounded-md text-[10px] text-purple-300">TensorFlow</span>
                    </div>
                  </div>
                </motion.div>

                {/* Step 3 */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                  whileHover={{ y: -8 }}
                  className="relative"
                >
                  <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-xl border border-green-400/30 rounded-2xl p-8 hover:border-green-400/60 transition-all shadow-xl hover:shadow-2xl hover:shadow-green-500/20 overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center font-bold text-white text-xl shadow-lg shadow-green-500/50 border-4 border-slate-950 group-hover:scale-110 transition-transform">
                      3
                    </div>
                    
                    <div className="w-20 h-20 mx-auto mb-6 mt-4 bg-gradient-to-br from-green-500/30 to-emerald-600/20 rounded-2xl flex items-center justify-center relative group-hover:scale-110 transition-transform">
                      <Target className="w-10 h-10 text-green-300 relative z-10" />
                      <div className="absolute inset-0 bg-green-500/30 rounded-2xl blur-xl"></div>
                    </div>
                    
                    <h3 className="text-xl font-bold mb-3 text-white text-center relative z-10">Generate Map</h3>
                    <p className="text-slate-300 text-sm leading-relaxed text-center relative z-10">
                      Interactive groundwater map with hotspot visualization for exploring predictions across the district
                    </p>
                    
                    <div className="flex flex-wrap gap-2 justify-center mt-4">
                      <span className="px-2 py-1 bg-green-500/10 border border-green-500/30 rounded-md text-[10px] text-green-300">Interactive Map</span>
                      <span className="px-2 py-1 bg-green-500/10 border border-green-500/30 rounded-md text-[10px] text-green-300">99.3% Accuracy</span>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Bottom CTA/Info */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="text-center mt-12"
            >
              <p className="text-slate-400 text-sm">
                Processing time: <span className="text-cyan-400 font-semibold">~2-3 seconds</span> per prediction
              </p>
            </motion.div>
          </div>
        </section>

        {/* Section Divider */}
        <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-slate-700/50 to-transparent" />

        {/* Advanced Features Showcase - NEW */}
        <section className="relative py-24 px-6 overflow-hidden">
          {/* Background effects */}
          <div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 via-purple-500/5 to-cyan-500/5 pointer-events-none"></div>
          
          <div className="max-w-6xl mx-auto relative z-10">
            {/* Section Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500/10 to-cyan-500/10 border border-purple-500/20 rounded-full mb-4">
                <Sparkles className="w-3 h-3 text-purple-400 animate-pulse" />
                <span className="text-xs font-semibold text-purple-300 uppercase tracking-wider">14 Advanced Tools</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-white via-purple-100 to-white bg-clip-text text-transparent">
                Powerful Advanced Features
              </h2>
              <p className="text-base text-slate-400 max-w-2xl mx-auto">
                Beyond basic predictions - comprehensive tools for water management, planning, and decision-making
              </p>
            </motion.div>

            {/* Features Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {/* Row 1 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="bg-gradient-to-br from-slate-800/60 to-slate-900/60 border border-cyan-500/20 rounded-xl p-4 hover:border-cyan-500/40 transition-all"
              >
                <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-lg flex items-center justify-center mb-3">
                  <Users className="w-5 h-5 text-white" />
                </div>
                <h4 className="text-sm font-bold text-white mb-1">Community Atlas</h4>
                <p className="text-xs text-slate-400">Crowdsourced borewell data</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.15 }}
                className="bg-gradient-to-br from-slate-800/60 to-slate-900/60 border border-purple-500/20 rounded-xl p-4 hover:border-purple-500/40 transition-all"
              >
                <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg flex items-center justify-center mb-3">
                  <Layers className="w-5 h-5 text-white" />
                </div>
                <h4 className="text-sm font-bold text-white mb-1">3D Visualization</h4>
                <p className="text-xs text-slate-400">Underground aquifer layers</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="bg-gradient-to-br from-slate-800/60 to-slate-900/60 border border-emerald-500/20 rounded-xl p-4 hover:border-emerald-500/40 transition-all"
              >
                <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-green-600 rounded-lg flex items-center justify-center mb-3">
                  <DollarSign className="w-5 h-5 text-white" />
                </div>
                <h4 className="text-sm font-bold text-white mb-1">ROI Calculator</h4>
                <p className="text-xs text-slate-400">Financial cost-benefit analysis</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.25 }}
                className="bg-gradient-to-br from-slate-800/60 to-slate-900/60 border border-sky-500/20 rounded-xl p-4 hover:border-sky-500/40 transition-all"
              >
                <div className="w-10 h-10 bg-gradient-to-br from-sky-500 to-blue-500 rounded-lg flex items-center justify-center mb-3">
                  <Navigation className="w-5 h-5 text-white" />
                </div>
                <h4 className="text-sm font-bold text-white mb-1">Water Sources</h4>
                <p className="text-xs text-slate-400">Rivers, lakes, canals nearby</p>
              </motion.div>

              {/* Row 2 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="bg-gradient-to-br from-slate-800/60 to-slate-900/60 border border-orange-500/20 rounded-xl p-4 hover:border-orange-500/40 transition-all"
              >
                <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center mb-3">
                  <Play className="w-5 h-5 text-white" />
                </div>
                <h4 className="text-sm font-bold text-white mb-1">Time-Lapse</h4>
                <p className="text-xs text-slate-400">NDVI/NDWI animation</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.35 }}
                className="bg-gradient-to-br from-slate-800/60 to-slate-900/60 border border-violet-500/20 rounded-xl p-4 hover:border-violet-500/40 transition-all"
              >
                <div className="w-10 h-10 bg-gradient-to-br from-violet-500 to-purple-600 rounded-lg flex items-center justify-center mb-3">
                  <FileCheck className="w-5 h-5 text-white" />
                </div>
                <h4 className="text-sm font-bold text-white mb-1">Compliance</h4>
                <p className="text-xs text-slate-400">Government permit checker</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="bg-gradient-to-br from-slate-800/60 to-slate-900/60 border border-rose-500/20 rounded-xl p-4 hover:border-rose-500/40 transition-all"
              >
                <div className="w-10 h-10 bg-gradient-to-br from-rose-500 to-pink-600 rounded-lg flex items-center justify-center mb-3">
                  <Bell className="w-5 h-5 text-white" />
                </div>
                <h4 className="text-sm font-bold text-white mb-1">Smart Alerts</h4>
                <p className="text-xs text-slate-400">Email/WhatsApp notifications</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.45 }}
                className="bg-gradient-to-br from-slate-800/60 to-slate-900/60 border border-blue-500/20 rounded-xl p-4 hover:border-blue-500/40 transition-all"
              >
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center mb-3">
                  <Cloud className="w-5 h-5 text-white" />
                </div>
                <h4 className="text-sm font-bold text-white mb-1">Forecasting</h4>
                <p className="text-xs text-slate-400">Precipitation predictions</p>
              </motion.div>
            </div>

            {/* CTA to Advanced Features */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="text-center"
            >
              <Link to="/advanced">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-8 py-4 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl font-bold text-white flex items-center gap-3 mx-auto shadow-[0_0_40px_rgba(16,185,129,0.3)] hover:shadow-[0_0_60px_rgba(16,185,129,0.5)] transition-all"
                >
                  <Sparkles className="w-5 h-5" />
                  Explore All 14 Advanced Features
                  <ChevronRight className="w-5 h-5" />
                </motion.button>
              </Link>
              <p className="text-xs text-slate-500 mt-4">
                +6 core features • Temporal Analysis • Smart Borewell • Crop Suitability • And more
              </p>
            </motion.div>
          </div>
        </section>

        {/* Section Divider */}
        <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-slate-700/50 to-transparent" />

        {/* Use Cases / Applications - ENHANCED */}
        <section className="relative py-24 px-6 overflow-hidden">
          {/* Background effects */}
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/30 via-transparent to-slate-900/30 pointer-events-none"></div>
          
          {/* Animated glow orbs */}
          <motion.div
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.1, 0.2, 0.1]
            }}
            transition={{ duration: 8, repeat: Infinity }}
            className="absolute top-1/4 left-1/4 w-96 h-96 bg-green-500/10 rounded-full blur-3xl"
          />
          <motion.div
            animate={{ 
              scale: [1.2, 1, 1.2],
              opacity: [0.1, 0.2, 0.1]
            }}
            transition={{ duration: 8, repeat: Infinity }}
            className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"
          />

          <div className="max-w-6xl mx-auto relative z-10">
            {/* Enhanced Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-full mb-4">
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                <span className="text-xs font-semibold text-blue-300 uppercase tracking-wider">Real-World Impact</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent">
                Who Benefits From This?
              </h2>
              <p className="text-base text-slate-400 max-w-2xl mx-auto">
                Empowering stakeholders across sectors with data-driven insights for sustainable water management
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Farmers Card */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="relative group"
              >
                <div className="relative bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-xl border border-green-400/30 rounded-2xl p-8 hover:border-green-400/60 transition-all shadow-xl hover:shadow-2xl hover:shadow-green-500/20 overflow-hidden">
                  {/* Card glow */}
                  <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  
                  {/* Floating icon container */}
                  <div className="relative w-20 h-20 mb-6 bg-gradient-to-br from-green-500/30 to-emerald-600/20 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Droplets className="w-10 h-10 text-green-300 relative z-10" />
                    <div className="absolute inset-0 bg-green-500/30 rounded-2xl blur-xl group-hover:blur-2xl transition-all"></div>
                  </div>
                  
                  <h3 className="text-xl font-bold mb-3 text-white relative z-10">For Farmers</h3>
                  <p className="text-slate-300 text-sm leading-relaxed mb-4 relative z-10">
                    Find high-potential borewell locations, optimize irrigation planning, and reduce drilling costs with accurate predictions.
                  </p>
                  
                  {/* Benefits list */}
                  <ul className="space-y-2 relative z-10">
                    <li className="flex items-center gap-2 text-xs text-green-300/80">
                      <CheckCircle className="w-4 h-4 flex-shrink-0" />
                      <span>Reduce borewell failure rates</span>
                    </li>
                    <li className="flex items-center gap-2 text-xs text-green-300/80">
                      <CheckCircle className="w-4 h-4 flex-shrink-0" />
                      <span>Save drilling costs by 40%+</span>
                    </li>
                    <li className="flex items-center gap-2 text-xs text-green-300/80">
                      <CheckCircle className="w-4 h-4 flex-shrink-0" />
                      <span>Optimize crop water planning</span>
                    </li>
                  </ul>
                </div>
              </motion.div>

              {/* Government Card */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="relative group"
              >
                <div className="relative bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-xl border border-blue-400/30 rounded-2xl p-8 hover:border-blue-400/60 transition-all shadow-xl hover:shadow-2xl hover:shadow-blue-500/20 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  
                  <div className="relative w-20 h-20 mb-6 bg-gradient-to-br from-blue-500/30 to-cyan-600/20 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    <MapPin className="w-10 h-10 text-blue-300 relative z-10" />
                    <div className="absolute inset-0 bg-blue-500/30 rounded-2xl blur-xl group-hover:blur-2xl transition-all"></div>
                  </div>
                  
                  <h3 className="text-xl font-bold mb-3 text-white relative z-10">For Government</h3>
                  <p className="text-slate-300 text-sm leading-relaxed mb-4 relative z-10">
                    Plan water resource management, drought mitigation strategies, and policy decisions backed by scientific data.
                  </p>
                  
                  <ul className="space-y-2 relative z-10">
                    <li className="flex items-center gap-2 text-xs text-blue-300/80">
                      <CheckCircle className="w-4 h-4 flex-shrink-0" />
                      <span>District-level water mapping</span>
                    </li>
                    <li className="flex items-center gap-2 text-xs text-blue-300/80">
                      <CheckCircle className="w-4 h-4 flex-shrink-0" />
                      <span>Drought risk assessment</span>
                    </li>
                    <li className="flex items-center gap-2 text-xs text-blue-300/80">
                      <CheckCircle className="w-4 h-4 flex-shrink-0" />
                      <span>Policy decision support</span>
                    </li>
                  </ul>
                </div>
              </motion.div>

              {/* Researchers Card */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="relative group"
              >
                <div className="relative bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-xl border border-purple-400/30 rounded-2xl p-8 hover:border-purple-400/60 transition-all shadow-xl hover:shadow-2xl hover:shadow-purple-500/20 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  
                  <div className="relative w-20 h-20 mb-6 bg-gradient-to-br from-purple-500/30 to-indigo-600/20 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Brain className="w-10 h-10 text-purple-300 relative z-10" />
                    <div className="absolute inset-0 bg-purple-500/30 rounded-2xl blur-xl group-hover:blur-2xl transition-all"></div>
                  </div>
                  
                  <h3 className="text-xl font-bold mb-3 text-white relative z-10">For Researchers</h3>
                  <p className="text-slate-300 text-sm leading-relaxed mb-4 relative z-10">
                    Analyze multi-layer geospatial datasets, validate models, and contribute to groundwater science research.
                  </p>
                  
                  <ul className="space-y-2 relative z-10">
                    <li className="flex items-center gap-2 text-xs text-purple-300/80">
                      <CheckCircle className="w-4 h-4 flex-shrink-0" />
                      <span>Multi-source data integration</span>
                    </li>
                    <li className="flex items-center gap-2 text-xs text-purple-300/80">
                      <CheckCircle className="w-4 h-4 flex-shrink-0" />
                      <span>Deep Learning model benchmarking</span>
                    </li>
                    <li className="flex items-center gap-2 text-xs text-purple-300/80">
                      <CheckCircle className="w-4 h-4 flex-shrink-0" />
                      <span>Publish-ready insights</span>
                    </li>
                  </ul>
                </div>
              </motion.div>
            </div>

            {/* Bottom statistics */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="grid grid-cols-3 gap-6 mt-16 max-w-3xl mx-auto"
            >
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-cyan-400 mb-1">1000+</div>
                <div className="text-xs text-slate-400">Predictions Made</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-green-400 mb-1">128×128</div>
                <div className="text-xs text-slate-400">Tile Resolution</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-purple-400 mb-1">U-Net</div>
                <div className="text-xs text-slate-400">CNN Architecture</div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Section Divider */}
        <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-slate-700/50 to-transparent" />

        {/* Why 94% Accuracy */}
        <section className="py-20 px-6">
          <div className="max-w-6xl mx-auto">
            {/* Section Header */}
            <div className="text-center mb-12">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 rounded-full mb-6"
              >
                <CheckCircle className="w-5 h-5 text-cyan-400" />
                <span className="text-sm font-semibold text-cyan-300">Proven Performance</span>
              </motion.div>
              <h2 className="text-4xl font-bold mb-4 tracking-tight">
                Why <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">94% Accuracy?</span>
              </h2>
              <p className="text-lg text-slate-400 max-w-2xl mx-auto">
                Our groundwater prediction model achieves exceptional accuracy through advanced Deep Learning and comprehensive data analysis
              </p>
            </div>

            {/* Accuracy Stats Grid */}
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="relative bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-cyan-500/20 rounded-2xl p-6 overflow-hidden group hover:border-cyan-500/40 transition-all"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl -translate-y-8 translate-x-8 group-hover:bg-cyan-500/20 transition-all" />
                <div className="relative">
                  <div className="text-5xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-2">99.3%</div>
                  <div className="text-sm font-semibold text-white mb-2">Model Accuracy</div>
                  <div className="text-xs text-slate-400 leading-relaxed">
                    Validated against real borewell success data across Dharwad district
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="relative bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-blue-500/20 rounded-2xl p-6 overflow-hidden group hover:border-blue-500/40 transition-all"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl -translate-y-8 translate-x-8 group-hover:bg-blue-500/20 transition-all" />
                <div className="relative">
                  <div className="text-5xl font-bold bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent mb-2">15+</div>
                  <div className="text-sm font-semibold text-white mb-2">Data Layers</div>
                  <div className="text-xs text-slate-400 leading-relaxed">
                    Satellite imagery, terrain, soil, rainfall, geology & hydrogeology
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="relative bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-indigo-500/20 rounded-2xl p-6 overflow-hidden group hover:border-indigo-500/40 transition-all"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl -translate-y-8 translate-x-8 group-hover:bg-indigo-500/20 transition-all" />
                <div className="relative">
                  <div className="text-5xl font-bold bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent mb-2">7</div>
                  <div className="text-sm font-semibold text-white mb-2">Years of Data</div>
                  <div className="text-xs text-slate-400 leading-relaxed">
                    Historical patterns analyzed to ensure robust predictions
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Key Features Grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="grid md:grid-cols-2 gap-6"
            >
              {/* Advanced Deep Learning */}
              <div className="bg-gradient-to-br from-slate-800/40 to-slate-900/40 border border-slate-700/50 rounded-2xl p-6 hover:border-cyan-500/30 transition-all">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-cyan-500/20 to-blue-600/20 border border-cyan-500/30 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Brain className="w-6 h-6 text-cyan-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white mb-2">Advanced Deep Learning</h3>
                    <p className="text-sm text-slate-400 mb-3 leading-relaxed">
                      U-Net Convolutional Neural Network architecture using TensorFlow/Keras for pixel-wise groundwater potential segmentation
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-2.5 py-1 bg-cyan-500/10 border border-cyan-500/20 rounded-md text-xs text-cyan-300">U-Net CNN</span>
                      <span className="px-2.5 py-1 bg-cyan-500/10 border border-cyan-500/20 rounded-md text-xs text-cyan-300">TensorFlow</span>
                      <span className="px-2.5 py-1 bg-cyan-500/10 border border-cyan-500/20 rounded-md text-xs text-cyan-300">Keras</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Multi-Source Data */}
              <div className="bg-gradient-to-br from-slate-800/40 to-slate-900/40 border border-slate-700/50 rounded-2xl p-6 hover:border-blue-500/30 transition-all">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500/20 to-indigo-600/20 border border-blue-500/30 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Layers className="w-6 h-6 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white mb-2">Multi-Source Data Fusion</h3>
                    <p className="text-sm text-slate-400 mb-3 leading-relaxed">
                      Integrates satellite imagery, terrain models, climate data, and ground surveys for comprehensive environmental analysis
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-2.5 py-1 bg-blue-500/10 border border-blue-500/20 rounded-md text-xs text-blue-300">Sentinel-2</span>
                      <span className="px-2.5 py-1 bg-blue-500/10 border border-blue-500/20 rounded-md text-xs text-blue-300">SRTM DEM</span>
                      <span className="px-2.5 py-1 bg-blue-500/10 border border-blue-500/20 rounded-md text-xs text-blue-300">IMD Rainfall</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Rigorous Validation */}
              <div className="bg-gradient-to-br from-slate-800/40 to-slate-900/40 border border-slate-700/50 rounded-2xl p-6 hover:border-green-500/30 transition-all">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500/20 to-emerald-600/20 border border-green-500/30 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Target className="w-6 h-6 text-green-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white mb-2">Rigorous Validation</h3>
                    <p className="text-sm text-slate-400 leading-relaxed">
                      Cross-validated against actual borewell success/failure data with stratified sampling to ensure reliability across diverse geological conditions
                    </p>
                  </div>
                </div>
              </div>

              {/* Continuous Learning */}
              <div className="bg-gradient-to-br from-slate-800/40 to-slate-900/40 border border-slate-700/50 rounded-2xl p-6 hover:border-purple-500/30 transition-all">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500/20 to-pink-600/20 border border-purple-500/30 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Zap className="w-6 h-6 text-purple-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white mb-2">Temporal Analysis</h3>
                    <p className="text-sm text-slate-400 leading-relaxed">
                      Analyzes 7 years of historical data patterns including seasonal variations, rainfall trends, and vegetation cycles for robust predictions
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Section Divider */}
        <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-slate-700/50 to-transparent" />

        {/* CTA Section - Bold Design */}
        <section className="py-16 px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="max-w-5xl mx-auto"
          >
            <div className="relative rounded-3xl bg-gradient-to-br from-cyan-600 via-blue-600 to-indigo-600 p-12 text-center overflow-hidden shadow-2xl shadow-cyan-500/20">
              {/* Decorative elements */}
              <div className="absolute top-0 left-0 w-64 h-64 bg-cyan-400/20 rounded-full -translate-x-24 -translate-y-24 blur-3xl" />
              <div className="absolute bottom-0 right-0 w-64 h-64 bg-blue-400/20 rounded-full translate-x-24 translate-y-24 blur-3xl" />
              
              <div className="relative z-10">
                <Droplets className="w-12 h-12 mx-auto mb-5 text-cyan-300 drop-shadow-lg" />
                <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">Ready to Find Water?</h2>
                <p className="text-base md:text-lg text-white/90 mb-8 max-w-2xl mx-auto">
                  Start exploring groundwater potential in Dharwad district. Get instant predictions backed by satellite data and Deep Learning.
                </p>
                <div className="flex flex-wrap gap-3 justify-center">
                  <Link to="/map">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-8 py-3.5 bg-white text-blue-600 rounded-xl font-bold text-base flex items-center gap-2.5 shadow-2xl hover:shadow-white/30 transition-all"
                    >
                      Start Exploring
                      <ArrowRight className="w-5 h-5" />
                    </motion.button>
                  </Link>
                  <Link to="/about">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-8 py-3.5 bg-white/10 border-2 border-white/40 rounded-xl font-bold text-base backdrop-blur-sm hover:bg-white/20 hover:border-white/60 transition-all"
                    >
                      Learn More
                    </motion.button>
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Footer */}
        <footer className="border-t border-slate-800 py-12 px-6 bg-slate-900/30">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-4 gap-8 mb-8">
              <div>
                <h3 className="font-bold text-xl mb-4 flex items-center gap-2">
                  <Droplets className="w-6 h-6 text-cyan-400" />
                  HydroSense
                </h3>
                <p className="text-slate-400 text-sm">Deep learning-powered groundwater prediction for sustainable water management.</p>
              </div>
              <div>
                <h4 className="font-semibold mb-4 text-white">Features</h4>
                <ul className="space-y-2 text-slate-400 text-sm">
                  <li><Link to="/map" className="hover:text-cyan-400 transition-colors">Interactive Map</Link></li>
                  <li><Link to="/dashboard" className="hover:text-cyan-400 transition-colors">Analytics</Link></li>
                  <li><Link to="/about" className="hover:text-cyan-400 transition-colors">About</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-4 text-white">Technology</h4>
                <ul className="space-y-2 text-slate-400 text-sm">
                  <li>Sentinel-2 Imagery</li>
                  <li>Deep Learning</li>
                  <li>Real-time Analysis</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-4 text-white">Data Sources</h4>
                <ul className="space-y-2 text-slate-400 text-sm">
                  <li>Sentinel-2 (B04, B08, B11)</li>
                  <li>SRTM DEM Elevation</li>
                  <li>IMD Rainfall (NetCDF)</li>
                </ul>
              </div>
            </div>
            <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-slate-400 text-sm">
              <div>© 2024 HydroSense Platform. All rights reserved.</div>
              <div className="flex gap-6">
                <span>Dharwad District</span>
                <span>•</span>
                <span>Karnataka, India</span>
              </div>
            </div>
          </div>
        </footer>
      </div>

      <style>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  )
}

export default LandingPage
