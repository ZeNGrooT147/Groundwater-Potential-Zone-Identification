import { useState } from 'react'
import axios from 'axios'
import { MapPin, Search, Droplets, Loader, X, Download, Brain, Layers, Target, Activity, TrendingUp, Info, CheckCircle } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import InteractiveMap from '../components/InteractiveMap'

interface FeatureDetail {
  value: number
  contribution_score: number
  importance_percentage: number
  impact: 'positive' | 'neutral' | 'negative'
  interpretation: string
}

interface ReasoningStep {
  rank: number
  factor: string
  importance: string
  status: string
  explanation: string
}

interface DecisionStep {
  step: number
  stage: string
  description: string
  probabilities?: { [key: string]: number }
}

interface Validation {
  principle: string
  status: string
  note: string
}

interface PredictionResult {
  success: boolean
  location: {
    lat: number
    lon: number
  }
  prediction: {
    groundwater_class: string
    confidence: number
    ndvi: number
    ndwi: number
    elevation: number
  }
  weather?: {
    temperature: number
    description: string
  }
  explanation: {
    factors: string[]
    conclusion: string
  }
  xai?: {
    prediction: string
    confidence: number
    feature_importance: {
      vegetation_ndvi: FeatureDetail
      water_content_ndwi: FeatureDetail
      elevation_dem: FeatureDetail
      overall_confidence: number
    }
    reasoning_chain: ReasoningStep[]
    decision_logic: DecisionStep[]
    confidence_breakdown: {
      data_quality: number
      model_accuracy: number
      spatial_resolution: number
      feature_reliability: number
    }
    hydrogeological_validation: {
      overall_status: string
      validations: Validation[]
      scientific_basis: string
    }
    model_transparency: {
      architecture: string
      training_data: string
      test_accuracy: string
      f1_score: string
      interpretability_method: string
    }
  }
  timestamp: string
  data_source: string
}

