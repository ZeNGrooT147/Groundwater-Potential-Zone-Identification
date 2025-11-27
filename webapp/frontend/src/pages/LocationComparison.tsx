import { useState } from 'react'
import axios from 'axios'
import { Target, MapPin, TrendingUp, Loader, AlertCircle, Medal, Zap, Award } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface Location {
  lat: string
  lon: string
  name: string
}

interface ComparisonResult {
  name: string
  location: { lat: number; lon: number }
  gwp_class?: string
  metrics?: {
    ndvi: number
    ndwi: number
    elevation: number
  }
  scores?: {
    overall: number
    gwp: number
    vegetation: number
    water_content: number
    elevation: number
  }
  conclusion?: string
  rank?: number
  error?: string
}

const LocationComparison = () => {
  const [locations, setLocations] = useState<Location[]>([
    { lat: '', lon: '', name: 'Location 1' }
  ])
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState<ComparisonResult[] | null>(null)
  const [error, setError] = useState('')

  const addLocation = () => {
    if (locations.length < 5) {
      setLocations([...locations, { lat: '', lon: '', name: `Location ${locations.length + 1}` }])
    }
  }

  const removeLocation = (index: number) => {
    if (locations.length > 1) {
      setLocations(locations.filter((_, i) => i !== index))
    }
  }

  const updateLocation = (index: number, field: keyof Location, value: string) => {
    const updated = [...locations]
    updated[index][field] = value
    setLocations(updated)
  }

  const handleCompare = async () => {
    // Validate inputs
    const validLocations = locations.filter(loc => loc.lat && loc.lon)
    
    if (validLocations.length < 2) {
      setError('Please enter at least 2 locations to compare')
      return
    }

    setLoading(true)
    setError('')

    try {
      const response = await axios.post('http://localhost:5000/api/comparison', {
        locations: validLocations.map(loc => ({
          lat: parseFloat(loc.lat),
          lon: parseFloat(loc.lon),
          name: loc.name
        }))
      })
      setResults(response.data.comparisons)
    } catch (err) {
      setError('Failed to compare locations. Make sure Flask backend is running.')
      console.error('API Error:', err)
    } finally {
      setLoading(false)
    }
  }

  const getGWPColor = (gwpClass?: string) => {
    switch (gwpClass?.toLowerCase()) {
      case 'high': return 'text-green-400'
      case 'moderate': return 'text-yellow-400'
      case 'low': return 'text-red-400'
      default: return 'text-slate-400'
    }
  }

  const getGWPBg = (gwpClass?: string) => {
    switch (gwpClass?.toLowerCase()) {
      case 'high': return 'bg-green-500/20 border-green-500/50'
      case 'moderate': return 'bg-yellow-500/20 border-yellow-500/50'
      case 'low': return 'bg-red-500/20 border-red-500/50'
      default: return 'bg-slate-500/20 border-slate-500/50'
    }
  }

  const getRankBadge = (rank?: number) => {
    if (rank === 1) return <Medal className="w-6 h-6 text-yellow-400" />
    if (rank === 2) return <Award className="w-6 h-6 text-slate-300" />
    if (rank === 3) return <Zap className="w-6 h-6 text-amber-600" />
    return <Target className="w-6 h-6 text-slate-500" />
  }

  return (
    <div className="min-h-screen pt-32 pb-16 px-6 bg-slate-950 relative overflow-hidden">
      {/* Background Effects */}
      <div className="fixed inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAgTSAwIDIwIEwgNDAgMjAgTSAyMCAwIEwgMjAgNDAgTSAwIDMwIEwgNDAgMzAgTSAzMCAwIEwgMzAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzFhMjMzYSIgb3BhY2l0eT0iMC4zIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-50" />
      <div className="fixed inset-0 bg-gradient-to-br from-orange-900/8 via-transparent to-yellow-900/8 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 text-center"
        >
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-orange-500/20 to-yellow-500/20 border-2 border-orange-500/40 rounded-full mb-6"
          >
            <Target className="w-5 h-5 text-orange-400" />
            <span className="text-base font-bold bg-gradient-to-r from-orange-300 to-yellow-400 bg-clip-text text-transparent">Side-by-Side Comparison</span>
          </motion.div>
          <h1 className="text-5xl md:text-6xl font-black mb-4 bg-gradient-to-r from-white via-orange-100 to-yellow-200 bg-clip-text text-transparent">
            Location Comparison
          </h1>
          <p className="text-slate-300 text-lg max-w-2xl mx-auto">
            Compare up to 5 locations to find the best groundwater potential site
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Input Panel */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-gradient-to-br from-slate-900/95 to-slate-800/95 backdrop-blur-xl border-2 border-slate-700/50 p-8 rounded-2xl"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-yellow-600 rounded-xl flex items-center justify-center">
                <MapPin className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-white">Enter Locations</h2>
            </div>

            <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
              {locations.map((loc, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-slate-800/50 border border-slate-700 rounded-xl p-4"
                >
                  <div className="flex items-center justify-between mb-3">
                    <input
                      type="text"
                      value={loc.name}
                      onChange={(e) => updateLocation(idx, 'name', e.target.value)}
                      className="bg-slate-900/50 border border-slate-600 text-white px-3 py-2 rounded-lg text-sm font-semibold focus:border-orange-500 focus:outline-none flex-1 mr-2"
                      placeholder="Location name"
                    />
                    {locations.length > 1 && (
                      <button
                        onClick={() => removeLocation(idx)}
                        className="text-red-400 hover:text-red-300 px-2 py-1"
                      >
                        ✕
                      </button>
                    )}
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs text-slate-400 mb-1 block">Latitude</label>
                      <input
                        type="number"
                        step="0.0001"
                        value={loc.lat}
                        onChange={(e) => updateLocation(idx, 'lat', e.target.value)}
                        className="w-full bg-slate-900/50 border border-slate-600 text-white px-3 py-2 rounded-lg text-sm focus:border-orange-500 focus:outline-none"
                        placeholder="15.xxxx"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-slate-400 mb-1 block">Longitude</label>
                      <input
                        type="number"
                        step="0.0001"
                        value={loc.lon}
                        onChange={(e) => updateLocation(idx, 'lon', e.target.value)}
                        className="w-full bg-slate-900/50 border border-slate-600 text-white px-3 py-2 rounded-lg text-sm focus:border-orange-500 focus:outline-none"
                        placeholder="74.xxxx"
                      />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-6 space-y-3">
              {locations.length < 5 && (
                <button
                  onClick={addLocation}
                  className="w-full py-3 border-2 border-dashed border-slate-600 hover:border-orange-500 text-slate-400 hover:text-orange-400 rounded-xl transition-colors font-semibold"
                >
                  + Add Location (Max 5)
                </button>
              )}

              {/* Error Display */}
              <AnimatePresence>
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="bg-red-500/10 border border-red-500/50 text-red-400 px-4 py-3 rounded-xl flex items-center gap-2"
                  >
                    <AlertCircle className="w-5 h-5" />
                    {error}
                  </motion.div>
                )}
              </AnimatePresence>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleCompare}
                disabled={loading}
                className="w-full py-4 bg-gradient-to-r from-orange-600 to-yellow-600 hover:from-orange-700 hover:to-yellow-700 disabled:from-slate-700 disabled:to-slate-700 text-white font-bold rounded-xl shadow-lg disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader className="w-5 h-5 animate-spin" />
                    Comparing...
                  </>
                ) : (
                  <>
                    <TrendingUp className="w-5 h-5" />
                    Compare Locations
                  </>
                )}
              </motion.button>
            </div>
          </motion.div>

          {/* Results Panel */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-gradient-to-br from-slate-900/95 to-slate-800/95 backdrop-blur-xl border-2 border-slate-700/50 p-8 rounded-2xl"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center">
                <Medal className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-white">Comparison Results</h2>
            </div>

            {!results ? (
              <div className="flex flex-col items-center justify-center h-96 text-slate-400">
                <Target className="w-16 h-16 mb-4 opacity-50" />
                <p className="text-center">Compare locations to see which has the best groundwater potential</p>
              </div>
            ) : (
              <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
                {results.map((result, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: idx * 0.1 }}
                    className={`${getGWPBg(result.gwp_class)} border-2 rounded-xl p-5 relative`}
                  >
                    {/* Rank Badge */}
                    <div className="absolute -top-3 -right-3 w-12 h-12 bg-slate-800 border-2 border-current rounded-full flex items-center justify-center">
                      {getRankBadge(result.rank)}
                    </div>

                    {/* Location Header */}
                    <div className="mb-4">
                      <h3 className="text-xl font-bold text-white mb-1">{result.name}</h3>
                      <div className="flex items-center gap-2 text-sm text-slate-400">
                        <MapPin className="w-3 h-3" />
                        {result.location.lat.toFixed(4)}, {result.location.lon.toFixed(4)}
                      </div>
                    </div>

                    {result.error ? (
                      <div className="text-red-400 flex items-center gap-2">
                        <AlertCircle className="w-5 h-5" />
                        {result.error}
                      </div>
                    ) : (
                      <>
                        {/* Overall Score */}
                        <div className="mb-4 text-center">
                          <div className="text-5xl font-black bg-gradient-to-r from-white to-cyan-200 bg-clip-text text-transparent mb-1">
                            {result.scores?.overall.toFixed(1)}
                          </div>
                          <div className="text-sm text-slate-400">Overall Score</div>
                        </div>

                        {/* GWP Class */}
                        <div className="mb-4 text-center">
                          <span className={`text-2xl font-bold ${getGWPColor(result.gwp_class)}`}>
                            {result.gwp_class} Potential
                          </span>
                        </div>

                        {/* Score Breakdown */}
                        <div className="grid grid-cols-2 gap-3 mb-4">
                          <div className="bg-slate-800/50 rounded-lg p-3">
                            <div className="text-xs text-slate-400 mb-1">Vegetation</div>
                            <div className="text-lg font-bold text-green-400">
                              {result.scores?.vegetation.toFixed(0)}
                            </div>
                          </div>
                          <div className="bg-slate-800/50 rounded-lg p-3">
                            <div className="text-xs text-slate-400 mb-1">Water Content</div>
                            <div className="text-lg font-bold text-blue-400">
                              {result.scores?.water_content.toFixed(0)}
                            </div>
                          </div>
                          <div className="bg-slate-800/50 rounded-lg p-3">
                            <div className="text-xs text-slate-400 mb-1">Elevation</div>
                            <div className="text-lg font-bold text-purple-400">
                              {result.scores?.elevation.toFixed(0)}
                            </div>
                          </div>
                          <div className="bg-slate-800/50 rounded-lg p-3">
                            <div className="text-xs text-slate-400 mb-1">GWP Score</div>
                            <div className="text-lg font-bold text-yellow-400">
                              {result.scores?.gwp}
                            </div>
                          </div>
                        </div>

                        {/* Metrics */}
                        <div className="grid grid-cols-3 gap-2 text-xs mb-4">
                          <div className="bg-slate-900/50 rounded p-2 text-center">
                            <div className="text-slate-400">NDVI</div>
                            <div className="text-white font-semibold">{result.metrics?.ndvi.toFixed(3)}</div>
                          </div>
                          <div className="bg-slate-900/50 rounded p-2 text-center">
                            <div className="text-slate-400">NDWI</div>
                            <div className="text-white font-semibold">{result.metrics?.ndwi.toFixed(3)}</div>
                          </div>
                          <div className="bg-slate-900/50 rounded p-2 text-center">
                            <div className="text-slate-400">Elevation</div>
                            <div className="text-white font-semibold">{result.metrics?.elevation.toFixed(0)}m</div>
                          </div>
                        </div>

                        {/* Conclusion */}
                        <div className="bg-slate-900/50 border border-slate-700 rounded-lg p-3 text-sm text-slate-200">
                          {result.conclusion}
                        </div>
                      </>
                    )}
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default LocationComparison
