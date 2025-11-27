import { useState } from 'react'
import axios from 'axios'
import { MapPin, Upload, Download, Loader, Map, TrendingUp, AlertCircle, CheckCircle } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface BatchLocation {
  lat: number
  lon: number
  name?: string
}

interface BatchResult {
  location: { lat: number; lon: number }
  gwp_class?: string
  confidence?: number
  ndvi?: number
  ndwi?: number
  elevation?: number
  error?: string
}

const BatchAnalysis = () => {
  const [coordinates, setCoordinates] = useState<BatchLocation[]>([])
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState<BatchResult[] | null>(null)
  const [error, setError] = useState('')

  const parseCsvCoordinates = (text: string) => {
    const lines = text.trim().split('\n')
    const coords: BatchLocation[] = []
    
    // Skip header if exists
    const startIdx = lines[0].toLowerCase().includes('lat') ? 1 : 0
    
    for (let i = startIdx; i < lines.length; i++) {
      const parts = lines[i].split(',').map(p => p.trim())
      if (parts.length >= 2) {
        const lat = parseFloat(parts[0])
        const lon = parseFloat(parts[1])
        const name = parts[2] || `Location ${i + 1}`
        
        if (!isNaN(lat) && !isNaN(lon)) {
          coords.push({ lat, lon, name })
        }
      }
    }
    
    return coords
  }

  const handleCsvUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        const text = event.target?.result as string
        const coords = parseCsvCoordinates(text)
        setCoordinates(coords)
        setError(coords.length === 0 ? 'No valid coordinates found in CSV' : '')
      }
      reader.readAsText(file)
    }
  }

  const handleAnalyze = async () => {
    if (coordinates.length === 0) {
      setError('Please upload a CSV file with coordinates')
      return
    }

    if (coordinates.length > 50) {
      setError('Maximum 50 locations allowed per batch')
      return
    }

    setLoading(true)
    setError('')

    try {
      const response = await axios.post('http://localhost:5000/api/batch-predict', {
        coordinates: coordinates.map(c => ({ lat: c.lat, lon: c.lon }))
      })
      setResults(response.data.results)
    } catch (err) {
      setError('Failed to analyze coordinates. Make sure Flask backend is running.')
      console.error('API Error:', err)
    } finally {
      setLoading(false)
    }
  }

  const downloadResults = () => {
    if (!results) return

    const csvContent = [
      ['Latitude', 'Longitude', 'GWP Class', 'Confidence', 'NDVI', 'NDWI', 'Elevation', 'Status'].join(','),
      ...results.map(r => [
        r.location.lat,
        r.location.lon,
        r.gwp_class || 'N/A',
        r.confidence || 'N/A',
        r.ndvi || 'N/A',
        r.ndwi || 'N/A',
        r.elevation || 'N/A',
        r.error || 'Success'
      ].join(','))
    ].join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `gwp_batch_results_${new Date().getTime()}.csv`
    a.click()
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

  const summary = results ? {
    total: results.length,
    high: results.filter(r => r.gwp_class === 'High').length,
    moderate: results.filter(r => r.gwp_class === 'Moderate').length,
    low: results.filter(r => r.gwp_class === 'Low').length,
    errors: results.filter(r => r.error).length
  } : null

  return (
    <div className="min-h-screen pt-32 pb-16 px-6 bg-slate-950 relative overflow-hidden">
      {/* Background Effects */}
      <div className="fixed inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAgTSAwIDIwIEwgNDAgMjAgTSAyMCAwIEwgMjAgNDAgTSAwIDMwIEwgNDAgMzAgTSAzMCAwIEwgMzAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzFhMjMzYSIgb3BhY2l0eT0iMC4zIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-50" />
      <div className="fixed inset-0 bg-gradient-to-br from-purple-900/8 via-transparent to-pink-900/8 pointer-events-none" />

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
            className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border-2 border-purple-500/40 rounded-full mb-6"
          >
            <Upload className="w-5 h-5 text-purple-400" />
            <span className="text-base font-bold bg-gradient-to-r from-purple-300 to-pink-400 bg-clip-text text-transparent">Batch Processing</span>
          </motion.div>
          <h1 className="text-5xl md:text-6xl font-black mb-4 bg-gradient-to-r from-white via-purple-100 to-pink-200 bg-clip-text text-transparent">
            Batch Groundwater Analysis
          </h1>
          <p className="text-slate-300 text-lg max-w-2xl mx-auto">
            Upload CSV files with multiple coordinates and analyze groundwater potential in bulk
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Upload Panel */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-gradient-to-br from-slate-900/95 to-slate-800/95 backdrop-blur-xl border-2 border-slate-700/50 p-8 rounded-2xl"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center">
                <Upload className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-white">Upload Coordinates</h2>
            </div>

            <div className="space-y-6">
              {/* CSV Format Guide */}
              <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-4">
                <h3 className="text-sm font-semibold text-purple-400 mb-2">CSV Format:</h3>
                <code className="text-xs text-slate-300 block whitespace-pre">
                  latitude,longitude,name{'\n'}
                  15.4589,74.9876,Farm 1{'\n'}
                  15.4623,75.0012,Farm 2
                </code>
              </div>

              {/* File Upload */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Upload CSV File (Max 50 locations)
                </label>
                <input
                  type="file"
                  accept=".csv"
                  onChange={handleCsvUpload}
                  className="w-full px-4 py-3 bg-slate-800/50 border-2 border-slate-700 rounded-xl text-white focus:border-purple-500 focus:outline-none transition-colors"
                />
              </div>

              {/* Coordinates Preview */}
              {coordinates.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="bg-slate-800/50 border border-slate-700 rounded-xl p-4 max-h-64 overflow-y-auto"
                >
                  <h3 className="text-sm font-semibold text-purple-400 mb-3">
                    Loaded {coordinates.length} locations
                  </h3>
                  <div className="space-y-2">
                    {coordinates.slice(0, 10).map((coord, idx) => (
                      <div key={idx} className="text-xs text-slate-300 flex items-center gap-2">
                        <MapPin className="w-3 h-3 text-purple-400" />
                        {coord.name}: {coord.lat.toFixed(4)}, {coord.lon.toFixed(4)}
                      </div>
                    ))}
                    {coordinates.length > 10 && (
                      <div className="text-xs text-slate-400 italic">
                        ...and {coordinates.length - 10} more
                      </div>
                    )}
                  </div>
                </motion.div>
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

              {/* Analyze Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleAnalyze}
                disabled={loading || coordinates.length === 0}
                className="w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:from-slate-700 disabled:to-slate-700 text-white font-bold rounded-xl shadow-lg disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader className="w-5 h-5 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <TrendingUp className="w-5 h-5" />
                    Analyze All Locations
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
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center">
                  <Map className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-white">Results</h2>
              </div>
              {results && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={downloadResults}
                  className="px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white rounded-lg flex items-center gap-2 text-sm font-semibold"
                >
                  <Download className="w-4 h-4" />
                  Export CSV
                </motion.button>
              )}
            </div>

            {!results ? (
              <div className="flex flex-col items-center justify-center h-96 text-slate-400">
                <Map className="w-16 h-16 mb-4 opacity-50" />
                <p className="text-center">Upload and analyze coordinates to see results</p>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Summary Cards */}
                {summary && (
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-3">
                      <div className="text-2xl font-bold text-green-400">{summary.high}</div>
                      <div className="text-xs text-slate-300">High Potential</div>
                    </div>
                    <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-3">
                      <div className="text-2xl font-bold text-yellow-400">{summary.moderate}</div>
                      <div className="text-xs text-slate-300">Moderate</div>
                    </div>
                    <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3">
                      <div className="text-2xl font-bold text-red-400">{summary.low}</div>
                      <div className="text-xs text-slate-300">Low Potential</div>
                    </div>
                    <div className="bg-slate-500/10 border border-slate-500/30 rounded-lg p-3">
                      <div className="text-2xl font-bold text-slate-400">{summary.errors}</div>
                      <div className="text-xs text-slate-300">Errors</div>
                    </div>
                  </div>
                )}

                {/* Results List */}
                <div className="max-h-96 overflow-y-auto space-y-3 pr-2">
                  {results.map((result, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      className={`${getGWPBg(result.gwp_class)} border-2 rounded-xl p-4`}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-slate-400" />
                          <span className="text-sm text-slate-300">
                            {result.location.lat.toFixed(4)}, {result.location.lon.toFixed(4)}
                          </span>
                        </div>
                        {result.error ? (
                          <AlertCircle className="w-5 h-5 text-red-400" />
                        ) : (
                          <CheckCircle className="w-5 h-5 text-green-400" />
                        )}
                      </div>
                      {result.error ? (
                        <p className="text-red-400 text-sm">{result.error}</p>
                      ) : (
                        <div className="grid grid-cols-2 gap-2 text-xs">
                          <div>
                            <span className="text-slate-400">GWP: </span>
                            <span className={`font-bold ${getGWPColor(result.gwp_class)}`}>
                              {result.gwp_class}
                            </span>
                          </div>
                          <div>
                            <span className="text-slate-400">Confidence: </span>
                            <span className="text-white font-semibold">
                              {((result.confidence || 0) * 100).toFixed(0)}%
                            </span>
                          </div>
                          <div>
                            <span className="text-slate-400">NDVI: </span>
                            <span className="text-white">{result.ndvi?.toFixed(3)}</span>
                          </div>
                          <div>
                            <span className="text-slate-400">NDWI: </span>
                            <span className="text-white">{result.ndwi?.toFixed(3)}</span>
                          </div>
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default BatchAnalysis