const MapViewer = () => {
  const [lat, setLat] = useState('')
  const [lon, setLon] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<PredictionResult | null>(null)
  const [error, setError] = useState('')

  const handleBackToDharwad = () => {
    setLat('15.5')
    setLon('75.0')
    setResult(null)
    setError('')
  }

  const handleSearch = async () => {
    if (!lat || !lon) {
      setError('Please enter both latitude and longitude')
      return
    }

    const latNum = parseFloat(lat)
    const lonNum = parseFloat(lon)

    if (latNum < 15 || latNum > 16 || lonNum < 74.5 || lonNum > 75.5) {
      setError('Coordinates must be within Dharwad District (Lat: 15-16, Lon: 74.5-75.5)')
      return
    }

    setLoading(true)
    setError('')

    try {
      const response = await axios.post('http://localhost:5000/api/predict', {
        lat: latNum,
        lon: lonNum
      })
      setResult(response.data)
    } catch (err) {
      setError('Failed to get prediction. Make sure Flask backend is running.')
      console.error('API Error:', err)
    } finally {
      setLoading(false)
    }
  }

  const getGWPColor = (gwpClass?: string) => {
    if (!gwpClass) return 'text-white'
    switch (gwpClass.toLowerCase()) {
      case 'high': return 'text-green-400'
      case 'moderate': return 'text-yellow-400'
      case 'low': return 'text-red-400'
      default: return 'text-white'
    }
  }

  const getGWPBg = (gwpClass?: string) => {
    if (!gwpClass) return 'bg-white/20 border-white/50'
    switch (gwpClass.toLowerCase()) {
      case 'high': return 'bg-green-500/20 border-green-500/50'
      case 'moderate': return 'bg-yellow-500/20 border-yellow-500/50'
      case 'low': return 'bg-red-500/20 border-red-500/50'
      default: return 'bg-white/20 border-white/50'
    }
  }

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'positive': return 'text-green-400 bg-green-500/20 border-green-500/50'
      case 'neutral': return 'text-yellow-400 bg-yellow-500/20 border-yellow-500/50'
      case 'negative': return 'text-red-400 bg-red-500/20 border-red-500/50'
      default: return 'text-slate-400 bg-slate-500/20 border-slate-500/50'
    }
  }

  return (
    <div className="min-h-screen pt-32 pb-16 px-6 bg-slate-950 relative overflow-hidden">
      {/* Enhanced Premium Background */}
      {/* Grid Pattern */}
      <div className="fixed inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAgTSAwIDIwIEwgNDAgMjAgTSAyMCAwIEwgMjAgNDAgTSAwIDMwIEwgNDAgMzAgTSAzMCAwIEwgMzAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzFhMjMzYSIgb3BhY2l0eT0iMC4zIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-50" />
      
      {/* Gradient Overlay */}
      <div className="fixed inset-0 bg-gradient-to-br from-blue-900/8 via-transparent to-cyan-900/8 pointer-events-none" />
      
      {/* Animated Glow Orbs */}
      <div className="fixed inset-0 opacity-30 pointer-events-none">
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-20 left-10 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl"
        />
        <motion.div 
          animate={{ 
            scale: [1.2, 1, 1.2],
            opacity: [0.25, 0.45, 0.25]
          }}
          transition={{ duration: 10, repeat: Infinity, delay: 1 }}
          className="absolute top-40 right-10 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl"
        />
        <motion.div 
          animate={{ 
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{ duration: 12, repeat: Infinity, delay: 2 }}
          className="absolute bottom-20 left-1/2 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl"
        />
      </div>

      {/* Scanning Line Effect */}
      <motion.div
        animate={{ y: ['-100%', '200%'] }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        className="fixed inset-0 bg-gradient-to-b from-transparent via-cyan-500/5 to-transparent h-32 pointer-events-none"
      />

      {/* Floating Particles */}
      <div className="fixed inset-0 opacity-20 pointer-events-none overflow-hidden">
        {[...Array(15)].map((_, i) => (
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

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Enhanced Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16 text-center"
        >
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border-2 border-cyan-500/40 rounded-full mb-6 shadow-lg shadow-cyan-500/20"
          >
            <div className="w-6 h-6 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full flex items-center justify-center">
              <MapPin className="w-4 h-4 text-white" />
            </div>
            <span className="text-base font-bold bg-gradient-to-r from-cyan-300 to-blue-400 bg-clip-text text-transparent">Dharwad District</span>
          </motion.div>
          <h1 className="text-5xl md:text-6xl font-black mb-6 bg-gradient-to-r from-white via-cyan-100 to-blue-200 bg-clip-text text-transparent drop-shadow-2xl">
            Interactive Groundwater Map
          </h1>
          <p className="text-slate-300 text-lg max-w-2xl mx-auto font-medium leading-relaxed">
            Click on the map or enter coordinates to predict groundwater potential with AI-powered analysis
          </p>
        </motion.div>
        
        {/* 3-Column Layout: Results | Map | XAI */}
        <div className="grid lg:grid-cols-12 gap-6">
          
          {/* LEFT PANEL - Prediction Results */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-3 space-y-6"
          >
            {/* Search Form */}
            <div className="bg-gradient-to-br from-slate-900/95 to-slate-800/95 backdrop-blur-xl border-2 border-slate-700/50 p-6 rounded-2xl shadow-2xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-cyan-500/30">
                  <Search className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-lg font-bold text-white">Search</h2>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-2">Latitude</label>
                  <input
                    type="number"
                    step="0.0001"
                    value={lat}
                    onChange={(e) => setLat(e.target.value)}
                    placeholder="15.0 - 16.0"
                    className="w-full px-4 py-2.5 bg-slate-800/60 border-2 border-slate-600/50 rounded-xl focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/30 transition-all text-white placeholder-slate-400 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-2">Longitude</label>
                  <input
                    type="number"
                    step="0.0001"
                    value={lon}
                    onChange={(e) => setLon(e.target.value)}
                    placeholder="74.5 - 75.5"
                    className="w-full px-4 py-2.5 bg-slate-800/60 border-2 border-slate-600/50 rounded-xl focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/30 transition-all text-white placeholder-slate-400 text-sm"
                  />
                </div>

                {error && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="p-3 bg-red-500/20 border-2 border-red-500/40 rounded-xl text-red-200 text-xs flex items-start gap-2"
                  >
                    <X className="w-4 h-4 flex-shrink-0 mt-0.5" />
                    <span>{error}</span>
                  </motion.div>
                )}

                <button
                  onClick={handleSearch}
                  disabled={loading}
                  className="w-full px-4 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 rounded-xl font-bold text-white flex items-center justify-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-cyan-500/30 hover:shadow-xl hover:scale-[1.02] text-sm"
                >
                  {loading ? (
                    <>
                      <Loader className="w-4 h-4 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Brain className="w-4 h-4" />
                      Analyze Location
                    </>
                  )}
                </button>

                <button
                  onClick={handleBackToDharwad}
                  className="w-full px-4 py-2 bg-slate-700/50 hover:bg-slate-600/50 rounded-xl font-bold text-white flex items-center justify-center gap-2 transition-all text-xs border border-slate-600/50"
                >
                  <Target className="w-3 h-3" />
                  Reset to Center
                </button>
              </div>
            </div>

            {/* Prediction Results */}
            <AnimatePresence>
              {result && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-4"
                >
                  {/* GWP Class */}
                  <div className={`${getGWPBg(result.prediction.groundwater_class)} border-2 p-6 rounded-xl text-center shadow-xl`}>
                    <h3 className="text-xs font-bold text-slate-300 mb-2 uppercase tracking-wider">Groundwater Potential</h3>
                    <div className={`text-4xl font-black mb-2 ${getGWPColor(result.prediction.groundwater_class)}`}>
                      {result.prediction.groundwater_class}
                    </div>
                    <div className="text-xs text-slate-300">
                      Confidence: <span className="font-bold text-white">{(result.prediction.confidence * 100).toFixed(1)}%</span>
                    </div>
                  </div>

                  {/* Environmental Indicators */}
                  <div className="space-y-3">
                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Environmental Data</h3>
                    
                    {/* NDVI */}
                    <div className="bg-green-500/10 border-2 border-green-500/30 p-4 rounded-xl">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-bold text-green-400">Vegetation (NDVI)</span>
                        <Layers className="w-4 h-4 text-green-400" />
                      </div>
                      <div className="text-2xl font-black text-white">{result.prediction.ndvi.toFixed(3)}</div>
                    </div>

                    {/* NDWI */}
                    <div className="bg-blue-500/10 border-2 border-blue-500/30 p-4 rounded-xl">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-bold text-blue-400">Water Content (NDWI)</span>
                        <Droplets className="w-4 h-4 text-blue-400" />
                      </div>
                      <div className="text-2xl font-black text-white">{result.prediction.ndwi.toFixed(3)}</div>
                    </div>

                    {/* Elevation */}
                    <div className="bg-purple-500/10 border-2 border-purple-500/30 p-4 rounded-xl">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-bold text-purple-400">Elevation (DEM)</span>
                        <Target className="w-4 h-4 text-purple-400" />
                      </div>
                      <div className="text-2xl font-black text-white">{result.prediction.elevation.toFixed(0)}m</div>
                    </div>
                  </div>

                  {/* AI Summary */}
                  <div className="bg-slate-800/60 border-2 border-slate-700/50 p-4 rounded-xl">
                    <div className="flex items-center gap-2 mb-3">
                      <Brain className="w-4 h-4 text-cyan-400" />
                      <h3 className="text-xs font-bold text-white">AI Summary</h3>
                    </div>
                    <p className="text-xs text-slate-200 leading-relaxed mb-3">{result.explanation.conclusion}</p>
                    <div className="space-y-2">
                      {result.explanation.factors.slice(0, 2).map((factor, index) => (
                        <div key={index} className="flex items-start gap-2 text-xs text-slate-300">
                          <span className="text-cyan-400 mt-0.5">•</span>
                          <span>{factor}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Coordinates */}
                  <div className="bg-slate-900/60 border border-slate-700/50 px-4 py-3 rounded-xl flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3 h-3 text-cyan-400" />
                      <span className="text-xs text-slate-300">
                        {result.location.lat.toFixed(4)}°N, {result.location.lon.toFixed(4)}°E
                      </span>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* MIDDLE PANEL - Interactive Map */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-6"
          >
            <div className="bg-gradient-to-br from-slate-900/95 to-slate-800/95 backdrop-blur-xl border-2 border-slate-700/50 rounded-2xl shadow-2xl overflow-hidden" style={{ height: '800px' }}>
              <InteractiveMap
                onLocationSelect={(lat, lon) => {
                  setLat(lat.toString())
                  setLon(lon.toString())
                  handleSearch()
                }}
              />
            </div>
          </motion.div>

          {/* RIGHT PANEL - XAI Analysis */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-3 space-y-6"
          >

          {/* Right Panel - Map & Results */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2 space-y-6"
          >
            {/* Interactive Map */}
            <div className="bg-gradient-to-br from-slate-900/95 to-slate-800/95 border-2 border-slate-700/50 rounded-2xl overflow-hidden shadow-2xl backdrop-blur-xl" style={{ height: '500px' }}>
              <InteractiveMap
                selectedLat={lat ? parseFloat(lat) : undefined}
                selectedLon={lon ? parseFloat(lon) : undefined}
                onLocationSelect={(latitude, longitude) => {
                  setLat(latitude.toFixed(4))
                  setLon(longitude.toFixed(4))
                }}
              />
            </div>

            {/* Prediction Results */}
            <AnimatePresence>
              {result && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="bg-gradient-to-br from-slate-900/95 to-slate-800/95 backdrop-blur-xl border border-slate-700/50 p-6 rounded-2xl shadow-2xl"
                >
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-cyan-500/30">
                        <Droplets className="w-6 h-6 text-white" />
                      </div>
                      <h2 className="text-2xl font-bold bg-gradient-to-r from-white to-cyan-100 bg-clip-text text-transparent">Prediction Results</h2>
                    </div>
                    <button
                      onClick={() => setResult(null)}
                      className="p-2 hover:bg-slate-800/50 rounded-xl transition-all border border-slate-700/50 hover:border-slate-600"
                    >
                      <X className="w-5 h-5 text-slate-400 hover:text-white transition-colors" />
                    </button>
                  </div>

                  {/* Main Result */}
                  <div className={`p-10 rounded-2xl border-2 mb-6 relative overflow-hidden ${getGWPBg(result.prediction.groundwater_class)}`}>
                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none"></div>
                    <div className="text-center relative z-10">
                      <p className="text-xs text-slate-300/70 mb-3 uppercase tracking-widest font-medium">Groundwater Potential</p>
                      <p className={`text-5xl font-black mb-4 drop-shadow-lg ${getGWPColor(result.prediction.groundwater_class)}`}>
                        {result.prediction.groundwater_class.toUpperCase()}
                      </p>
                      <div className="inline-flex items-center gap-3 px-6 py-3 bg-slate-950/40 backdrop-blur-sm rounded-xl border border-white/10">
                        <span className="text-sm text-slate-300">Confidence:</span>
                        <span className="text-lg font-bold text-white">{(result.prediction.confidence * 100).toFixed(1)}%</span>
                      </div>
                    </div>
                  </div>

                  {/* Environmental Indicators */}
                  <div className="space-y-5 mb-6">
                    <h3 className="text-sm font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
                      <Layers className="w-4 h-4 text-cyan-400" />
                      Environmental Indicators
                    </h3>
                    
                    <div className="grid md:grid-cols-3 gap-4">
                      {/* NDVI Card */}
                      <div className="group bg-gradient-to-br from-green-500/20 to-green-600/10 border-2 border-green-500/40 p-5 rounded-xl hover:shadow-lg hover:shadow-green-500/20 transition-all hover:scale-105">
                        <div className="flex items-center gap-2 mb-3">
                          <div className="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center">
                            <Layers className="w-4 h-4 text-green-400" />
                          </div>
                          <span className="text-xs text-green-300 font-bold uppercase tracking-wider">NDVI</span>
                        </div>
                        <p className="text-3xl font-black text-green-400 mb-2 drop-shadow-lg">{result.prediction.ndvi.toFixed(3)}</p>
                        <p className="text-xs text-slate-300 font-medium">Vegetation Index</p>
                      </div>

                      {/* NDWI Card */}
                      <div className="group bg-gradient-to-br from-blue-500/20 to-blue-600/10 border-2 border-blue-500/40 p-5 rounded-xl hover:shadow-lg hover:shadow-blue-500/20 transition-all hover:scale-105">
                        <div className="flex items-center gap-2 mb-3">
                          <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center">
                            <Droplets className="w-4 h-4 text-blue-400" />
                          </div>
                          <span className="text-xs text-blue-300 font-bold uppercase tracking-wider">NDWI</span>
                        </div>
                        <p className="text-3xl font-black text-blue-400 mb-2 drop-shadow-lg">{result.prediction.ndwi.toFixed(3)}</p>
                        <p className="text-xs text-slate-300 font-medium">Water Index</p>
                      </div>

                      {/* Elevation Card */}
                      <div className="group bg-gradient-to-br from-purple-500/20 to-purple-600/10 border-2 border-purple-500/40 p-5 rounded-xl hover:shadow-lg hover:shadow-purple-500/20 transition-all hover:scale-105">
                        <div className="flex items-center gap-2 mb-3">
                          <div className="w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center">
                            <Target className="w-4 h-4 text-purple-400" />
                          </div>
                          <span className="text-xs text-purple-300 font-bold uppercase tracking-wider">Elevation</span>
                        </div>
                        <p className="text-3xl font-black text-purple-400 mb-2 drop-shadow-lg">{result.prediction.elevation.toFixed(0)}m</p>
                        <p className="text-xs text-slate-300 font-medium">Above Sea Level</p>
                      </div>
                    </div>
                  </div>

                  {/* Deep Learning Analysis */}
                  <div className="bg-gradient-to-br from-slate-800/60 to-slate-900/60 border-2 border-slate-700/50 p-6 rounded-xl mb-6 backdrop-blur-sm">
                    <div className="flex items-center gap-3 mb-5">
                      <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-cyan-500/20">
                        <Brain className="w-5 h-5 text-white" />
                      </div>
                      <h3 className="text-base font-bold text-white">AI Analysis</h3>
                    </div>
                    
                    {/* Conclusion */}
                    <div className="mb-5 p-4 bg-slate-900/40 rounded-lg border border-slate-700/30">
                      <p className="text-sm text-white leading-relaxed font-medium">{result.explanation.conclusion}</p>
                    </div>
                    
                    {/* Factors */}
                    <div className="space-y-3">
                      <p className="text-xs text-slate-400 uppercase font-bold tracking-wider mb-3">Key Factors</p>
                      {result.explanation.factors.map((factor, index) => (
                        <div key={index} className="flex items-start gap-3 p-3 bg-slate-900/30 rounded-lg border border-slate-700/20 hover:border-cyan-500/30 transition-all">
                          <span className="text-cyan-400 text-lg font-bold mt-0.5">•</span>
                          <p className="text-sm text-slate-200 leading-relaxed">{factor}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Explainable AI Button */}
                  {result.xai && (
                    <button
                      onClick={() => setShowXAI(!showXAI)}
                      className="w-full px-6 py-4 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 rounded-xl font-bold text-white flex items-center justify-center gap-3 transition-all shadow-lg shadow-indigo-500/30 hover:shadow-xl hover:shadow-indigo-500/40 hover:scale-[1.02] text-base mb-6 border-2 border-indigo-500/50"
                    >
                      <Brain className="w-5 h-5" />
                      {showXAI ? 'Hide Explainable AI Analysis' : 'Show Explainable AI Analysis'}
                    </button>
                  )}

                  {/* XAI - Explainable AI Section - Toggle Visibility */}
                  {result.xai && showXAI && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="space-y-4 mb-6"
                    >
                      <div className="flex items-center gap-2 mb-4">
                        <Brain className="w-5 h-5 text-indigo-400" />
                        <h3 className="text-lg font-bold text-white">Explainable AI Analysis</h3>
                        <div className="ml-auto bg-indigo-500/20 border border-indigo-500/40 px-3 py-1 rounded-full text-xs text-indigo-300 font-semibold">
                          Real Data • 99.34% Accuracy
                        </div>
                      </div>

                      {/* Feature Importance - Always Visible */}
                      <div className="bg-gradient-to-br from-indigo-500/10 to-violet-500/10 border-2 border-indigo-500/30 rounded-xl p-4">
                        <div className="flex items-center gap-2 mb-4">
                          <TrendingUp className="w-5 h-5 text-indigo-400" />
                          <span className="font-bold text-white">Feature Importance</span>
                        </div>
                        
                        <div className="space-y-3">
                                {/* NDVI */}
                                <div className={`border-2 rounded-lg p-4 ${getImpactColor(result.xai.feature_importance.vegetation_ndvi.impact)}`}>
                                  <div className="flex items-center justify-between mb-2">
                                    <div className="flex items-center gap-2">
                                      <Activity className="w-4 h-4" />
                                      <span className="font-bold text-sm">Vegetation (NDVI)</span>
                                    </div>
                                    <span className="text-xl font-black">{result.xai.feature_importance.vegetation_ndvi.importance_percentage}%</span>
                                  </div>
                                  <div className="grid grid-cols-3 gap-2 mb-2 text-xs">
                                    <div className="bg-slate-900/50 rounded p-2 text-center">
                                      <div className="text-slate-400">Value</div>
                                      <div className="font-bold">{result.xai.feature_importance.vegetation_ndvi.value.toFixed(3)}</div>
                                    </div>
                                    <div className="bg-slate-900/50 rounded p-2 text-center">
                                      <div className="text-slate-400">Score</div>
                                      <div className="font-bold">{result.xai.feature_importance.vegetation_ndvi.contribution_score > 0 ? '+' : ''}{result.xai.feature_importance.vegetation_ndvi.contribution_score}</div>
                                    </div>
                                    <div className="bg-slate-900/50 rounded p-2 text-center">
                                      <div className="text-slate-400">Impact</div>
                                      <div className="font-bold capitalize">{result.xai.feature_importance.vegetation_ndvi.impact}</div>
                                    </div>
                                  </div>
                                  <p className="text-xs text-slate-200 bg-slate-900/50 rounded p-2">
                                    <Info className="w-3 h-3 inline mr-1" />
                                    {result.xai.feature_importance.vegetation_ndvi.interpretation}
                                  </p>
                                  <div className="mt-2 bg-slate-800 rounded-full h-2 overflow-hidden">
                                    <motion.div
                                      initial={{ width: 0 }}
                                      animate={{ width: `${result.xai.feature_importance.vegetation_ndvi.importance_percentage}%` }}
                                      transition={{ duration: 1 }}
                                      className="h-full bg-gradient-to-r from-green-500 to-emerald-500"
                                    />
                                  </div>
                                </div>

                                {/* NDWI */}
                                <div className={`border-2 rounded-lg p-4 ${getImpactColor(result.xai.feature_importance.water_content_ndwi.impact)}`}>
                                  <div className="flex items-center justify-between mb-2">
                                    <div className="flex items-center gap-2">
                                      <Activity className="w-4 h-4" />
                                      <span className="font-bold text-sm">Water Content (NDWI)</span>
                                    </div>
                                    <span className="text-xl font-black">{result.xai.feature_importance.water_content_ndwi.importance_percentage}%</span>
                                  </div>
                                  <div className="grid grid-cols-3 gap-2 mb-2 text-xs">
                                    <div className="bg-slate-900/50 rounded p-2 text-center">
                                      <div className="text-slate-400">Value</div>
                                      <div className="font-bold">{result.xai.feature_importance.water_content_ndwi.value.toFixed(3)}</div>
                                    </div>
                                    <div className="bg-slate-900/50 rounded p-2 text-center">
                                      <div className="text-slate-400">Score</div>
                                      <div className="font-bold">{result.xai.feature_importance.water_content_ndwi.contribution_score > 0 ? '+' : ''}{result.xai.feature_importance.water_content_ndwi.contribution_score}</div>
                                    </div>
                                    <div className="bg-slate-900/50 rounded p-2 text-center">
                                      <div className="text-slate-400">Impact</div>
                                      <div className="font-bold capitalize">{result.xai.feature_importance.water_content_ndwi.impact}</div>
                                    </div>
                                  </div>
                                  <p className="text-xs text-slate-200 bg-slate-900/50 rounded p-2">
                                    <Info className="w-3 h-3 inline mr-1" />
                                    {result.xai.feature_importance.water_content_ndwi.interpretation}
                                  </p>
                                  <div className="mt-2 bg-slate-800 rounded-full h-2 overflow-hidden">
                                    <motion.div
                                      initial={{ width: 0 }}
                                      animate={{ width: `${result.xai.feature_importance.water_content_ndwi.importance_percentage}%` }}
                                      transition={{ duration: 1, delay: 0.1 }}
                                      className="h-full bg-gradient-to-r from-blue-500 to-cyan-500"
                                    />
                                  </div>
                                </div>

                                {/* Elevation */}
                                <div className={`border-2 rounded-lg p-4 ${getImpactColor(result.xai.feature_importance.elevation_dem.impact)}`}>
                                  <div className="flex items-center justify-between mb-2">
                                    <div className="flex items-center gap-2">
                                      <Activity className="w-4 h-4" />
                                      <span className="font-bold text-sm">Elevation (DEM)</span>
                                    </div>
                                    <span className="text-xl font-black">{result.xai.feature_importance.elevation_dem.importance_percentage}%</span>
                                  </div>
                                  <div className="grid grid-cols-3 gap-2 mb-2 text-xs">
                                    <div className="bg-slate-900/50 rounded p-2 text-center">
                                      <div className="text-slate-400">Value</div>
                                      <div className="font-bold">{result.xai.feature_importance.elevation_dem.value.toFixed(1)}m</div>
                                    </div>
                                    <div className="bg-slate-900/50 rounded p-2 text-center">
                                      <div className="text-slate-400">Score</div>
                                      <div className="font-bold">{result.xai.feature_importance.elevation_dem.contribution_score > 0 ? '+' : ''}{result.xai.feature_importance.elevation_dem.contribution_score}</div>
                                    </div>
                                    <div className="bg-slate-900/50 rounded p-2 text-center">
                                      <div className="text-slate-400">Impact</div>
                                      <div className="font-bold capitalize">{result.xai.feature_importance.elevation_dem.impact}</div>
                                    </div>
                                  </div>
                                  <p className="text-xs text-slate-200 bg-slate-900/50 rounded p-2">
                                    <Info className="w-3 h-3 inline mr-1" />
                                    {result.xai.feature_importance.elevation_dem.interpretation}
                                  </p>
                                  <div className="mt-2 bg-slate-800 rounded-full h-2 overflow-hidden">
                                    <motion.div
                                      initial={{ width: 0 }}
                                      animate={{ width: `${result.xai.feature_importance.elevation_dem.importance_percentage}%` }}
                                      transition={{ duration: 1, delay: 0.2 }}
                                      className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>

                      {/* Scientific Validation - Always Visible */}
                      <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border-2 border-green-500/30 rounded-xl p-4">
                        <div className="flex items-center gap-3 mb-4">
                          <CheckCircle className="w-5 h-5 text-green-400" />
                          <span className="font-bold text-white">Scientific Validation</span>
                          <span className="text-xs text-green-400 bg-green-500/20 px-2 py-1 rounded-full">{result.xai.hydrogeological_validation.overall_status}</span>
                        </div>
                        
                        <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-3 mb-3">
                          <p className="text-xs text-slate-200">{result.xai.hydrogeological_validation.scientific_basis}</p>
                        </div>
                        <div className="space-y-2">
                          {result.xai.hydrogeological_validation.validations.map((validation, idx) => (
                            <div key={idx} className="bg-slate-800/50 border border-slate-700 rounded-lg p-3 flex items-start gap-2">
                              <span className="text-lg">{validation.status.includes('✅') ? '✅' : '⚠️'}</span>
                              <div className="flex-1">
                                <h4 className="font-bold text-white text-sm mb-1">{validation.principle}</h4>
                                <p className="text-xs text-slate-300">{validation.note}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Model Transparency - Always Visible */}
                      <div className="bg-gradient-to-br from-violet-500/10 to-purple-500/10 border-2 border-violet-500/30 rounded-xl p-4">
                        <div className="flex items-center gap-3 mb-4">
                          <Info className="w-5 h-5 text-violet-400" />
                          <span className="font-bold text-white">Model Transparency</span>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-3">
                          <div className="bg-slate-800/50 rounded-lg p-3">
                            <div className="text-xs text-slate-400 mb-1">Architecture</div>
                            <div className="text-sm font-bold text-white">{result.xai.model_transparency.architecture}</div>
                          </div>
                          <div className="bg-slate-800/50 rounded-lg p-3">
                            <div className="text-xs text-slate-400 mb-1">Test Accuracy</div>
                            <div className="text-sm font-bold text-green-400">{result.xai.model_transparency.test_accuracy}</div>
                          </div>
                          <div className="bg-slate-800/50 rounded-lg p-3">
                            <div className="text-xs text-slate-400 mb-1">F1 Score</div>
                            <div className="text-sm font-bold text-cyan-400">{result.xai.model_transparency.f1_score}</div>
                          </div>
                          <div className="bg-slate-800/50 rounded-lg p-3">
                            <div className="text-xs text-slate-400 mb-1">XAI Method</div>
                            <div className="text-sm font-bold text-indigo-400">SHAP-like</div>
                          </div>
                        </div>
                        <div className="mt-3 bg-slate-800/50 rounded-lg p-3">
                          <div className="text-xs text-slate-400 mb-1">Training Data</div>
                          <div className="text-xs text-white">{result.xai.model_transparency.training_data}</div>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Coordinates and Download */}
                  <div className="flex items-center justify-between gap-4 flex-wrap">
                    <div className="flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-slate-800/60 to-slate-900/60 rounded-xl border border-slate-700/50">
                      <MapPin className="w-5 h-5 text-cyan-400" />
                      <span className="text-sm text-slate-300 font-medium">
                        <span className="text-white font-bold">{result.location.lat.toFixed(4)}°N</span>
                        <span className="text-slate-500 mx-2">•</span>
                        <span className="text-white font-bold">{result.location.lon.toFixed(4)}°E</span>
                      </span>
                    </div>
                    <button className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 rounded-xl transition-all flex items-center gap-2 text-white font-bold shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50 hover:scale-105">
                      <Download className="w-5 h-5" />
                      Download Report
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default MapViewer
