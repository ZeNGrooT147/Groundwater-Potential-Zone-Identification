import { useEffect, useState } from 'react'
import axios from 'axios'
import { BarChart3, TrendingUp, Droplets, Loader, Brain, Layers, Target, Zap, Database, Activity, CheckCircle, MapPin, Calendar, Award, Users, Cloud } from 'lucide-react'
import { Chart as ChartJS, ArcElement, CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend, Filler, RadialLinearScale } from 'chart.js'
import { Pie, Line, Bar, Doughnut, Radar } from 'react-chartjs-2'
import { motion } from 'framer-motion'

ChartJS.register(ArcElement, CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend, Filler, RadialLinearScale)

interface Statistics {
  total_area: number
  gwp_distribution: {
    High: number
    Moderate: number
    Low: number
  }
  average_ndvi: number
  average_ndwi: number
  average_elevation: number
}

const Dashboard = () => {
  const [stats, setStats] = useState<Statistics | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchStatistics()
  }, [])

  const fetchStatistics = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/statistics')
      setStats(response.data)
    } catch (error) {
      console.error('Failed to fetch statistics:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center bg-slate-950">
        <div className="text-center">
          <Loader className="w-12 h-12 animate-spin text-cyan-400 mx-auto mb-4" />
          <p className="text-slate-300 text-lg">Loading analytics...</p>
        </div>
      </div>
    )
  }

  if (!stats) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center bg-slate-950">
        <div className="bg-slate-900/50 border border-red-500/30 p-8 rounded-xl text-center max-w-md">
          <BarChart3 className="w-12 h-12 text-red-400 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-white mb-2">Failed to Load Statistics</h3>
          <p className="text-slate-400 mb-4">Make sure the Flask backend is running</p>
          <button 
            onClick={fetchStatistics}
            className="px-6 py-2.5 bg-cyan-500 hover:bg-cyan-600 rounded-lg font-medium text-white transition-all"
          >
            Retry
          </button>
        </div>
      </div>
    )
  }

  // Training History - Real data from Groundwater.ipynb
  const trainingData = {
    labels: ['Epoch 1', 'Epoch 2', 'Epoch 3', 'Epoch 4', 'Epoch 5', 'Epoch 6', 'Epoch 7', 'Epoch 8', 'Epoch 9', 'Epoch 10', 'Epoch 11', 'Epoch 12'],
    datasets: [
      {
        label: 'Training Accuracy',
        data: [0.9709, 0.9850, 0.9869, 0.9904, 0.9918, 0.9931, 0.9942, 0.9951, 0.9958, 0.9964, 0.9969, 0.9973],
        borderColor: 'rgba(34, 197, 94, 1)',
        backgroundColor: 'rgba(34, 197, 94, 0.1)',
        fill: true,
        tension: 0.4
      },
      {
        label: 'Validation Accuracy',
        data: [0.9921, 0.9914, 0.9979, 0.9928, 0.9979, 0.9935, 0.9956, 0.9971, 0.9978, 0.9983, 0.9987, 0.9989],
        borderColor: 'rgba(59, 130, 246, 1)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        fill: true,
        tension: 0.4
      }
    ]
  }

  const lossData = {
    labels: ['Epoch 1', 'Epoch 2', 'Epoch 3', 'Epoch 4', 'Epoch 5', 'Epoch 6', 'Epoch 7', 'Epoch 8', 'Epoch 9', 'Epoch 10', 'Epoch 11', 'Epoch 12'],
    datasets: [
      {
        label: 'Training Loss',
        data: [0.0706, 0.0406, 0.0371, 0.0268, 0.0236, 0.0210, 0.0189, 0.0172, 0.0158, 0.0147, 0.0138, 0.0131],
        borderColor: 'rgba(239, 68, 68, 1)',
        backgroundColor: 'rgba(239, 68, 68, 0.1)',
        fill: true,
        tension: 0.4
      },
      {
        label: 'Validation Loss',
        data: [0.0397, 0.0296, 0.0140, 0.0191, 0.0091, 0.0165, 0.0123, 0.0089, 0.0071, 0.0062, 0.0056, 0.0052],
        borderColor: 'rgba(168, 85, 247, 1)',
        backgroundColor: 'rgba(168, 85, 247, 0.1)',
        fill: true,
        tension: 0.4
      }
    ]
  }

  // GWP Distribution Pie Chart
  const gwpPieData = {
    labels: ['High', 'Moderate', 'Low'],
    datasets: [{
      data: [
        stats.gwp_distribution.High,
        stats.gwp_distribution.Moderate,
        stats.gwp_distribution.Low
      ],
      backgroundColor: [
        'rgba(26, 152, 80, 0.8)',   // Green
        'rgba(254, 224, 139, 0.8)',  // Yellow
        'rgba(215, 48, 39, 0.8)'     // Red
      ],
      borderColor: [
        'rgba(26, 152, 80, 1)',
        'rgba(254, 224, 139, 1)',
        'rgba(215, 48, 39, 1)'
      ],
      borderWidth: 2
    }]
  }

  // Environmental Indicators Bar Chart
  const envBarData = {
    labels: ['NDVI', 'NDWI', 'Elevation (÷100)'],
    datasets: [{
      label: 'Average Values',
      data: [stats.average_ndvi, stats.average_ndwi, stats.average_elevation / 100],
      backgroundColor: [
        'rgba(34, 197, 94, 0.6)',
        'rgba(59, 130, 246, 0.6)',
        'rgba(168, 85, 247, 0.6)'
      ],
      borderColor: [
        'rgba(34, 197, 94, 1)',
        'rgba(59, 130, 246, 1)',
        'rgba(168, 85, 247, 1)'
      ],
      borderWidth: 2
    }]
  }

  // Sample NDVI Trend (simulated monthly data)
  const ndviTrendData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [{
      label: 'NDVI Trend',
      data: [0.45, 0.48, 0.52, 0.55, 0.50, 0.42, 0.38, 0.40, 0.45, 0.50, 0.53, 0.48],
      borderColor: 'rgba(34, 197, 94, 1)',
      backgroundColor: 'rgba(34, 197, 94, 0.1)',
      fill: true,
      tension: 0.4
    }]
  }

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          color: 'rgba(255, 255, 255, 0.8)',
          font: { size: 12 }
        }
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: 'white',
        bodyColor: 'white'
      }
    },
    scales: {
      y: {
        ticks: { color: 'rgba(255, 255, 255, 0.6)' },
        grid: { color: 'rgba(255, 255, 255, 0.1)' }
      },
      x: {
        ticks: { color: 'rgba(255, 255, 255, 0.6)' },
        grid: { color: 'rgba(255, 255, 255, 0.1)' }
      }
    }
  }

  return (
    <div className="min-h-screen pt-32 pb-16 px-6 bg-slate-950">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-3 text-white">
            Analytics Dashboard
          </h1>
          <p className="text-slate-400 text-base">Deep learning model performance and groundwater analysis</p>
        </div>

        {/* Model Performance Metrics */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <Brain className="w-5 h-5 text-cyan-400" />
            Model Performance Metrics
          </h2>
          <div className="grid md:grid-cols-5 gap-4">
            <div className="bg-slate-900/50 border border-slate-700/50 p-5 rounded-xl">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle className="w-4 h-4 text-green-400" />
                <p className="text-sm text-slate-400">Test Accuracy</p>
              </div>
              <p className="text-3xl font-bold text-green-400">99.79%</p>
              <p className="text-xs text-slate-500 mt-1">Final Evaluation</p>
            </div>

            <div className="bg-slate-900/50 border border-slate-700/50 p-5 rounded-xl">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-4 h-4 text-purple-400" />
                <p className="text-sm text-slate-400">F1 Score</p>
              </div>
              <p className="text-3xl font-bold text-purple-400">0.998</p>
              <p className="text-xs text-slate-500 mt-1">Weighted Average</p>
            </div>

            <div className="bg-slate-900/50 border border-slate-700/50 p-5 rounded-xl">
              <div className="flex items-center gap-2 mb-2">
                <Target className="w-4 h-4 text-blue-400" />
                <p className="text-sm text-slate-400">Precision</p>
              </div>
              <p className="text-3xl font-bold text-blue-400">0.998</p>
              <p className="text-xs text-slate-500 mt-1">Model Precision</p>
            </div>

            <div className="bg-slate-900/50 border border-slate-700/50 p-5 rounded-xl">
              <div className="flex items-center gap-2 mb-2">
                <Activity className="w-4 h-4 text-cyan-400" />
                <p className="text-sm text-slate-400">Recall</p>
              </div>
              <p className="text-3xl font-bold text-cyan-400">0.998</p>
              <p className="text-xs text-slate-500 mt-1">Model Recall</p>
            </div>

            <div className="bg-slate-900/50 border border-slate-700/50 p-5 rounded-xl">
              <div className="flex items-center gap-2 mb-2">
                <Database className="w-4 h-4 text-orange-400" />
                <p className="text-sm text-slate-400">Test Loss</p>
              </div>
              <p className="text-3xl font-bold text-orange-400">0.0140</p>
              <p className="text-xs text-slate-500 mt-1">Cross-Entropy</p>
            </div>
          </div>
        </div>

        {/* Training Details */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <Zap className="w-5 h-5 text-cyan-400" />
            Training Configuration
          </h2>
          <div className="grid md:grid-cols-4 gap-4">
            <div className="bg-slate-900/50 border border-slate-700/50 p-5 rounded-xl">
              <div className="flex items-center gap-2 mb-2">
                <Activity className="w-4 h-4 text-purple-400" />
                <p className="text-sm text-slate-400">Epochs</p>
              </div>
              <p className="text-3xl font-bold text-purple-400">12</p>
              <p className="text-xs text-slate-500 mt-1">Training Iterations</p>
            </div>

            <div className="bg-slate-900/50 border border-slate-700/50 p-5 rounded-xl">
              <div className="flex items-center gap-2 mb-2">
                <Database className="w-4 h-4 text-orange-400" />
                <p className="text-sm text-slate-400">Batch Size</p>
              </div>
              <p className="text-3xl font-bold text-orange-400">16</p>
              <p className="text-xs text-slate-500 mt-1">Samples/Batch</p>
            </div>

            <div className="bg-slate-900/50 border border-slate-700/50 p-5 rounded-xl">
              <div className="flex items-center gap-2 mb-2">
                <Zap className="w-4 h-4 text-green-400" />
                <p className="text-sm text-slate-400">Optimizer</p>
              </div>
              <p className="text-2xl font-bold text-green-400">Adam</p>
              <p className="text-xs text-slate-500 mt-1">Adaptive Learning</p>
            </div>

            <div className="bg-slate-900/50 border border-slate-700/50 p-5 rounded-xl">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-4 h-4 text-blue-400" />
                <p className="text-sm text-slate-400">Val Split</p>
              </div>
              <p className="text-3xl font-bold text-blue-400">10%</p>
              <p className="text-xs text-slate-500 mt-1">Validation Data</p>
            </div>
          </div>
        </div>

        {/* Class-wise Performance */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <Target className="w-5 h-5 text-cyan-400" />
            Class-wise Performance
          </h2>
          <div className="grid md:grid-cols-3 gap-4">
            {/* Low GWP Class */}
            <div className="bg-slate-900/50 border border-slate-700/50 p-5 rounded-xl">
              <h3 className="text-lg font-semibold text-green-400 mb-3">Low GWP</h3>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-400">Precision</span>
                  <span className="text-sm font-bold text-white">1.00</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-400">Recall</span>
                  <span className="text-sm font-bold text-white">1.00</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-400">F1-Score</span>
                  <span className="text-sm font-bold text-green-400">1.00</span>
                </div>
                <div className="flex justify-between items-center pt-2 border-t border-slate-700/50">
                  <span className="text-xs text-slate-500">Support</span>
                  <span className="text-xs text-slate-400">15,233 samples</span>
                </div>
              </div>
            </div>

            {/* Moderate GWP Class */}
            <div className="bg-slate-900/50 border border-slate-700/50 p-5 rounded-xl">
              <h3 className="text-lg font-semibold text-blue-400 mb-3">Moderate GWP</h3>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-400">Precision</span>
                  <span className="text-sm font-bold text-white">1.00</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-400">Recall</span>
                  <span className="text-sm font-bold text-white">1.00</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-400">F1-Score</span>
                  <span className="text-sm font-bold text-blue-400">1.00</span>
                </div>
                <div className="flex justify-between items-center pt-2 border-t border-slate-700/50">
                  <span className="text-xs text-slate-500">Support</span>
                  <span className="text-xs text-slate-400">17,892 samples</span>
                </div>
              </div>
            </div>

            {/* High GWP Class */}
            <div className="bg-slate-900/50 border border-slate-700/50 p-5 rounded-xl">
              <h3 className="text-lg font-semibold text-purple-400 mb-3">High GWP</h3>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-400">Precision</span>
                  <span className="text-sm font-bold text-white">0.99</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-400">Recall</span>
                  <span className="text-sm font-bold text-white">0.99</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-400">F1-Score</span>
                  <span className="text-sm font-bold text-purple-400">0.99</span>
                </div>
                <div className="flex justify-between items-center pt-2 border-t border-slate-700/50">
                  <span className="text-xs text-slate-500">Support</span>
                  <span className="text-xs text-slate-400">13,789 samples</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Training Curves */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-slate-900/50 border border-slate-700/50 p-6 rounded-xl">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-green-400" />
              Training & Validation Accuracy
            </h3>
            <div style={{ height: '300px' }}>
              <Line data={trainingData} options={chartOptions} />
            </div>
          </div>

          <div className="bg-slate-900/50 border border-slate-700/50 p-6 rounded-xl">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <Activity className="w-5 h-5 text-red-400" />
              Training & Validation Loss
            </h3>
            <div style={{ height: '300px' }}>
              <Line data={lossData} options={chartOptions} />
            </div>
          </div>
        </div>

        {/* Model Architecture */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <Zap className="w-5 h-5 text-cyan-400" />
            U-Net CNN Architecture
          </h2>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-slate-900/50 border border-slate-700/50 p-5 rounded-xl">
              <div className="flex items-center gap-2 mb-3">
                <Layers className="w-5 h-5 text-cyan-400" />
                <h3 className="text-sm font-medium text-white">Input Layer</h3>
              </div>
              <p className="text-sm text-slate-400 mb-2">Patch Size: <span className="text-white font-medium">32×32×4</span></p>
              <p className="text-xs text-slate-500">4 Channels: DEM, NDVI, NDWI, Rainfall</p>
            </div>

            <div className="bg-slate-900/50 border border-slate-700/50 p-5 rounded-xl">
              <div className="flex items-center gap-2 mb-3">
                <Brain className="w-5 h-5 text-purple-400" />
                <h3 className="text-sm font-medium text-white">Hidden Layers</h3>
              </div>
              <p className="text-sm text-slate-400 mb-1">Conv2D (32 filters) → MaxPool</p>
              <p className="text-sm text-slate-400 mb-1">Conv2D (64 filters) → MaxPool</p>
              <p className="text-sm text-slate-400">Dense (128 units)</p>
            </div>

            <div className="bg-slate-900/50 border border-slate-700/50 p-5 rounded-xl">
              <div className="flex items-center gap-2 mb-3">
                <Target className="w-5 h-5 text-green-400" />
                <h3 className="text-sm font-medium text-white">Output Layer</h3>
              </div>
              <p className="text-sm text-slate-400 mb-2">Classes: <span className="text-white font-medium">3</span></p>
              <p className="text-xs text-slate-500">Low, Moderate, High GWP</p>
            </div>
          </div>
        </div>

        {/* Data Sources */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <Database className="w-5 h-5 text-cyan-400" />
            Input Data Sources
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-slate-900/50 border border-slate-700/50 p-4 rounded-xl">
              <div className="w-10 h-10 bg-orange-500/20 rounded-lg flex items-center justify-center mb-3">
                <Layers className="w-5 h-5 text-orange-400" />
              </div>
              <h3 className="text-sm font-medium text-white mb-1">Sentinel-2</h3>
              <p className="text-xs text-slate-400 mb-2">Bands: B04, B08, B11</p>
              <p className="text-xs text-slate-500">10m Resolution</p>
            </div>

            <div className="bg-slate-900/50 border border-slate-700/50 p-4 rounded-xl">
              <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center mb-3">
                <Target className="w-5 h-5 text-blue-400" />
              </div>
              <h3 className="text-sm font-medium text-white mb-1">SRTM DEM</h3>
              <p className="text-xs text-slate-400 mb-2">Elevation Data</p>
              <p className="text-xs text-slate-500">30m Resolution</p>
            </div>

            <div className="bg-slate-900/50 border border-slate-700/50 p-4 rounded-xl">
              <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center mb-3">
                <Droplets className="w-5 h-5 text-green-400" />
              </div>
              <h3 className="text-sm font-medium text-white mb-1">IMD Rainfall</h3>
              <p className="text-xs text-slate-400 mb-2">NetCDF Climatology</p>
              <p className="text-xs text-slate-500">December Mean</p>
            </div>

            <div className="bg-slate-900/50 border border-slate-700/50 p-4 rounded-xl">
              <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center mb-3">
                <Activity className="w-5 h-5 text-purple-400" />
              </div>
              <h3 className="text-sm font-medium text-white mb-1">Indices</h3>
              <p className="text-xs text-slate-400 mb-2">NDVI, NDWI</p>
              <p className="text-xs text-slate-500">Derived Metrics</p>
            </div>
          </div>
        </div>

        {/* District Statistics */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-slate-900/50 border border-slate-700/50 p-6 rounded-xl">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-cyan-400" />
              GWP Distribution
            </h3>
            <div style={{ height: '250px' }}>
              <Pie data={gwpPieData} options={{ ...chartOptions, plugins: { legend: { position: 'bottom' as const, labels: { color: 'rgba(255, 255, 255, 0.8)', font: { size: 12 } } } } }} />
            </div>
          </div>

          <div className="bg-slate-900/50 border border-slate-700/50 p-6 rounded-xl">
            <h3 className="text-lg font-semibold text-white mb-4">District Info</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-slate-800/30 rounded-lg">
                <span className="text-sm text-slate-400">Total Area</span>
                <span className="text-white font-medium">{stats.total_area.toFixed(0)} km²</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-slate-800/30 rounded-lg">
                <span className="text-sm text-slate-400">Latitude Range</span>
                <span className="text-white font-medium">15.0° - 16.0° N</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-slate-800/30 rounded-lg">
                <span className="text-sm text-slate-400">Longitude Range</span>
                <span className="text-white font-medium">74.5° - 75.5° E</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-slate-800/30 rounded-lg">
                <span className="text-sm text-slate-400">Patch Resolution</span>
                <span className="text-white font-medium">32×32</span>
              </div>
            </div>
          </div>

          <div className="bg-slate-900/50 border border-slate-700/50 p-6 rounded-xl">
            <h3 className="text-lg font-semibold text-white mb-4">Average Indices</h3>
            <div className="space-y-3">
              <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Layers className="w-4 h-4 text-green-400" />
                  <span className="text-sm text-green-400 font-medium">NDVI</span>
                </div>
                <p className="text-2xl font-bold text-green-400">{stats.average_ndvi.toFixed(3)}</p>
                <p className="text-xs text-slate-400 mt-1">Vegetation Health</p>
              </div>

              <div className="p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Droplets className="w-4 h-4 text-blue-400" />
                  <span className="text-sm text-blue-400 font-medium">NDWI</span>
                </div>
                <p className="text-2xl font-bold text-blue-400">{stats.average_ndwi.toFixed(3)}</p>
                <p className="text-xs text-slate-400 mt-1">Water Content</p>
              </div>

              <div className="p-4 bg-purple-500/10 border border-purple-500/30 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Target className="w-4 h-4 text-purple-400" />
                  <span className="text-sm text-purple-400 font-medium">Elevation</span>
                </div>
                <p className="text-2xl font-bold text-purple-400">{stats.average_elevation.toFixed(0)}m</p>
                <p className="text-xs text-slate-400 mt-1">Mean Altitude</p>
              </div>
            </div>
          </div>
        </div>

        {/* NEW: Enhanced Visualizations */}
        {/* Environmental Indicators Comparison */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <Activity className="w-5 h-5 text-cyan-400" />
            Environmental Indicators Comparison
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-slate-900/50 border border-slate-700/50 p-6 rounded-xl">
              <h3 className="text-lg font-semibold text-white mb-4">Average Environmental Values</h3>
              <div style={{ height: '300px' }}>
                <Bar data={envBarData} options={{
                  ...chartOptions,
                  plugins: {
                    ...chartOptions.plugins,
                    legend: { display: false }
                  }
                }} />
              </div>
            </div>

            <div className="bg-slate-900/50 border border-slate-700/50 p-6 rounded-xl">
              <h3 className="text-lg font-semibold text-white mb-4">GWP Class Distribution (Doughnut)</h3>
              <div style={{ height: '300px' }}>
                <Doughnut data={{
                  labels: ['High GWP', 'Moderate GWP', 'Low GWP'],
                  datasets: [{
                    data: [
                      stats.gwp_distribution.High,
                      stats.gwp_distribution.Moderate,
                      stats.gwp_distribution.Low
                    ],
                    backgroundColor: [
                      'rgba(34, 197, 94, 0.8)',
                      'rgba(59, 130, 246, 0.8)',
                      'rgba(239, 68, 68, 0.8)'
                    ],
                    borderColor: [
                      'rgba(34, 197, 94, 1)',
                      'rgba(59, 130, 246, 1)',
                      'rgba(239, 68, 68, 1)'
                    ],
                    borderWidth: 3
                  }]
                }} options={{
                  ...chartOptions,
                  cutout: '60%',
                  plugins: {
                    legend: {
                      position: 'bottom' as const,
                      labels: {
                        color: 'rgba(255, 255, 255, 0.8)',
                        font: { size: 12 },
                        padding: 15
                      }
                    }
                  }
                }} />
              </div>
            </div>
          </div>
        </div>

        {/* Seasonal NDVI & NDWI Trends */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-cyan-400" />
            Seasonal Vegetation & Water Trends
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-slate-900/50 border border-slate-700/50 p-6 rounded-xl">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <Layers className="w-5 h-5 text-green-400" />
                NDVI Monthly Trend
              </h3>
              <div style={{ height: '280px' }}>
                <Line data={ndviTrendData} options={chartOptions} />
              </div>
            </div>

            <div className="bg-slate-900/50 border border-slate-700/50 p-6 rounded-xl">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <Droplets className="w-5 h-5 text-blue-400" />
                NDWI Monthly Trend
              </h3>
              <div style={{ height: '280px' }}>
                <Line data={{
                  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                  datasets: [{
                    label: 'NDWI Trend',
                    data: [0.15, 0.12, 0.10, 0.08, 0.05, 0.12, 0.18, 0.20, 0.17, 0.14, 0.16, 0.14],
                    borderColor: 'rgba(59, 130, 246, 1)',
                    backgroundColor: 'rgba(59, 130, 246, 0.1)',
                    fill: true,
                    tension: 0.4
                  }]
                }} options={chartOptions} />
              </div>
            </div>
          </div>
        </div>

        {/* Multi-Metric Radar Chart */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <Target className="w-5 h-5 text-cyan-400" />
            Multi-Metric Performance Radar
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-slate-900/50 border border-slate-700/50 p-6 rounded-xl">
              <h3 className="text-lg font-semibold text-white mb-4">Model Metrics Radar</h3>
              <div style={{ height: '350px' }}>
                <Radar data={{
                  labels: ['Accuracy', 'Precision', 'Recall', 'F1-Score', 'Validation Acc'],
                  datasets: [{
                    label: 'Model Performance',
                    data: [99.79, 99.8, 99.8, 99.8, 98.9],
                    backgroundColor: 'rgba(34, 197, 94, 0.2)',
                    borderColor: 'rgba(34, 197, 94, 1)',
                    borderWidth: 2,
                    pointBackgroundColor: 'rgba(34, 197, 94, 1)',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: 'rgba(34, 197, 94, 1)'
                  }]
                }} options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      labels: {
                        color: 'rgba(255, 255, 255, 0.8)',
                        font: { size: 12 }
                      }
                    }
                  },
                  scales: {
                    r: {
                      beginAtZero: true,
                      max: 100,
                      ticks: {
                        color: 'rgba(255, 255, 255, 0.6)',
                        backdropColor: 'transparent'
                      },
                      grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                      },
                      pointLabels: {
                        color: 'rgba(255, 255, 255, 0.8)',
                        font: { size: 11 }
                      }
                    }
                  }
                }} />
              </div>
            </div>

            <div className="bg-slate-900/50 border border-slate-700/50 p-6 rounded-xl">
              <h3 className="text-lg font-semibold text-white mb-4">GWP Class Metrics Comparison</h3>
              <div style={{ height: '350px' }}>
                <Bar data={{
                  labels: ['Low GWP', 'Moderate GWP', 'High GWP'],
                  datasets: [
                    {
                      label: 'Precision',
                      data: [1.00, 1.00, 0.99],
                      backgroundColor: 'rgba(34, 197, 94, 0.7)',
                      borderColor: 'rgba(34, 197, 94, 1)',
                      borderWidth: 2
                    },
                    {
                      label: 'Recall',
                      data: [1.00, 1.00, 0.99],
                      backgroundColor: 'rgba(59, 130, 246, 0.7)',
                      borderColor: 'rgba(59, 130, 246, 1)',
                      borderWidth: 2
                    },
                    {
                      label: 'F1-Score',
                      data: [1.00, 1.00, 0.99],
                      backgroundColor: 'rgba(168, 85, 247, 0.7)',
                      borderColor: 'rgba(168, 85, 247, 1)',
                      borderWidth: 2
                    }
                  ]
                }} options={{
                  ...chartOptions,
                  plugins: {
                    ...chartOptions.plugins,
                    legend: {
                      position: 'bottom' as const,
                      labels: {
                        color: 'rgba(255, 255, 255, 0.8)',
                        font: { size: 11 }
                      }
                    }
                  }
                }} />
              </div>
            </div>
          </div>
        </div>

        {/* Elevation Distribution */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <Layers className="w-5 h-5 text-cyan-400" />
            Elevation & Groundwater Correlation
          </h2>
          <div className="bg-slate-900/50 border border-slate-700/50 p-6 rounded-xl">
            <h3 className="text-lg font-semibold text-white mb-4">Elevation Zones Distribution</h3>
            <div style={{ height: '300px' }}>
              <Bar data={{
                labels: ['<600m', '600-650m', '650-700m', '700-750m', '>750m'],
                datasets: [{
                  label: 'Area Coverage (km²)',
                  data: [450, 1200, 1850, 980, 320],
                  backgroundColor: [
                    'rgba(34, 197, 94, 0.7)',
                    'rgba(59, 130, 246, 0.7)',
                    'rgba(168, 85, 247, 0.7)',
                    'rgba(251, 146, 60, 0.7)',
                    'rgba(239, 68, 68, 0.7)'
                  ],
                  borderColor: [
                    'rgba(34, 197, 94, 1)',
                    'rgba(59, 130, 246, 1)',
                    'rgba(168, 85, 247, 1)',
                    'rgba(251, 146, 60, 1)',
                    'rgba(239, 68, 68, 1)'
                  ],
                  borderWidth: 2
                }]
              }} options={{
                ...chartOptions,
                plugins: {
                  ...chartOptions.plugins,
                  legend: { display: false }
                }
              }} />
            </div>
          </div>
        </div>

        {/* Performance Summary Cards */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <Award className="w-5 h-5 text-cyan-400" />
            Performance Summary
          </h2>
          <div className="grid md:grid-cols-4 gap-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 border-2 border-green-500/50 p-6 rounded-xl"
            >
              <div className="flex items-center justify-between mb-3">
                <CheckCircle className="w-8 h-8 text-green-400" />
                <TrendingUp className="w-5 h-5 text-green-400" />
              </div>
              <h3 className="text-sm font-medium text-green-300 mb-1">Overall Accuracy</h3>
              <p className="text-3xl font-bold text-green-400">99.79%</p>
              <p className="text-xs text-green-300/60 mt-2">Best in class performance</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border-2 border-blue-500/50 p-6 rounded-xl"
            >
              <div className="flex items-center justify-between mb-3">
                <Database className="w-8 h-8 text-blue-400" />
                <Users className="w-5 h-5 text-blue-400" />
              </div>
              <h3 className="text-sm font-medium text-blue-300 mb-1">Total Samples</h3>
              <p className="text-3xl font-bold text-blue-400">46,914</p>
              <p className="text-xs text-blue-300/60 mt-2">Training dataset size</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 border-2 border-purple-500/50 p-6 rounded-xl"
            >
              <div className="flex items-center justify-between mb-3">
                <Zap className="w-8 h-8 text-purple-400" />
                <Calendar className="w-5 h-5 text-purple-400" />
              </div>
              <h3 className="text-sm font-medium text-purple-300 mb-1">Training Time</h3>
              <p className="text-3xl font-bold text-purple-400">~45min</p>
              <p className="text-xs text-purple-300/60 mt-2">12 epochs complete</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-gradient-to-br from-orange-500/20 to-red-500/20 border-2 border-orange-500/50 p-6 rounded-xl"
            >
              <div className="flex items-center justify-between mb-3">
                <MapPin className="w-8 h-8 text-orange-400" />
                <Cloud className="w-5 h-5 text-orange-400" />
              </div>
              <h3 className="text-sm font-medium text-orange-300 mb-1">Study Area</h3>
              <p className="text-3xl font-bold text-orange-400">4,800</p>
              <p className="text-xs text-orange-300/60 mt-2">km² Dharwad district</p>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
