import { useState } from 'react'
import axios from 'axios'
import { Brain, MapPin, Search, Loader, TrendingUp, Activity, CheckCircle, AlertTriangle, Info, Zap, Award } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface XAIResult {
  success: boolean
  location: { lat: number; lon: number }
  prediction: {
    groundwater_class: string
    confidence: number
    ndvi: number
    ndwi: number
    elevation: number
  }
  xai: {
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
}

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

const ExplainableAI = () => {
  const [lat, setLat] = useState('')
  const [lon, setLon] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<XAIResult | null>(null)
  const [error, setError] = useState('')

  const handleAnalyze = async () => {
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
      setError('Failed to get XAI analysis. Make sure Flask backend is running.')
      console.error('API Error:', err)
    } finally {
      setLoading(false)
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

  const getGWPColor = (gwpClass: string) => {
    switch (gwpClass.toLowerCase()) {
      case 'high': return 'text-green-400'
      case 'moderate': return 'text-yellow-400'
      case 'low': return 'text-red-400'
      default: return 'text-white'
    }
  }

  return (
    <div className="min-h-screen pt-32 pb-16 px-6 bg-slate-950 relative overflow-hidden">
      {/* Background Effects */}
      <div className="fixed inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAgTSAwIDIwIEwgNDAgMjAgTSAyMCAwIEwgMjAgNDAgTSAwIDMwIEwgNDAgMzAgTSAzMCAwIEwgMzAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzFhMjMzYSIgb3BhY2l0eT0iMC4zIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-50" />
      <div className="fixed inset-0 bg-gradient-to-br from-indigo-900/8 via-transparent to-violet-900/8 pointer-events-none" />

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
            className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-indigo-500/20 to-violet-500/20 border-2 border-indigo-500/40 rounded-full mb-6"
          >
            <Brain className="w-5 h-5 text-indigo-400" />
            <span className="text-base font-bold bg-gradient-to-r from-indigo-300 to-violet-400 bg-clip-text text-transparent">Explainable AI</span>
          </motion.div>
          <h1 className="text-5xl md:text-6xl font-black mb-4 bg-gradient-to-r from-white via-indigo-100 to-violet-200 bg-clip-text text-transparent">
            Model Transparency & Interpretability
          </h1>
          <p className="text-slate-300 text-lg max-w-3xl mx-auto">
            Understand exactly <span className="text-indigo-400 font-semibold">WHY</span> and <span className="text-indigo-400 font-semibold">HOW</span> the Deep Learning model makes groundwater predictions using SHAP-like feature importance analysis
          </p>
        </motion.div>

        {/* Input Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-slate-900/95 to-slate-800/95 backdrop-blur-xl border-2 border-slate-700/50 p-8 rounded-2xl mb-8"
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-violet-600 rounded-xl flex items-center justify-center">
              <Search className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-white">Analyze Location</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Latitude (15.0 - 16.0)
              </label>
              <input
                type="number"
                step="0.0001"
                value={lat}
                onChange={(e) => setLat(e.target.value)}
                className="w-full px-4 py-3 bg-slate-800/50 border-2 border-slate-700 rounded-xl text-white focus:border-indigo-500 focus:outline-none transition-colors"
                placeholder="15.4589"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Longitude (74.5 - 75.5)
              </label>
              <input
                type="number"
                step="0.0001"
                value={lon}
                onChange={(e) => setLon(e.target.value)}
                className="w-full px-4 py-3 bg-slate-800/50 border-2 border-slate-700 rounded-xl text-white focus:border-indigo-500 focus:outline-none transition-colors"
                placeholder="74.9876"
              />
            </div>
            <div className="flex items-end">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleAnalyze}
                disabled={loading}
                className="w-full py-3 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 disabled:from-slate-700 disabled:to-slate-700 text-white font-bold rounded-xl shadow-lg disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader className="w-5 h-5 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Brain className="w-5 h-5" />
                    Explain Prediction
                  </>
                )}
              </motion.button>
            </div>
          </div>

          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="mt-4 bg-red-500/10 border border-red-500/50 text-red-400 px-4 py-3 rounded-xl flex items-center gap-2"
              >
                <AlertTriangle className="w-5 h-5" />
                {error}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Results */}
        {result && result.xai && (
          <div className="space-y-6">
            {/* Prediction Summary */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-gradient-to-br from-slate-900/95 to-slate-800/95 backdrop-blur-xl border-2 border-slate-700/50 p-8 rounded-2xl"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center">
                    <Award className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-white">Final Prediction</h2>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-400">
                  <MapPin className="w-4 h-4" />
                  {result.location.lat.toFixed(4)}, {result.location.lon.toFixed(4)}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="text-center">
                  <div className={`text-6xl font-black mb-2 ${getGWPColor(result.xai.prediction)}`}>
                    {result.xai.prediction}
                  </div>
                  <div className="text-slate-400">Groundwater Potential</div>
                </div>
                <div className="text-center">
                  <div className="text-6xl font-black text-indigo-400 mb-2">
                    {(result.xai.confidence * 100).toFixed(1)}%
                  </div>
                  <div className="text-slate-400">Overall Confidence</div>
                </div>
              </div>
            </motion.div>

            {/* Feature Importance */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-gradient-to-br from-slate-900/95 to-slate-800/95 backdrop-blur-xl border-2 border-slate-700/50 p-8 rounded-2xl"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">Feature Importance Analysis</h2>
                  <p className="text-sm text-slate-400">SHAP-like contribution scores for each input feature</p>
                </div>
              </div>

              <div className="space-y-4">
                {/* NDVI */}
                <div className={`border-2 rounded-xl p-5 ${getImpactColor(result.xai.feature_importance.vegetation_ndvi.impact)}`}>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <Activity className="w-5 h-5" />
                      <span className="font-bold text-lg">Vegetation Index (NDVI)</span>
                    </div>
                    <div className="text-2xl font-black">
                      {result.xai.feature_importance.vegetation_ndvi.importance_percentage}%
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-3 mb-3">
                    <div className="bg-slate-900/50 rounded-lg p-2 text-center">
                      <div className="text-xs text-slate-400">Value</div>
                      <div className="text-lg font-bold text-white">{result.xai.feature_importance.vegetation_ndvi.value.toFixed(3)}</div>
                    </div>
                    <div className="bg-slate-900/50 rounded-lg p-2 text-center">
                      <div className="text-xs text-slate-400">Contribution</div>
                      <div className="text-lg font-bold text-white">{result.xai.feature_importance.vegetation_ndvi.contribution_score > 0 ? '+' : ''}{result.xai.feature_importance.vegetation_ndvi.contribution_score}</div>
                    </div>
                    <div className="bg-slate-900/50 rounded-lg p-2 text-center">
                      <div className="text-xs text-slate-400">Impact</div>
                      <div className="text-lg font-bold capitalize">{result.xai.feature_importance.vegetation_ndvi.impact}</div>
                    </div>
                  </div>
                  <div className="bg-slate-900/50 rounded-lg p-3 text-sm text-slate-200">
                    <Info className="w-4 h-4 inline mr-2" />
                    {result.xai.feature_importance.vegetation_ndvi.interpretation}
                  </div>
                  {/* Progress Bar */}
                  <div className="mt-3 bg-slate-800 rounded-full h-3 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${result.xai.feature_importance.vegetation_ndvi.importance_percentage}%` }}
                      transition={{ duration: 1, delay: 0.2 }}
                      className="h-full bg-gradient-to-r from-green-500 to-emerald-500"
                    />
                  </div>
                </div>

                {/* NDWI */}
                <div className={`border-2 rounded-xl p-5 ${getImpactColor(result.xai.feature_importance.water_content_ndwi.impact)}`}>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <Activity className="w-5 h-5" />
                      <span className="font-bold text-lg">Water Content (NDWI)</span>
                    </div>
                    <div className="text-2xl font-black">
                      {result.xai.feature_importance.water_content_ndwi.importance_percentage}%
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-3 mb-3">
                    <div className="bg-slate-900/50 rounded-lg p-2 text-center">
                      <div className="text-xs text-slate-400">Value</div>
                      <div className="text-lg font-bold text-white">{result.xai.feature_importance.water_content_ndwi.value.toFixed(3)}</div>
                    </div>
                    <div className="bg-slate-900/50 rounded-lg p-2 text-center">
                      <div className="text-xs text-slate-400">Contribution</div>
                      <div className="text-lg font-bold text-white">{result.xai.feature_importance.water_content_ndwi.contribution_score > 0 ? '+' : ''}{result.xai.feature_importance.water_content_ndwi.contribution_score}</div>
                    </div>
                    <div className="bg-slate-900/50 rounded-lg p-2 text-center">
                      <div className="text-xs text-slate-400">Impact</div>
                      <div className="text-lg font-bold capitalize">{result.xai.feature_importance.water_content_ndwi.impact}</div>
                    </div>
                  </div>
                  <div className="bg-slate-900/50 rounded-lg p-3 text-sm text-slate-200">
                    <Info className="w-4 h-4 inline mr-2" />
                    {result.xai.feature_importance.water_content_ndwi.interpretation}
                  </div>
                  <div className="mt-3 bg-slate-800 rounded-full h-3 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${result.xai.feature_importance.water_content_ndwi.importance_percentage}%` }}
                      transition={{ duration: 1, delay: 0.3 }}
                      className="h-full bg-gradient-to-r from-blue-500 to-cyan-500"
                    />
                  </div>
                </div>

                {/* Elevation */}
                <div className={`border-2 rounded-xl p-5 ${getImpactColor(result.xai.feature_importance.elevation_dem.impact)}`}>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <Activity className="w-5 h-5" />
                      <span className="font-bold text-lg">Elevation (DEM)</span>
                    </div>
                    <div className="text-2xl font-black">
                      {result.xai.feature_importance.elevation_dem.importance_percentage}%
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-3 mb-3">
                    <div className="bg-slate-900/50 rounded-lg p-2 text-center">
                      <div className="text-xs text-slate-400">Value</div>
                      <div className="text-lg font-bold text-white">{result.xai.feature_importance.elevation_dem.value.toFixed(1)}m</div>
                    </div>
                    <div className="bg-slate-900/50 rounded-lg p-2 text-center">
                      <div className="text-xs text-slate-400">Contribution</div>
                      <div className="text-lg font-bold text-white">{result.xai.feature_importance.elevation_dem.contribution_score > 0 ? '+' : ''}{result.xai.feature_importance.elevation_dem.contribution_score}</div>
                    </div>
                    <div className="bg-slate-900/50 rounded-lg p-2 text-center">
                      <div className="text-xs text-slate-400">Impact</div>
                      <div className="text-lg font-bold capitalize">{result.xai.feature_importance.elevation_dem.impact}</div>
                    </div>
                  </div>
                  <div className="bg-slate-900/50 rounded-lg p-3 text-sm text-slate-200">
                    <Info className="w-4 h-4 inline mr-2" />
                    {result.xai.feature_importance.elevation_dem.interpretation}
                  </div>
                  <div className="mt-3 bg-slate-800 rounded-full h-3 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${result.xai.feature_importance.elevation_dem.importance_percentage}%` }}
                      transition={{ duration: 1, delay: 0.4 }}
                      className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
                    />
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Reasoning Chain */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-gradient-to-br from-slate-900/95 to-slate-800/95 backdrop-blur-xl border-2 border-slate-700/50 p-8 rounded-2xl"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-amber-600 rounded-xl flex items-center justify-center">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">Reasoning Chain</h2>
                  <p className="text-sm text-slate-400">Ranked factors influencing the prediction</p>
                </div>
              </div>

              <div className="space-y-3">
                {result.xai.reasoning_chain.map((step, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + idx * 0.1 }}
                    className="bg-slate-800/50 border-2 border-slate-700 rounded-xl p-4 flex items-start gap-4"
                  >
                    <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-bold text-lg">#{step.rank}</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-bold text-white text-lg">{step.factor}</h3>
                        <span className="text-indigo-400 font-semibold">{step.importance}</span>
                      </div>
                      <p className="text-slate-300 text-sm">{step.explanation}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Decision Logic */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-gradient-to-br from-slate-900/95 to-slate-800/95 backdrop-blur-xl border-2 border-slate-700/50 p-8 rounded-2xl"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center">
                  <Brain className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">Model Decision Process</h2>
                  <p className="text-sm text-slate-400">Step-by-step neural network computation</p>
                </div>
              </div>

              <div className="space-y-4">
                {result.xai.decision_logic.map((step, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + idx * 0.1 }}
                    className="relative"
                  >
                    <div className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div className="w-8 h-8 bg-cyan-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                          {step.step}
                        </div>
                        {idx < result.xai.decision_logic.length - 1 && (
                          <div className="w-0.5 h-full bg-cyan-500/30 mt-2" />
                        )}
                      </div>
                      <div className="flex-1 pb-6">
                        <h3 className="font-bold text-white mb-1">{step.stage}</h3>
                        <p className="text-slate-300 text-sm mb-2">{step.description}</p>
                        {step.probabilities && (
                          <div className="grid grid-cols-3 gap-2 mt-3">
                            {Object.entries(step.probabilities).map(([key, value]) => (
                              <div key={key} className="bg-slate-800/50 rounded-lg p-2 text-center">
                                <div className="text-xs text-slate-400">{key}</div>
                                <div className="text-lg font-bold text-cyan-400">{(value * 100).toFixed(0)}%</div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Hydrogeological Validation */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-gradient-to-br from-slate-900/95 to-slate-800/95 backdrop-blur-xl border-2 border-slate-700/50 p-8 rounded-2xl"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">Hydrogeological Validation</h2>
                  <p className="text-sm text-slate-400">Scientific validation against known principles</p>
                </div>
              </div>

              <div className="bg-indigo-500/10 border border-indigo-500/30 rounded-xl p-4 mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle className="w-5 h-5 text-indigo-400" />
                  <span className="font-bold text-indigo-400">Status: {result.xai.hydrogeological_validation.overall_status}</span>
                </div>
                <p className="text-sm text-slate-300">{result.xai.hydrogeological_validation.scientific_basis}</p>
              </div>

              <div className="space-y-3">
                {result.xai.hydrogeological_validation.validations.map((validation, idx) => (
                  <div key={idx} className="bg-slate-800/50 border border-slate-700 rounded-xl p-4">
                    <div className="flex items-start gap-3">
                      <span className="text-2xl">{validation.status.includes('✅') ? '✅' : '⚠️'}</span>
                      <div className="flex-1">
                        <h3 className="font-bold text-white mb-1">{validation.principle}</h3>
                        <p className="text-sm text-slate-300">{validation.note}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Model Transparency */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-gradient-to-br from-slate-900/95 to-slate-800/95 backdrop-blur-xl border-2 border-slate-700/50 p-8 rounded-2xl"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-violet-500 to-purple-600 rounded-xl flex items-center justify-center">
                  <Info className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">Model Transparency</h2>
                  <p className="text-sm text-slate-400">Complete model specifications and performance</p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-4">
                  <div className="text-sm text-slate-400 mb-1">Architecture</div>
                  <div className="text-lg font-bold text-white">{result.xai.model_transparency.architecture}</div>
                </div>
                <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-4">
                  <div className="text-sm text-slate-400 mb-1">Test Accuracy</div>
                  <div className="text-lg font-bold text-green-400">{result.xai.model_transparency.test_accuracy}</div>
                </div>
                <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-4">
                  <div className="text-sm text-slate-400 mb-1">F1 Score</div>
                  <div className="text-lg font-bold text-cyan-400">{result.xai.model_transparency.f1_score}</div>
                </div>
                <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-4">
                  <div className="text-sm text-slate-400 mb-1">XAI Method</div>
                  <div className="text-lg font-bold text-indigo-400">{result.xai.model_transparency.interpretability_method}</div>
                </div>
              </div>

              <div className="mt-4 bg-slate-800/50 border border-slate-700 rounded-xl p-4">
                <div className="text-sm text-slate-400 mb-1">Training Data Sources</div>
                <div className="text-white">{result.xai.model_transparency.training_data}</div>
              </div>
            </motion.div>

            {/* Confidence Breakdown */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-gradient-to-br from-slate-900/95 to-slate-800/95 backdrop-blur-xl border-2 border-slate-700/50 p-8 rounded-2xl"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl flex items-center justify-center">
                  <Activity className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">Confidence Breakdown</h2>
                  <p className="text-sm text-slate-400">Individual confidence components</p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                {Object.entries(result.xai.confidence_breakdown).map(([key, value]) => (
                  <div key={key} className="bg-slate-800/50 border border-slate-700 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-slate-400 capitalize">{key.replace('_', ' ')}</span>
                      <span className="text-xl font-bold text-amber-400">{(value * 100).toFixed(1)}%</span>
                    </div>
                    <div className="bg-slate-900 rounded-full h-2 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${value * 100}%` }}
                        transition={{ duration: 1, delay: 0.7 }}
                        className="h-full bg-gradient-to-r from-amber-500 to-orange-500"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ExplainableAI
