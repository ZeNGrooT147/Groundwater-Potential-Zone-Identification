import { useState } from 'react'
import axios from 'axios'
import { motion, AnimatePresence } from 'framer-motion'
import { MapContainer, TileLayer, Marker, Popup, useMapEvents, useMap } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { 
  TrendingUp, 
  Target, 
  Droplets, 
  Sprout, 
  AlertTriangle, 
  CloudRain,
  Calendar,
  Loader,
  MapPin,
  ChevronRight,
  Download,
  Info,
  Users,
  Layers,
  DollarSign,
  Navigation,
  Play,
  FileCheck,
  Bell,
  Cloud,
  Home
} from 'lucide-react'

// Fix Leaflet default marker icon
delete (L.Icon.Default.prototype as any)._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
})

// Map click handler component
function LocationPicker({ onLocationSelect }: { onLocationSelect: (lat: number, lon: number) => void }) {
  useMapEvents({
    click(e) {
      onLocationSelect(e.latlng.lat, e.latlng.lng)
    },
  })
  return null
}

// Reset map to Dharwad center
function ResetMapView({ onReset }: { onReset: () => void }) {
  const map = useMap()
  
  const handleReset = () => {
    map.setView([15.45, 75.0], 10)
    onReset()
  }

  return (
    <button
      onClick={handleReset}
      className="absolute top-4 right-4 z-[1000] px-4 py-2 bg-slate-800/95 hover:bg-slate-700/95 border-2 border-cyan-500/50 hover:border-cyan-400 rounded-lg font-semibold text-white text-sm flex items-center gap-2 shadow-lg hover:shadow-cyan-500/30 transition-all"
      title="Reset to Dharwad center"
    >
      <Home className="w-4 h-4" />
      Back to Dharwad
    </button>
  )
}

const AdvancedFeatures = () => {
  const [activeFeature, setActiveFeature] = useState<string | null>(null)
  const [lat, setLat] = useState('')
  const [lon, setLon] = useState('')
  const [markerPosition, setMarkerPosition] = useState<[number, number] | null>(null)
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<any>(null)
  const [error, setError] = useState('')

  // Feature-specific inputs
  const [months, setMonths] = useState(12)
  const [radius, setRadius] = useState(0.5)
  const [rainfall, setRainfall] = useState(100)
  const [investment, setInvestment] = useState(100000)
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [days, setDays] = useState(7)

  const handleMapClick = (latitude: number, longitude: number) => {
    setLat(latitude.toFixed(4))
    setLon(longitude.toFixed(4))
    setMarkerPosition([latitude, longitude])
    setError('')
  }

  const handleResetMap = () => {
    setLat('')
    setLon('')
    setMarkerPosition(null)
    setError('')
    setResult(null)
  }

  const handleDownloadReport = async () => {
    if (!result || !lat || !lon) {
      setError('No analysis results to download')
      return
    }

    try {
      // Create a comprehensive report data object
      const reportData = {
        lat: parseFloat(lat),
        lon: parseFloat(lon),
        feature_type: result.featureId,
        analysis_results: result,
        timestamp: new Date().toISOString()
      }

      // For now, we'll use the existing download-report endpoint
      // You can create a new endpoint specifically for advanced features if needed
      const response = await axios.post(
        'http://localhost:5000/api/download-advanced-report',
        reportData,
        { responseType: 'blob' }
      )

      const url = window.URL.createObjectURL(new Blob([response.data]))
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', `${result.featureId}_analysis_${lat}_${lon}.pdf`)
      document.body.appendChild(link)
      link.click()
      link.remove()
      window.URL.revokeObjectURL(url)
    } catch (err: any) {
      console.error('Download Error:', err)
      setError('Failed to download report. Please try again.')
    }
  }

  const features = [
    {
      id: 'temporal',
      title: 'Temporal Analysis',
      icon: TrendingUp,
      color: 'from-blue-500 to-cyan-500',
      description: 'Track groundwater changes over time',
      endpoint: '/api/temporal-analysis',
      inputs: ['months']
    },
    {
      id: 'borewell',
      title: 'Smart Borewell',
      icon: Target,
      color: 'from-purple-500 to-pink-500',
      description: 'Find optimal drilling locations',
      endpoint: '/api/borewell-recommendation',
      inputs: ['radius']
    },
    {
      id: 'recharge',
      title: 'Recharge Zones',
      icon: Droplets,
      color: 'from-green-500 to-emerald-500',
      description: 'Identify rainwater harvesting spots',
      endpoint: '/api/recharge-zones',
      inputs: []
    },
    {
      id: 'crops',
      title: 'Crop Suitability',
      icon: Sprout,
      color: 'from-yellow-500 to-orange-500',
      description: 'Recommend crops for water availability',
      endpoint: '/api/crop-suitability',
      inputs: []
    },
    {
      id: 'aquifer3d',
      title: '3D Aquifer Visualization',
      icon: Layers,
      color: 'from-purple-600 to-blue-600',
      description: 'Underground water layers in 3D',
      endpoint: '/api/aquifer-3d',
      inputs: [],
      badge: 'Visual'
    },
    {
      id: 'timelapse',
      title: 'Satellite Time-Lapse',
      icon: Play,
      color: 'from-orange-500 to-red-500',
      description: 'NDVI/NDWI animation over time',
      endpoint: '/api/satellite-timelapse',
      inputs: ['months'],
      badge: 'Visual'
    },
    {
      id: 'forecast',
      title: 'Precipitation Forecasting',
      icon: Cloud,
      color: 'from-blue-600 to-indigo-600',
      description: 'Weather API integration',
      endpoint: '/api/precipitation-forecast',
      inputs: ['days']
    }
  ]

  const handleAnalyze = async (feature: any) => {
    if (!lat || !lon) {
      setError('Please enter coordinates')
      return
    }

    setLoading(true)
    setError('')
    setResult(null)

    try {
      const payload: any = {
        lat: parseFloat(lat),
        lon: parseFloat(lon)
      }

      if (feature.inputs.includes('months')) payload.months = months
      if (feature.inputs.includes('radius')) payload.radius = radius
      if (feature.inputs.includes('rainfall')) payload.rainfall = rainfall
      if (feature.inputs.includes('investment')) payload.investment = investment
      if (feature.inputs.includes('email')) payload.email = email
      if (feature.inputs.includes('phone')) payload.phone = phone
      if (feature.inputs.includes('days')) payload.days = days

      const response = await axios.post(`http://localhost:5000${feature.endpoint}`, payload)
      setResult({ ...response.data, featureId: feature.id })
    } catch (err: any) {
      setError(err.response?.data?.error || 'Analysis failed')
    } finally {
      setLoading(false)
    }
  }

  const renderResults = () => {
    if (!result) return null

    const featureId = result.featureId

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-8 bg-gradient-to-br from-slate-900/95 to-slate-800/95 border-2 border-cyan-500/30 p-8 rounded-2xl"
      >
        {/* Temporal Analysis Results */}
        {featureId === 'temporal' && (
          <div>
            <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
              <Calendar className="w-7 h-7 text-cyan-400" />
              Historical Trends
            </h3>
            <div className="grid md:grid-cols-3 gap-4 mb-6">
              <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700">
                <div className="text-sm text-slate-400">Current Status</div>
                <div className="text-2xl font-bold text-white mt-1">{result.current_status}</div>
              </div>
              <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700">
                <div className="text-sm text-slate-400">Trend</div>
                <div className={`text-2xl font-bold mt-1 ${
                  result.trend === 'improving' ? 'text-green-400' : 
                  result.trend === 'declining' ? 'text-red-400' : 'text-yellow-400'
                }`}>
                  {result.trend.toUpperCase()}
                </div>
              </div>
              <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700">
                <div className="text-sm text-slate-400">Change</div>
                <div className="text-2xl font-bold text-white mt-1">{result.change_percent}%</div>
              </div>
            </div>
            <div className="bg-cyan-500/10 border border-cyan-500/30 p-4 rounded-xl">
              <p className="text-sm text-cyan-100">{result.analysis}</p>
            </div>
          </div>
        )}

        {/* Borewell Recommendation Results */}
        {featureId === 'borewell' && (
          <div>
            <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
              <Target className="w-7 h-7 text-purple-400" />
              Borewell Recommendations
            </h3>
            {result.best_location && (
              <div className="mb-6 p-6 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border-2 border-purple-500/50 rounded-xl">
                <div className="text-lg font-bold text-purple-300 mb-4">🎯 Best Location Found</div>
                <div className="grid md:grid-cols-4 gap-4">
                  <div className="bg-slate-900/50 p-3 rounded-lg">
                    <div className="text-xs text-slate-400">Success Probability</div>
                    <div className="text-xl font-bold text-green-400">{result.best_location.success_probability}%</div>
                  </div>
                  <div className="bg-slate-900/50 p-3 rounded-lg">
                    <div className="text-xs text-slate-400">Estimated Depth</div>
                    <div className="text-xl font-bold text-white">{result.best_location.estimated_depth_ft} ft</div>
                  </div>
                  <div className="bg-slate-900/50 p-3 rounded-lg">
                    <div className="text-xs text-slate-400">Estimated Cost</div>
                    <div className="text-xl font-bold text-yellow-400">₹{(result.best_location.estimated_cost / 1000).toFixed(1)}K</div>
                  </div>
                  <div className="bg-slate-900/50 p-3 rounded-lg">
                    <div className="text-xs text-slate-400">GWP Status</div>
                    <div className="text-xl font-bold text-cyan-400">{result.best_location.gwp_class}</div>
                  </div>
                </div>
              </div>
            )}
            <div className="space-y-3">
              <div className="text-sm font-bold text-slate-300">Alternative Locations:</div>
              {result.recommendations.slice(1, 4).map((loc: any, idx: number) => (
                <div key={idx} className="bg-slate-800/50 p-3 rounded-lg border border-slate-700 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center">
                      <span className="text-purple-400 font-bold">#{idx + 2}</span>
                    </div>
                    <div>
                      <div className="text-sm text-white">Lat: {loc.lat.toFixed(4)}, Lon: {loc.lon.toFixed(4)}</div>
                      <div className="text-xs text-slate-400">{loc.gwp_class} GWP • {loc.estimated_depth_ft}ft depth</div>
                    </div>
                  </div>
                  <div className="text-sm font-bold text-green-400">{loc.success_probability}%</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Recharge Zones Results */}
        {featureId === 'recharge' && (
          <div>
            <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
              <Droplets className="w-7 h-7 text-green-400" />
              Recharge Potential Analysis
            </h3>
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 border-2 border-green-500/50 p-6 rounded-xl">
                <div className="text-sm text-green-300 mb-2">Recharge Potential</div>
                <div className="text-4xl font-black text-green-400 mb-4">{result.recharge_potential}</div>
                <div className="text-lg font-bold text-white">Score: {result.recharge_score}/100</div>
              </div>
              <div className="space-y-3">
                <div className="text-sm font-bold text-slate-300">Influencing Factors:</div>
                <div className="bg-slate-800/50 p-3 rounded-lg border border-slate-700">
                  <div className="text-xs text-slate-400">Vegetation Cover</div>
                  <div className="text-sm font-bold text-white">{result.factors.vegetation}</div>
                </div>
                <div className="bg-slate-800/50 p-3 rounded-lg border border-slate-700">
                  <div className="text-xs text-slate-400">Terrain</div>
                  <div className="text-sm font-bold text-white">{result.factors.elevation}</div>
                </div>
                <div className="bg-slate-800/50 p-3 rounded-lg border border-slate-700">
                  <div className="text-xs text-slate-400">Soil Moisture</div>
                  <div className="text-sm font-bold text-white">{result.factors.soil_moisture}</div>
                </div>
              </div>
            </div>
            <div className="bg-green-500/10 border border-green-500/30 p-4 rounded-xl mb-4">
              <div className="text-sm font-bold text-green-300 mb-2">Recommended Structures:</div>
              <div className="flex flex-wrap gap-2">
                {result.recommended_structures.map((structure: string, idx: number) => (
                  <span key={idx} className="px-3 py-1 bg-green-500/20 text-green-300 rounded-full text-sm border border-green-500/30">
                    {structure}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Crop Suitability Results */}
        {featureId === 'crops' && (
          <div>
            <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
              <Sprout className="w-7 h-7 text-yellow-400" />
              Crop Recommendations
            </h3>
            <div className="mb-6 bg-yellow-500/10 border border-yellow-500/30 p-4 rounded-xl">
              <div className="text-sm text-yellow-300 mb-1">Irrigation Strategy</div>
              <div className="text-base font-bold text-white">{result.irrigation_advice}</div>
            </div>
            <div className="space-y-3">
              {result.suitable_crops.map((crop: any, idx: number) => (
                <div key={idx} className="bg-gradient-to-r from-slate-800/50 to-slate-900/50 p-4 rounded-xl border border-slate-700 hover:border-yellow-500/30 transition-all">
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-lg font-bold text-white">{crop.name}</div>
                    <div className="px-3 py-1 bg-yellow-500/20 text-yellow-300 rounded-full text-xs font-bold">
                      {crop.water_req} Water
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <span className="text-slate-400">Yield: </span>
                      <span className="text-white font-semibold">{crop.yield}</span>
                    </div>
                    <div>
                      <span className="text-slate-400">Profit: </span>
                      <span className="text-green-400 font-semibold">{crop.profit}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Drought Risk Results */}
        {featureId === 'drought' && (
          <div>
            <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
              <AlertTriangle className="w-7 h-7 text-red-400" />
              Drought Risk Assessment
            </h3>
            <div className="grid md:grid-cols-3 gap-4 mb-6">
              <div className={`p-6 rounded-xl border-2 ${
                result.risk_level === 'Critical' ? 'bg-red-500/20 border-red-500/50' :
                result.risk_level === 'High' ? 'bg-orange-500/20 border-orange-500/50' :
                'bg-yellow-500/20 border-yellow-500/50'
              }`}>
                <div className="text-sm text-slate-300 mb-2">Risk Level</div>
                <div className={`text-3xl font-black ${
                  result.risk_level === 'Critical' ? 'text-red-400' :
                  result.risk_level === 'High' ? 'text-orange-400' :
                  'text-yellow-400'
                }`}>
                  {result.risk_level}
                </div>
              </div>
              <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700">
                <div className="text-sm text-slate-400 mb-2">Risk Score</div>
                <div className="text-3xl font-black text-white">{result.risk_score}/100</div>
              </div>
              <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700">
                <div className="text-sm text-slate-400 mb-2">Time to Crisis</div>
                <div className="text-3xl font-black text-cyan-400">{result.estimated_days_to_crisis} days</div>
              </div>
            </div>
            <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-xl mb-4">
              <div className="text-sm font-bold text-red-300 mb-3">Immediate Actions Required:</div>
              <div className="space-y-2">
                {result.recommendations.map((rec: string, idx: number) => (
                  <div key={idx} className="flex items-start gap-2 text-sm text-red-100">
                    <ChevronRight className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
                    <span>{rec}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Rainfall Impact Results */}
        {featureId === 'rainfall' && (
          <div>
            <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
              <CloudRain className="w-7 h-7 text-indigo-400" />
              Rainfall Impact Simulation
            </h3>
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700">
                <div className="text-sm font-bold text-slate-300 mb-4">Current Status</div>
                <div className="text-3xl font-black text-yellow-400">{result.current_status.gwp_class}</div>
                <div className="text-sm text-slate-400 mt-2">GWP Value: {result.current_status.gwp_value}</div>
              </div>
              <div className="bg-gradient-to-br from-indigo-500/20 to-violet-500/20 p-6 rounded-xl border-2 border-indigo-500/50">
                <div className="text-sm font-bold text-indigo-300 mb-4">After {rainfall}mm Rainfall</div>
                <div className="text-3xl font-black text-green-400">{result.after_rainfall.gwp_class}</div>
                <div className="text-sm text-indigo-200 mt-2">Improvement: +{result.after_rainfall.improvement}</div>
              </div>
            </div>
            <div className="grid md:grid-cols-3 gap-4 mb-4">
              <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700">
                <div className="text-xs text-slate-400">Recharge Amount</div>
                <div className="text-xl font-bold text-cyan-400">{result.recharge_mm}mm</div>
              </div>
              <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700">
                <div className="text-xs text-slate-400">Recharge Rate</div>
                <div className="text-xl font-bold text-white">{result.recharge_rate_percent}%</div>
              </div>
              <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700">
                <div className="text-xs text-slate-400">Recharge Time</div>
                <div className="text-xl font-bold text-green-400">{result.recharge_time_days} days</div>
              </div>
            </div>
            {result.rainfall_deficit_mm > 0 && (
              <div className="bg-orange-500/10 border border-orange-500/30 p-4 rounded-xl">
                <div className="text-sm text-orange-300">
                  ⚠️ Additional {result.rainfall_deficit_mm}mm rainfall needed to reach "High" groundwater potential
                </div>
              </div>
            )}
          </div>
        )}

        {/* Community Water Atlas Results */}
        {featureId === 'community' && (
          <div>
            <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
              <Users className="w-7 h-7 text-teal-400" />
              Community Water Atlas
            </h3>
            <div className="grid md:grid-cols-4 gap-4 mb-6">
              <div className="bg-teal-500/10 p-4 rounded-xl border border-teal-500/30">
                <div className="text-sm text-teal-300">Total Reports</div>
                <div className="text-3xl font-bold text-white mt-1">{result.total_reports}</div>
              </div>
              <div className="bg-green-500/10 p-4 rounded-xl border border-green-500/30">
                <div className="text-sm text-green-300">Successful</div>
                <div className="text-3xl font-bold text-green-400 mt-1">{result.successful_borewells}</div>
              </div>
              <div className="bg-purple-500/10 p-4 rounded-xl border border-purple-500/30">
                <div className="text-sm text-purple-300">Success Rate</div>
                <div className="text-3xl font-bold text-purple-400 mt-1">{result.success_rate}%</div>
              </div>
              <div className="bg-yellow-500/10 p-4 rounded-xl border border-yellow-500/30">
                <div className="text-sm text-yellow-300">Avg Depth</div>
                <div className="text-3xl font-bold text-yellow-400 mt-1">{result.statistics.average_depth_ft}ft</div>
              </div>
            </div>
            <div className="space-y-3 mb-4">
              {result.nearby_borewells.slice(0, 5).map((borewell: any, idx: number) => (
                <div key={idx} className="bg-slate-800/50 p-4 rounded-xl border border-slate-700 hover:border-teal-500/30 transition-all">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        borewell.success ? 'bg-green-500/20' : 'bg-red-500/20'
                      }`}>
                        {borewell.success ? '✓' : '✗'}
                      </div>
                      <div>
                        <div className="text-white font-bold">{borewell.id}</div>
                        <div className="text-sm text-slate-400">Reported by {borewell.reported_by}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-white font-bold">{borewell.depth_ft}ft</div>
                      <div className="text-sm text-slate-400">{borewell.yield_lpm} LPM</div>
                    </div>
                  </div>
                  <div className="flex gap-4 text-xs text-slate-400">
                    <span>Quality: {borewell.water_quality}</span>
                    <span>Year: {borewell.drilling_year}</span>
                    <span>Cost: ₹{(borewell.cost_inr / 1000).toFixed(0)}K</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="bg-teal-500/10 border border-teal-500/30 p-4 rounded-xl mb-2">
              <p className="text-sm text-teal-100">{result.recommendation}</p>
            </div>
            {result.data_source_note && (
              <div className="bg-slate-800/50 border border-slate-600 p-3 rounded-lg">
                <p className="text-xs text-slate-400 italic">{result.data_source_note}</p>
              </div>
            )}
          </div>
        )}

        {/* 3D Aquifer Visualization Results */}
        {featureId === 'aquifer3d' && (
          <div>
            <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
              <Layers className="w-7 h-7 text-purple-400" />
              3D Aquifer Layers
            </h3>
            <div className="grid md:grid-cols-3 gap-4 mb-6">
              <div className="bg-purple-500/10 p-4 rounded-xl border border-purple-500/30">
                <div className="text-sm text-purple-300">Water Table Depth</div>
                <div className="text-3xl font-bold text-purple-400 mt-1">{result.water_table_depth_m}m</div>
              </div>
              <div className="bg-cyan-500/10 p-4 rounded-xl border border-cyan-500/30">
                <div className="text-sm text-cyan-300">Aquifer Thickness</div>
                <div className="text-3xl font-bold text-cyan-400 mt-1">{result.total_aquifer_thickness_m}m</div>
              </div>
              <div className="bg-green-500/10 p-4 rounded-xl border border-green-500/30">
                <div className="text-sm text-green-300">Elevation</div>
                <div className="text-3xl font-bold text-green-400 mt-1">{result.surface_elevation_m}m</div>
              </div>
            </div>
            <div className="space-y-3 mb-4">
              {result.layers.map((layer: any, idx: number) => (
                <div key={idx} className="bg-slate-800/50 p-4 rounded-xl border border-slate-700">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg" style={{ backgroundColor: layer.color }}></div>
                      <div>
                        <div className="text-white font-bold">{layer.name}</div>
                        <div className="text-sm text-slate-400">{layer.material}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-white font-bold">{layer.thickness_m}m thick</div>
                      <div className="text-sm text-slate-400">{layer.depth_from_m}-{layer.depth_to_m}m</div>
                    </div>
                  </div>
                  <div className="flex gap-4 text-xs">
                    <span className={`px-2 py-1 rounded ${
                      layer.water_bearing ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                    }`}>
                      {layer.water_bearing ? '💧 Water Bearing' : '🚫 Non-bearing'}
                    </span>
                    <span className="px-2 py-1 bg-slate-700 text-slate-300 rounded">
                      Permeability: {layer.permeability}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <div className="bg-purple-500/10 border border-purple-500/30 p-4 rounded-xl">
              <div className="text-sm font-bold text-purple-300 mb-2">Drilling Recommendation:</div>
              <p className="text-sm text-purple-100">
                Recommended depth: {result.drilling_recommendation.recommended_depth_m}m ({result.drilling_recommendation.recommended_depth_ft}ft) targeting {result.drilling_recommendation.target_layers.join(' and ')}
              </p>
            </div>
          </div>
        )}

        {/* Cost-Benefit Analysis Results */}
        {featureId === 'costbenefit' && (
          <div>
            <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
              <DollarSign className="w-7 h-7 text-emerald-400" />
              Financial Analysis
            </h3>
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="bg-emerald-500/10 p-6 rounded-xl border-2 border-emerald-500/50">
                <div className="text-sm text-emerald-300 mb-2">Total Investment</div>
                <div className="text-4xl font-bold text-emerald-400">₹{(result.cost_breakdown.total_investment / 1000).toFixed(0)}K</div>
                <div className="mt-4 space-y-2 text-sm">
                  <div className="flex justify-between text-slate-300">
                    <span>Drilling:</span>
                    <span>₹{(result.cost_breakdown.drilling_cost / 1000).toFixed(0)}K</span>
                  </div>
                  <div className="flex justify-between text-slate-300">
                    <span>Casing:</span>
                    <span>₹{(result.cost_breakdown.casing_cost / 1000).toFixed(0)}K</span>
                  </div>
                  <div className="flex justify-between text-slate-300">
                    <span>Pump & Equipment:</span>
                    <span>₹{(result.cost_breakdown.pump_and_equipment / 1000).toFixed(0)}K</span>
                  </div>
                </div>
              </div>
              <div className="bg-green-500/10 p-6 rounded-xl border-2 border-green-500/50">
                <div className="text-sm text-green-300 mb-2">Annual Net Benefit</div>
                <div className="text-4xl font-bold text-green-400">₹{(result.expected_benefits.net_yearly_benefit_inr / 1000).toFixed(0)}K</div>
                <div className="mt-4 space-y-2 text-sm">
                  <div className="flex justify-between text-slate-300">
                    <span>Crop Income:</span>
                    <span className="text-green-400">₹{(result.expected_benefits.yearly_crop_income_inr / 1000).toFixed(0)}K</span>
                  </div>
                  <div className="flex justify-between text-slate-300">
                    <span>Operating Cost:</span>
                    <span className="text-red-400">-₹{(result.expected_benefits.operational_cost_yearly_inr / 1000).toFixed(0)}K</span>
                  </div>
                  <div className="flex justify-between text-slate-300">
                    <span>Irrigable Area:</span>
                    <span>{result.expected_benefits.irrigable_area_acres} acres</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="grid md:grid-cols-4 gap-4 mb-4">
              <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700">
                <div className="text-xs text-slate-400">Payback Period</div>
                <div className="text-2xl font-bold text-cyan-400">{result.roi_analysis.payback_period_years} yrs</div>
              </div>
              <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700">
                <div className="text-xs text-slate-400">5-Year ROI</div>
                <div className="text-2xl font-bold text-green-400">{result.roi_analysis.roi_5_years_percent}%</div>
              </div>
              <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700">
                <div className="text-xs text-slate-400">10-Year ROI</div>
                <div className="text-2xl font-bold text-green-400">{result.roi_analysis.roi_10_years_percent}%</div>
              </div>
              <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700">
                <div className="text-xs text-slate-400">Success Probability</div>
                <div className="text-2xl font-bold text-purple-400">{result.success_probability}%</div>
              </div>
            </div>
            <div className="bg-emerald-500/10 border border-emerald-500/30 p-4 rounded-xl">
              <p className="text-sm text-emerald-100 font-bold">{result.recommendation}</p>
            </div>
          </div>
        )}

        {/* Nearby Water Sources Results */}
        {featureId === 'nearby' && (
          <div>
            <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
              <Navigation className="w-7 h-7 text-sky-400" />
              Nearby Water Sources
            </h3>
            <div className="grid md:grid-cols-3 gap-4 mb-6">
              <div className="bg-sky-500/10 p-4 rounded-xl border border-sky-500/30">
                <div className="text-sm text-sky-300">Sources Found</div>
                <div className="text-3xl font-bold text-sky-400 mt-1">{result.total_sources_found}</div>
              </div>
              <div className="bg-cyan-500/10 p-4 rounded-xl border border-cyan-500/30">
                <div className="text-sm text-cyan-300">Search Radius</div>
                <div className="text-3xl font-bold text-cyan-400 mt-1">{result.search_radius_km} km</div>
              </div>
              <div className="bg-green-500/10 p-4 rounded-xl border border-green-500/30">
                <div className="text-sm text-green-300">Recharge Potential</div>
                <div className="text-3xl font-bold text-green-400 mt-1">{result.recharge_potential}</div>
              </div>
            </div>
            {result.nearest_source && (
              <div className="bg-gradient-to-r from-sky-500/20 to-cyan-500/20 border-2 border-sky-500/50 p-4 rounded-xl mb-4">
                <div className="text-sm font-bold text-sky-300 mb-2">🎯 Nearest Source</div>
                <div className="text-lg font-bold text-white">{result.nearest_source.name}</div>
                <div className="text-sm text-slate-300 mt-1">
                  {result.nearest_source.type} • {result.nearest_source.distance_km} km away • Feasibility: {result.nearest_source.feasibility}
                </div>
              </div>
            )}
            <div className="space-y-3 mb-4">
              {result.water_sources.map((source: any, idx: number) => (
                <div key={idx} className="bg-slate-800/50 p-4 rounded-xl border border-slate-700 hover:border-sky-500/30 transition-all">
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="text-white font-bold">{source.name}</div>
                      <div className="text-sm text-slate-400 capitalize">{source.type} {source.perennial && '• Perennial'}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sky-400 font-bold">{source.distance_km} km</div>
                      <div className={`text-xs px-2 py-1 rounded ${
                        source.feasibility === 'High' ? 'bg-green-500/20 text-green-400' :
                        source.feasibility === 'Medium' ? 'bg-yellow-500/20 text-yellow-400' :
                        'bg-orange-500/20 text-orange-400'
                      }`}>
                        {source.feasibility}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="bg-sky-500/10 border border-sky-500/30 p-4 rounded-xl">
              <div className="text-sm font-bold text-sky-300 mb-2">Recommendations:</div>
              <div className="space-y-1">
                {result.recommendations.map((rec: string, idx: number) => (
                  <div key={idx} className="text-sm text-sky-100 flex items-start gap-2">
                    <ChevronRight className="w-4 h-4 text-sky-400 mt-0.5" />
                    <span>{rec}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Satellite Time-Lapse Results */}
        {featureId === 'timelapse' && (
          <div>
            <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
              <Play className="w-7 h-7 text-orange-400" />
              Satellite Time-Lapse Analysis
            </h3>
            <div className="grid md:grid-cols-4 gap-4 mb-6">
              <div className="bg-orange-500/10 p-4 rounded-xl border border-orange-500/30">
                <div className="text-sm text-orange-300">Time Period</div>
                <div className="text-3xl font-bold text-orange-400 mt-1">{result.time_period_months} months</div>
              </div>
              <div className="bg-green-500/10 p-4 rounded-xl border border-green-500/30">
                <div className="text-sm text-green-300">NDVI Trend</div>
                <div className="text-2xl font-bold text-green-400 mt-1">{result.trends.ndvi_trend}</div>
              </div>
              <div className="bg-blue-500/10 p-4 rounded-xl border border-blue-500/30">
                <div className="text-sm text-blue-300">NDWI Trend</div>
                <div className="text-2xl font-bold text-blue-400 mt-1">{result.trends.ndwi_trend}</div>
              </div>
              <div className="bg-purple-500/10 p-4 rounded-xl border border-purple-500/30">
                <div className="text-sm text-purple-300">Current GWP</div>
                <div className="text-2xl font-bold text-purple-400 mt-1">{result.current_values.gwp_class}</div>
              </div>
            </div>
            <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700 mb-4 max-h-64 overflow-y-auto">
              <div className="text-sm font-bold text-slate-300 mb-3">Monthly Data:</div>
              <div className="space-y-2">
                {result.time_series.slice(0, 12).map((entry: any, idx: number) => (
                  <div key={idx} className="flex justify-between items-center text-sm border-b border-slate-700 pb-2">
                    <span className="text-slate-400">{entry.month}</span>
                    <div className="flex gap-4">
                      <span className="text-green-400">NDVI: {entry.ndvi}</span>
                      <span className="text-blue-400">NDWI: {entry.ndwi}</span>
                      <span className="text-purple-400">{entry.gwp_estimate}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-orange-500/10 border border-orange-500/30 p-4 rounded-xl">
              <div className="text-sm font-bold text-orange-300 mb-2">Insights:</div>
              <div className="space-y-1">
                {result.insights.map((insight: string, idx: number) => (
                  <div key={idx} className="text-sm text-orange-100 flex items-start gap-2">
                    <ChevronRight className="w-4 h-4 text-orange-400 mt-0.5" />
                    <span>{insight}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Government Compliance Results */}
        {featureId === 'compliance' && (
          <div>
            <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
              <FileCheck className="w-7 h-7 text-violet-400" />
              Compliance Status
            </h3>
            <div className="grid md:grid-cols-3 gap-4 mb-6">
              <div className={`p-6 rounded-xl border-2 ${
                result.compliance_score >= 80 ? 'bg-green-500/20 border-green-500/50' :
                result.compliance_score >= 60 ? 'bg-yellow-500/20 border-yellow-500/50' :
                'bg-red-500/20 border-red-500/50'
              }`}>
                <div className="text-sm text-slate-300 mb-2">Compliance Score</div>
                <div className={`text-4xl font-bold ${
                  result.compliance_score >= 80 ? 'text-green-400' :
                  result.compliance_score >= 60 ? 'text-yellow-400' :
                  'text-red-400'
                }`}>
                  {result.compliance_score}/100
                </div>
              </div>
              <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700">
                <div className="text-sm text-slate-400 mb-2">Status</div>
                <div className="text-2xl font-bold text-white">{result.compliance_status}</div>
              </div>
              <div className="bg-violet-500/10 p-6 rounded-xl border border-violet-500/30">
                <div className="text-sm text-violet-300 mb-2">Processing Time</div>
                <div className="text-2xl font-bold text-violet-400">{result.processing_time}</div>
              </div>
            </div>
            <div className="space-y-4 mb-4">
              <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700">
                <div className="text-sm font-bold text-slate-300 mb-3">Required Permits:</div>
                <div className="flex flex-wrap gap-2">
                  {result.permits_required.map((permit: string, idx: number) => (
                    <span key={idx} className="px-3 py-1 bg-violet-500/20 text-violet-300 rounded-full text-sm border border-violet-500/30">
                      {permit}
                    </span>
                  ))}
                </div>
              </div>
              <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700">
                <div className="text-sm font-bold text-slate-300 mb-3">Regulations:</div>
                <div className="space-y-2">
                  {result.regulations.map((reg: any, idx: number) => (
                    <div key={idx} className="flex items-start gap-3 p-2 rounded bg-slate-900/50">
                      <div className={`w-2 h-2 rounded-full mt-2 ${
                        reg.severity === 'High' ? 'bg-red-400' :
                        reg.severity === 'Medium' ? 'bg-yellow-400' :
                        'bg-green-400'
                      }`}></div>
                      <div className="flex-1">
                        <div className="text-sm font-bold text-white">{reg.authority}</div>
                        <div className="text-xs text-slate-400">{reg.regulation}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="bg-violet-500/10 border border-violet-500/30 p-4 rounded-xl">
              <div className="text-sm font-bold text-violet-300 mb-2">Contact Information:</div>
              <div className="text-sm text-violet-100 space-y-1">
                <div>Office: {result.contact_info.cgwa_office}</div>
                <div>Helpline: {result.contact_info.helpline}</div>
                <div>Website: {result.contact_info.website}</div>
              </div>
            </div>
          </div>
        )}

        {/* Alerts System Results */}
        {featureId === 'alerts' && (
          <div>
            <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
              <Bell className="w-7 h-7 text-rose-400" />
              Alerts Configuration
            </h3>
            <div className="bg-gradient-to-r from-rose-500/20 to-pink-500/20 border-2 border-rose-500/50 p-6 rounded-xl mb-6">
              <div className="text-sm text-rose-300 mb-2">Subscription Status</div>
              <div className="text-3xl font-bold text-rose-400 mb-4">{result.subscription.status}</div>
              <div className="text-sm text-white">
                ID: {result.subscription.subscription_id} • Created: {result.subscription.created_at}
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-6 mb-4">
              <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700">
                <div className="text-sm font-bold text-slate-300 mb-3">Contact Info:</div>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <span className="text-slate-400">Email:</span>
                    <span className="text-white">{result.contact_info.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-slate-400">Phone:</span>
                    <span className="text-white">{result.contact_info.phone}</span>
                  </div>
                </div>
              </div>
              <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700">
                <div className="text-sm font-bold text-slate-300 mb-3">Notification Channels:</div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Email:</span>
                    <span className={result.notification_channels.email.enabled ? 'text-green-400' : 'text-red-400'}>
                      {result.notification_channels.email.enabled ? 'Enabled' : 'Disabled'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">WhatsApp:</span>
                    <span className={result.notification_channels.whatsapp.enabled ? 'text-green-400' : 'text-red-400'}>
                      {result.notification_channels.whatsapp.enabled ? 'Enabled' : 'Disabled'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700 mb-4">
              <div className="text-sm font-bold text-slate-300 mb-3">Alert Preferences:</div>
              <div className="space-y-2">
                {result.alert_preferences.map((pref: any, idx: number) => (
                  <div key={idx} className="flex justify-between items-center p-2 rounded bg-slate-900/50">
                    <div>
                      <div className="text-sm font-bold text-white">{pref.type}</div>
                      <div className="text-xs text-slate-400">{pref.description}</div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-slate-400">{pref.frequency}</span>
                      <span className={`w-2 h-2 rounded-full ${pref.enabled ? 'bg-green-400' : 'bg-gray-400'}`}></span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-xl">
              <p className="text-sm text-rose-100 font-bold mb-2">{result.message}</p>
              <div className="text-xs text-rose-200 space-y-1">
                {result.next_steps.map((step: string, idx: number) => (
                  <div key={idx} className="flex items-start gap-2">
                    <ChevronRight className="w-3 h-3 text-rose-400 mt-0.5" />
                    <span>{step}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Precipitation Forecast Results */}
        {featureId === 'forecast' && (
          <div>
            <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
              <Cloud className="w-7 h-7 text-blue-400" />
              Weather Forecast
            </h3>
            <div className="grid md:grid-cols-4 gap-4 mb-6">
              <div className="bg-blue-500/10 p-4 rounded-xl border border-blue-500/30">
                <div className="text-sm text-blue-300">Forecast Period</div>
                <div className="text-3xl font-bold text-blue-400 mt-1">{result.forecast_period_days} days</div>
              </div>
              <div className="bg-cyan-500/10 p-4 rounded-xl border border-cyan-500/30">
                <div className="text-sm text-cyan-300">Expected Rainfall</div>
                <div className="text-3xl font-bold text-cyan-400 mt-1">{result.summary.total_expected_rainfall_mm}mm</div>
              </div>
              <div className="bg-green-500/10 p-4 rounded-xl border border-green-500/30">
                <div className="text-sm text-green-300">Recharge</div>
                <div className="text-3xl font-bold text-green-400 mt-1">{result.summary.expected_groundwater_recharge_mm}mm</div>
              </div>
              <div className="bg-purple-500/10 p-4 rounded-xl border border-purple-500/30">
                <div className="text-sm text-purple-300">Rainy Days</div>
                <div className="text-3xl font-bold text-purple-400 mt-1">{result.summary.rainy_days}</div>
              </div>
            </div>
            <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700 mb-4 max-h-64 overflow-y-auto">
              <div className="text-sm font-bold text-slate-300 mb-3">Daily Forecast:</div>
              <div className="space-y-2">
                {result.daily_forecast.map((day: any, idx: number) => (
                  <div key={idx} className="flex justify-between items-center text-sm border-b border-slate-700 pb-2">
                    <span className="text-slate-400">{day.date}</span>
                    <div className="flex gap-4">
                      <span className="text-blue-400">{day.total_precipitation_mm}mm</span>
                      <span className="text-orange-400">{day.avg_temp_c}°C</span>
                      <span className={`px-2 py-1 rounded text-xs ${
                        day.groundwater_recharge_potential === 'High' ? 'bg-green-500/20 text-green-400' :
                        day.groundwater_recharge_potential === 'Moderate' ? 'bg-yellow-500/20 text-yellow-400' :
                        'bg-red-500/20 text-red-400'
                      }`}>
                        {day.groundwater_recharge_potential}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700">
                <div className="text-sm font-bold text-slate-300 mb-2">Current Status:</div>
                <div className="text-2xl font-bold text-white">{result.impact_on_groundwater.current_status}</div>
              </div>
              <div className="bg-green-500/10 p-4 rounded-xl border border-green-500/30">
                <div className="text-sm font-bold text-green-300 mb-2">Expected Improvement:</div>
                <div className="text-2xl font-bold text-green-400">{result.impact_on_groundwater.expected_improvement}</div>
              </div>
            </div>
            <div className="bg-blue-500/10 border border-blue-500/30 p-4 rounded-xl">
              <div className="text-sm font-bold text-blue-300 mb-2">Recommendations:</div>
              <div className="space-y-1">
                {result.recommendations.map((rec: string, idx: number) => (
                  <div key={idx} className="text-sm text-blue-100 flex items-start gap-2">
                    <ChevronRight className="w-4 h-4 text-blue-400 mt-0.5" />
                    <span>{rec}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        <button 
          onClick={handleDownloadReport}
          className="mt-6 w-full px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 rounded-xl font-bold text-white flex items-center justify-center gap-2 transition-all hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={!result || loading}
        >
          <Download className="w-5 h-5" />
          Download Analysis Report
        </button>
      </motion.div>
    )
  }

  return (
    <div className="min-h-screen pt-32 pb-16 px-6 bg-slate-950 relative overflow-hidden">
      {/* Background Effects */}
      <div className="fixed inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAgTSAwIDIwIEwgNDAgMjAgTSAyMCAwIEwgMjAgNDAgTSAwIDMwIEwgNDAgMzAgTSAzMCAwIEwgMzAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzFhMjMzYSIgb3BhY2l0eT0iMC4zIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-50" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 text-center"
        >
          <h1 className="text-5xl md:text-6xl font-black mb-4 bg-gradient-to-r from-white via-cyan-100 to-blue-200 bg-clip-text text-transparent">
            Advanced Features
          </h1>
          <p className="text-slate-300 text-lg max-w-3xl mx-auto">
            Powerful Deep Learning-driven analysis tools for comprehensive groundwater management
          </p>
        </motion.div>

        {/* Coordinates Input with Map */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 bg-gradient-to-br from-slate-900/95 to-slate-800/95 border-2 border-slate-700/50 p-6 rounded-2xl"
        >
          <div className="flex items-center gap-3 mb-4">
            <MapPin className="w-6 h-6 text-cyan-400" />
            <h2 className="text-xl font-bold text-white">Select Location</h2>
          </div>
          
          {/* Interactive Map */}
          <div className="mb-4 h-[400px] rounded-xl overflow-hidden border-2 border-slate-700/50 relative">
            <MapContainer 
              center={[15.45, 75.0]} 
              zoom={10} 
              style={{ height: '100%', width: '100%' }}
              className="z-0"
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              />
              <LocationPicker onLocationSelect={handleMapClick} />
              <ResetMapView onReset={handleResetMap} />
              {markerPosition && (
                <Marker position={markerPosition}>
                  <Popup>
                    <div className="text-sm">
                      <div className="font-bold mb-1">Selected Location</div>
                      <div>Lat: {markerPosition[0].toFixed(4)}</div>
                      <div>Lon: {markerPosition[1].toFixed(4)}</div>
                    </div>
                  </Popup>
                </Marker>
              )}
            </MapContainer>
          </div>

          <div className="flex items-center gap-2 mb-3 text-sm text-slate-400">
            <Info className="w-4 h-4" />
            <span>Click on the map to select a location within Dharwad District</span>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <input
              type="number"
              step="0.0001"
              value={lat}
              onChange={(e) => {
                setLat(e.target.value)
                if (e.target.value && lon) {
                  setMarkerPosition([parseFloat(e.target.value), parseFloat(lon)])
                }
              }}
              placeholder="Latitude (15.0 - 16.0)"
              className="px-4 py-3 bg-slate-800/60 border-2 border-slate-600/50 rounded-xl focus:outline-none focus:border-cyan-500 text-white"
            />
            <input
              type="number"
              step="0.0001"
              value={lon}
              onChange={(e) => {
                setLon(e.target.value)
                if (lat && e.target.value) {
                  setMarkerPosition([parseFloat(lat), parseFloat(e.target.value)])
                }
              }}
              placeholder="Longitude (74.5 - 75.5)"
              className="px-4 py-3 bg-slate-800/60 border-2 border-slate-600/50 rounded-xl focus:outline-none focus:border-cyan-500 text-white"
            />
          </div>
          {error && (
            <div className="mt-4 p-3 bg-red-500/20 border border-red-500/40 rounded-lg text-red-200 text-sm">
              {error}
            </div>
          )}
        </motion.div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {features.map((feature) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={feature.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.02 }}
                className={`bg-gradient-to-br from-slate-900/95 to-slate-800/95 border-2 ${
                  activeFeature === feature.id ? 'border-cyan-500/50' : 'border-slate-700/50'
                } p-6 rounded-2xl cursor-pointer transition-all`}
                onClick={() => setActiveFeature(feature.id)}
              >
                <div className={`w-14 h-14 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center mb-4 shadow-lg`}>
                  <Icon className="w-7 h-7 text-white" />
                </div>
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-xl font-bold text-white">{feature.title}</h3>
                  {feature.badge && (
                    <span className="px-2 py-0.5 bg-cyan-500/20 border border-cyan-500/40 rounded-full text-[10px] font-semibold text-cyan-300">
                      {feature.badge}
                    </span>
                  )}
                </div>
                <p className="text-sm text-slate-300 mb-4">{feature.description}</p>

                {/* Feature-specific inputs */}
                <AnimatePresence>
                  {activeFeature === feature.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      {feature.inputs.includes('months') && (
                        <div className="mb-3">
                          <label className="text-xs text-slate-400 mb-1 block">Months to analyze</label>
                          <input
                            type="number"
                            value={months}
                            onChange={(e) => setMonths(parseInt(e.target.value))}
                            className="w-full px-3 py-2 bg-slate-800/60 border border-slate-600/50 rounded-lg text-white text-sm"
                          />
                        </div>
                      )}
                      {feature.inputs.includes('radius') && (
                        <div className="mb-3">
                          <label className="text-xs text-slate-400 mb-1 block">Search radius (km)</label>
                          <input
                            type="number"
                            step="0.1"
                            value={radius}
                            onChange={(e) => setRadius(parseFloat(e.target.value))}
                            className="w-full px-3 py-2 bg-slate-800/60 border border-slate-600/50 rounded-lg text-white text-sm"
                          />
                        </div>
                      )}
                      {feature.inputs.includes('rainfall') && (
                        <div className="mb-3">
                          <label className="text-xs text-slate-400 mb-1 block">Rainfall (mm)</label>
                          <input
                            type="number"
                            value={rainfall}
                            onChange={(e) => setRainfall(parseInt(e.target.value))}
                            className="w-full px-3 py-2 bg-slate-800/60 border border-slate-600/50 rounded-lg text-white text-sm"
                          />
                        </div>
                      )}
                      {feature.inputs.includes('investment') && (
                        <div className="mb-3">
                          <label className="text-xs text-slate-400 mb-1 block">Investment Amount (₹)</label>
                          <input
                            type="number"
                            value={investment}
                            onChange={(e) => setInvestment(parseInt(e.target.value))}
                            className="w-full px-3 py-2 bg-slate-800/60 border border-slate-600/50 rounded-lg text-white text-sm"
                            placeholder="100000"
                          />
                        </div>
                      )}
                      {feature.inputs.includes('email') && (
                        <div className="mb-3">
                          <label className="text-xs text-slate-400 mb-1 block">Email Address</label>
                          <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-3 py-2 bg-slate-800/60 border border-slate-600/50 rounded-lg text-white text-sm"
                            placeholder="your@email.com"
                          />
                        </div>
                      )}
                      {feature.inputs.includes('phone') && (
                        <div className="mb-3">
                          <label className="text-xs text-slate-400 mb-1 block">WhatsApp Number</label>
                          <input
                            type="tel"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="w-full px-3 py-2 bg-slate-800/60 border border-slate-600/50 rounded-lg text-white text-sm"
                            placeholder="+91 XXXXXXXXXX"
                          />
                        </div>
                      )}
                      {feature.inputs.includes('days') && (
                        <div className="mb-3">
                          <label className="text-xs text-slate-400 mb-1 block">Forecast Days</label>
                          <input
                            type="number"
                            value={days}
                            onChange={(e) => setDays(parseInt(e.target.value))}
                            className="w-full px-3 py-2 bg-slate-800/60 border border-slate-600/50 rounded-lg text-white text-sm"
                            placeholder="7"
                          />
                        </div>
                      )}
                      <button
                        onClick={() => handleAnalyze(feature)}
                        disabled={loading}
                        className={`w-full px-4 py-2.5 bg-gradient-to-r ${feature.color} rounded-lg font-bold text-white text-sm flex items-center justify-center gap-2 transition-all disabled:opacity-50`}
                      >
                        {loading ? (
                          <>
                            <Loader className="w-4 h-4 animate-spin" />
                            Analyzing...
                          </>
                        ) : (
                          <>
                            <Icon className="w-4 h-4" />
                            Analyze
                          </>
                        )}
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )
          })}
        </div>

        {/* Results */}
        {renderResults()}

        {/* Info Banner */}
        <div className="mt-8 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/30 p-6 rounded-xl">
          <div className="flex items-start gap-3">
            <Info className="w-6 h-6 text-cyan-400 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-lg font-bold text-white mb-2">About These Features</h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                These advanced Deep Learning-powered tools use multi-factor analysis including satellite data (NDVI, NDWI), 
                terrain elevation, historical patterns, and hydrological models to provide actionable insights for 
                sustainable groundwater management in Dharwad District.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdvancedFeatures
