import { Satellite, Database, Cpu, Target, Award, Users, Droplets, Brain, Zap, Layers, TrendingUp, MapPin, CheckCircle, Globe } from 'lucide-react'
import { motion } from 'framer-motion'

const About = () => {
  return (
    <div className='min-h-screen pt-32 pb-16 px-6 bg-slate-950 relative overflow-hidden'>
      {/* Animated background elements */}
      <div className="fixed inset-0 opacity-20">
        <div className="absolute top-20 left-10 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
        <div className="absolute top-40 right-10 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-15 animate-blob animation-delay-2000" />
        <div className="absolute bottom-20 left-1/2 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-4000" />
      </div>

      <div className='max-w-7xl mx-auto relative z-10'>
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }} 
          animate={{ opacity: 1, y: 0 }} 
          className='mb-16 text-center'
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
            className='w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-xl shadow-cyan-500/40'
          >
            <Droplets className='w-12 h-12 text-white' />
          </motion.div>
          <h1 className='text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500 bg-clip-text text-transparent tracking-tight'>
            About HydroSense
          </h1>
          <p className='text-slate-300 text-xl max-w-4xl mx-auto leading-relaxed'>
            Advanced Deep Learning-powered groundwater prediction system leveraging satellite imagery and environmental data to revolutionize water resource management
          </p>
        </motion.div>

        {/* Main Content Grid */}
        <div className='space-y-8'>
          {/* What is HydroSense - Full Width Hero */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ delay: 0.1 }}
            className='bg-gradient-to-br from-cyan-500/10 via-blue-500/5 to-transparent border border-cyan-500/20 p-10 rounded-3xl shadow-2xl relative overflow-hidden'
          >
            <div className='absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl -translate-y-32 translate-x-32' />
            <div className='relative'>
              <div className='flex items-center gap-4 mb-6'>
                <div className='w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg'>
                  <Brain className='w-8 h-8 text-white' />
                </div>
                <h2 className='text-4xl font-bold text-white tracking-tight'>What is HydroSense?</h2>
              </div>
              <div className='grid md:grid-cols-3 gap-8'>
                <div className='md:col-span-2 space-y-4'>
                  <p className='text-slate-200 leading-relaxed text-lg'>
                    HydroSense is a cutting-edge <span className='text-cyan-400 font-bold'>Deep Learning-powered groundwater prediction platform</span> that combines advanced neural networks with multi-source environmental data to accurately map groundwater potential across <span className='text-blue-400 font-bold'>Dharwad District, Karnataka, India</span>.
                  </p>
                  <p className='text-slate-300 leading-relaxed text-lg'>
                    Using a sophisticated <span className='text-purple-400 font-semibold'>U-Net Convolutional Neural Network (CNN)</span>, our system analyzes Sentinel-2 satellite imagery, digital elevation models, rainfall patterns, and spectral vegetation indices to classify regions into Low, Moderate, and High groundwater potential zones.
                  </p>
                  <p className='text-slate-300 leading-relaxed text-lg'>
                    With an impressive <span className='text-green-400 font-bold text-xl'>99.34% test accuracy</span> and <span className='text-green-400 font-bold text-xl'>0.998 F1-score</span>, HydroSense provides actionable insights for farmers, policymakers, and water resource managers to make data-driven decisions for sustainable groundwater management.
                  </p>
                </div>
                <div className='bg-slate-900/60 backdrop-blur-sm border border-slate-700 rounded-2xl p-6 space-y-4'>
                  <h3 className='text-cyan-400 font-bold text-lg mb-4 flex items-center gap-2'>
                    <MapPin className='w-5 h-5' />
                    Study Area
                  </h3>
                  <div className='space-y-3 text-slate-300'>
                    <div className='flex justify-between items-center pb-2 border-b border-slate-700/50'>
                      <span className='text-sm text-slate-400'>Location</span>
                      <span className='font-semibold text-white'>Dharwad, Karnataka</span>
                    </div>
                    <div className='flex justify-between items-center pb-2 border-b border-slate-700/50'>
                      <span className='text-sm text-slate-400'>Coverage Area</span>
                      <span className='font-semibold text-cyan-400'>4,260 km²</span>
                    </div>
                    <div className='flex justify-between items-center pb-2 border-b border-slate-700/50'>
                      <span className='text-sm text-slate-400'>Resolution</span>
                      <span className='font-semibold text-blue-400'>10m/pixel</span>
                    </div>
                    <div className='flex justify-between items-center pb-2 border-b border-slate-700/50'>
                      <span className='text-sm text-slate-400'>Coordinates</span>
                      <span className='font-semibold text-purple-400'>15.45°N, 75.00°E</span>
                    </div>
                    <div className='flex justify-between items-center'>
                      <span className='text-sm text-slate-400'>Classes</span>
                      <span className='font-semibold text-green-400'>3 GWP Zones</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Model Architecture & Performance - Side by Side */}
          <div className='grid md:grid-cols-2 gap-6'>
            <motion.div 
              initial={{ opacity: 0, x: -20 }} 
              animate={{ opacity: 1, x: 0 }} 
              transition={{ delay: 0.2 }}
              className='bg-slate-900/60 backdrop-blur-xl border border-slate-700 p-8 rounded-2xl shadow-xl'
            >
              <div className='flex items-center gap-3 mb-6'>
                <div className='w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center'>
                  <Layers className='w-7 h-7 text-white' />
                </div>
                <h2 className='text-2xl font-bold text-white tracking-tight'>U-Net CNN Architecture</h2>
              </div>
              <div className='space-y-4'>
                <div className='bg-slate-800/50 p-4 rounded-xl border border-slate-700'>
                  <div className='flex items-center gap-2 mb-2'>
                    <div className='w-2 h-2 bg-cyan-400 rounded-full'></div>
                    <h3 className='text-cyan-400 font-semibold'>Input Layer</h3>
                  </div>
                  <p className='text-slate-300 text-sm'>32×32×4 patches (DEM, NDVI, NDWI, Rainfall)</p>
                </div>
                <div className='bg-slate-800/50 p-4 rounded-xl border border-slate-700'>
                  <div className='flex items-center gap-2 mb-2'>
                    <div className='w-2 h-2 bg-blue-400 rounded-full'></div>
                    <h3 className='text-blue-400 font-semibold'>Hidden Layers</h3>
                  </div>
                  <p className='text-slate-300 text-sm'>Conv2D (32→64 filters) + MaxPooling + Dense (128 neurons)</p>
                </div>
                <div className='bg-slate-800/50 p-4 rounded-xl border border-slate-700'>
                  <div className='flex items-center gap-2 mb-2'>
                    <div className='w-2 h-2 bg-green-400 rounded-full'></div>
                    <h3 className='text-green-400 font-semibold'>Output Layer</h3>
                  </div>
                  <p className='text-slate-300 text-sm'>3 classes: Low, Moderate, High GWP (Softmax activation)</p>
                </div>
                <div className='bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 p-4 rounded-xl mt-4'>
                  <div className='flex items-center gap-2 mb-2'>
                    <Zap className='w-4 h-4 text-yellow-400' />
                    <h3 className='text-purple-400 font-semibold'>Training Config</h3>
                  </div>
                  <div className='grid grid-cols-2 gap-2 text-sm mt-3'>
                    <div><span className='text-slate-400'>Optimizer:</span> <span className='text-white font-semibold'>Adam</span></div>
                    <div><span className='text-slate-400'>Epochs:</span> <span className='text-white font-semibold'>12</span></div>
                    <div><span className='text-slate-400'>Batch Size:</span> <span className='text-white font-semibold'>16</span></div>
                    <div><span className='text-slate-400'>Val Split:</span> <span className='text-white font-semibold'>10%</span></div>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 20 }} 
              animate={{ opacity: 1, x: 0 }} 
              transition={{ delay: 0.3 }}
              className='bg-slate-900/60 backdrop-blur-xl border border-slate-700 p-8 rounded-2xl shadow-xl'
            >
              <div className='flex items-center gap-3 mb-6'>
                <div className='w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center'>
                  <TrendingUp className='w-7 h-7 text-white' />
                </div>
                <h2 className='text-2xl font-bold text-white tracking-tight'>Model Performance</h2>
              </div>
              <div className='space-y-4'>
                <div className='bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/30 p-5 rounded-xl'>
                  <div className='flex justify-between items-center mb-2'>
                    <span className='text-slate-300 font-medium'>Test Accuracy</span>
                    <span className='text-3xl font-bold text-green-400'>99.79%</span>
                  </div>
                  <div className='w-full bg-slate-700/50 h-2 rounded-full overflow-hidden'>
                    <div className='bg-gradient-to-r from-green-400 to-emerald-500 h-full' style={{width: '99.79%'}}></div>
                  </div>
                </div>
                <div className='bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/30 p-5 rounded-xl'>
                  <div className='flex justify-between items-center mb-2'>
                    <span className='text-slate-300 font-medium'>F1-Score (Weighted)</span>
                    <span className='text-3xl font-bold text-purple-400'>0.998</span>
                  </div>
                  <div className='w-full bg-slate-700/50 h-2 rounded-full overflow-hidden'>
                    <div className='bg-gradient-to-r from-purple-400 to-pink-500 h-full' style={{width: '99.8%'}}></div>
                  </div>
                </div>
                <div className='grid grid-cols-2 gap-4'>
                  <div className='bg-slate-800/50 p-4 rounded-xl border border-slate-700'>
                    <p className='text-slate-400 text-sm mb-1'>Precision</p>
                    <p className='text-2xl font-bold text-blue-400'>0.998</p>
                  </div>
                  <div className='bg-slate-800/50 p-4 rounded-xl border border-slate-700'>
                    <p className='text-slate-400 text-sm mb-1'>Recall</p>
                    <p className='text-2xl font-bold text-cyan-400'>0.998</p>
                  </div>
                </div>
                <div className='bg-slate-800/50 p-4 rounded-xl border border-slate-700'>
                  <p className='text-slate-400 text-sm mb-1'>Test Loss (Cross-Entropy)</p>
                  <p className='text-2xl font-bold text-orange-400'>0.0140</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Data Sources & Spectral Indices */}
          <div className='grid md:grid-cols-2 gap-6'>
            <motion.div 
              initial={{ opacity: 0, x: -20 }} 
              animate={{ opacity: 1, x: 0 }} 
              transition={{ delay: 0.4 }}
              className='bg-slate-900/60 backdrop-blur-xl border border-slate-700 p-7 rounded-2xl shadow-xl'
            >
              <div className='flex items-center gap-3 mb-6'>
                <div className='w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center'>
                  <Satellite className='w-6 h-6 text-white' />
                </div>
                <h2 className='text-2xl font-bold text-white tracking-tight'>Multi-Source Data</h2>
              </div>
              <div className='space-y-3'>
                <div className='bg-slate-800/50 p-4 rounded-xl border border-slate-700 hover:border-cyan-500/30 transition-all'>
                  <div className='flex items-center gap-2 mb-2'>
                    <Globe className='w-4 h-4 text-cyan-400' />
                    <h3 className='text-cyan-400 font-semibold'>Sentinel-2 Imagery</h3>
                  </div>
                  <p className='text-slate-400 text-sm'>Multi-spectral satellite data (B04, B08, B11 bands) at 10m resolution for vegetation and water analysis</p>
                </div>
                <div className='bg-slate-800/50 p-4 rounded-xl border border-slate-700 hover:border-blue-500/30 transition-all'>
                  <div className='flex items-center gap-2 mb-2'>
                    <MapPin className='w-4 h-4 text-blue-400' />
                    <h3 className='text-blue-400 font-semibold'>SRTM Digital Elevation Model</h3>
                  </div>
                  <p className='text-slate-400 text-sm'>30m resolution elevation data for terrain analysis and slope calculations</p>
                </div>
                <div className='bg-slate-800/50 p-4 rounded-xl border border-slate-700 hover:border-green-500/30 transition-all'>
                  <div className='flex items-center gap-2 mb-2'>
                    <Droplets className='w-4 h-4 text-green-400' />
                    <h3 className='text-green-400 font-semibold'>IMD Rainfall Data</h3>
                  </div>
                  <p className='text-slate-400 text-sm'>Historical precipitation patterns from India Meteorological Department (NetCDF format)</p>
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 20 }} 
              animate={{ opacity: 1, x: 0 }} 
              transition={{ delay: 0.5 }}
              className='bg-slate-900/60 backdrop-blur-xl border border-slate-700 p-7 rounded-2xl shadow-xl'
            >
              <div className='flex items-center gap-3 mb-6'>
                <div className='w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center'>
                  <Cpu className='w-6 h-6 text-white' />
                </div>
                <h2 className='text-2xl font-bold text-white tracking-tight'>Spectral Indices</h2>
              </div>
              <div className='space-y-3'>
                <div className='bg-slate-800/50 p-4 rounded-xl border border-slate-700 hover:border-green-500/30 transition-all'>
                  <div className='flex items-center justify-between mb-2'>
                    <h3 className='text-green-400 font-semibold'>NDVI</h3>
                    <span className='text-xs text-slate-500 font-mono'>Normalized Difference Vegetation Index</span>
                  </div>
                  <p className='text-slate-400 text-sm'>Measures vegetation health and density using NIR and Red bands</p>
                  <p className='text-xs text-slate-500 mt-2 font-mono'>NDVI = (B08 - B04) / (B08 + B04)</p>
                </div>
                <div className='bg-slate-800/50 p-4 rounded-xl border border-slate-700 hover:border-blue-500/30 transition-all'>
                  <div className='flex items-center justify-between mb-2'>
                    <h3 className='text-blue-400 font-semibold'>NDWI</h3>
                    <span className='text-xs text-slate-500 font-mono'>Normalized Difference Water Index</span>
                  </div>
                  <p className='text-slate-400 text-sm'>Detects water content in vegetation and water bodies</p>
                  <p className='text-xs text-slate-500 mt-2 font-mono'>NDWI = (B08 - B11) / (B08 + B11)</p>
                </div>
                <div className='bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 p-4 rounded-xl'>
                  <p className='text-xs text-slate-400 leading-relaxed'>
                    <CheckCircle className='w-3 h-3 inline mr-1 text-cyan-400' />
                    These indices enhance groundwater prediction by capturing surface moisture, vegetation stress, and water availability patterns
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Applications - 3 Cards */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ delay: 0.6 }}
          >
            <h2 className='text-3xl font-bold text-white mb-6 text-center tracking-tight'>Real-World Applications</h2>
            <div className='grid md:grid-cols-3 gap-6'>
              <div className='bg-gradient-to-br from-green-500/10 to-emerald-600/5 border border-green-500/20 p-7 rounded-2xl hover:border-green-500/40 transition-all'>
                <div className='w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mb-5 shadow-lg shadow-green-500/30'>
                  <Users className='w-8 h-8 text-white' />
                </div>
                <h3 className='text-xl font-bold text-white mb-3'>Farmers & Agriculture</h3>
                <ul className='space-y-2 text-slate-300'>
                  <li className='flex items-start gap-2 text-sm'>
                    <CheckCircle className='w-4 h-4 text-green-400 mt-0.5 flex-shrink-0' />
                    <span>Identify optimal borewell drilling locations</span>
                  </li>
                  <li className='flex items-start gap-2 text-sm'>
                    <CheckCircle className='w-4 h-4 text-green-400 mt-0.5 flex-shrink-0' />
                    <span>Plan sustainable irrigation strategies</span>
                  </li>
                  <li className='flex items-start gap-2 text-sm'>
                    <CheckCircle className='w-4 h-4 text-green-400 mt-0.5 flex-shrink-0' />
                    <span>Reduce drilling costs and failures</span>
                  </li>
                </ul>
              </div>

              <div className='bg-gradient-to-br from-blue-500/10 to-cyan-600/5 border border-blue-500/20 p-7 rounded-2xl hover:border-blue-500/40 transition-all'>
                <div className='w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl flex items-center justify-center mb-5 shadow-lg shadow-blue-500/30'>
                  <Database className='w-8 h-8 text-white' />
                </div>
                <h3 className='text-xl font-bold text-white mb-3'>Government & Policy</h3>
                <ul className='space-y-2 text-slate-300'>
                  <li className='flex items-start gap-2 text-sm'>
                    <CheckCircle className='w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0' />
                    <span>Data-driven water resource management</span>
                  </li>
                  <li className='flex items-start gap-2 text-sm'>
                    <CheckCircle className='w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0' />
                    <span>Regional groundwater conservation planning</span>
                  </li>
                  <li className='flex items-start gap-2 text-sm'>
                    <CheckCircle className='w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0' />
                    <span>Evidence-based policy decisions</span>
                  </li>
                </ul>
              </div>

              <div className='bg-gradient-to-br from-purple-500/10 to-indigo-600/5 border border-purple-500/20 p-7 rounded-2xl hover:border-purple-500/40 transition-all'>
                <div className='w-16 h-16 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl flex items-center justify-center mb-5 shadow-lg shadow-purple-500/30'>
                  <Target className='w-8 h-8 text-white' />
                </div>
                <h3 className='text-xl font-bold text-white mb-3'>Urban Planning</h3>
                <ul className='space-y-2 text-slate-300'>
                  <li className='flex items-start gap-2 text-sm'>
                    <CheckCircle className='w-4 h-4 text-purple-400 mt-0.5 flex-shrink-0' />
                    <span>Sustainable urban development planning</span>
                  </li>
                  <li className='flex items-start gap-2 text-sm'>
                    <CheckCircle className='w-4 h-4 text-purple-400 mt-0.5 flex-shrink-0' />
                    <span>Infrastructure placement optimization</span>
                  </li>
                  <li className='flex items-start gap-2 text-sm'>
                    <CheckCircle className='w-4 h-4 text-purple-400 mt-0.5 flex-shrink-0' />
                    <span>Environmental impact assessment</span>
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>

          {/* Class-wise Performance Metrics */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ delay: 0.7 }}
          >
            <h2 className='text-3xl font-bold text-white mb-6 text-center tracking-tight'>Classification Performance by GWP Class</h2>
            <div className='grid md:grid-cols-3 gap-6'>
              {/* Low GWP */}
              <div className='bg-gradient-to-br from-slate-900 to-slate-800/50 border border-green-500/30 p-6 rounded-2xl'>
                <div className='flex items-center gap-3 mb-4'>
                  <div className='w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center'>
                    <CheckCircle className='w-6 h-6 text-white' />
                  </div>
                  <h3 className='text-xl font-bold text-green-400'>Low GWP</h3>
                </div>
                <div className='space-y-3'>
                  <div className='flex justify-between items-center'>
                    <span className='text-slate-400 text-sm'>Precision</span>
                    <span className='text-2xl font-bold text-white'>1.00</span>
                  </div>
                  <div className='flex justify-between items-center'>
                    <span className='text-slate-400 text-sm'>Recall</span>
                    <span className='text-2xl font-bold text-white'>1.00</span>
                  </div>
                  <div className='flex justify-between items-center'>
                    <span className='text-slate-400 text-sm'>F1-Score</span>
                    <span className='text-2xl font-bold text-green-400'>1.00</span>
                  </div>
                  <div className='pt-3 border-t border-slate-700/50'>
                    <span className='text-xs text-slate-500'>Support: </span>
                    <span className='text-sm text-slate-300 font-semibold'>15,233 samples</span>
                  </div>
                </div>
              </div>

              {/* Moderate GWP */}
              <div className='bg-gradient-to-br from-slate-900 to-slate-800/50 border border-blue-500/30 p-6 rounded-2xl'>
                <div className='flex items-center gap-3 mb-4'>
                  <div className='w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center'>
                    <CheckCircle className='w-6 h-6 text-white' />
                  </div>
                  <h3 className='text-xl font-bold text-blue-400'>Moderate GWP</h3>
                </div>
                <div className='space-y-3'>
                  <div className='flex justify-between items-center'>
                    <span className='text-slate-400 text-sm'>Precision</span>
                    <span className='text-2xl font-bold text-white'>1.00</span>
                  </div>
                  <div className='flex justify-between items-center'>
                    <span className='text-slate-400 text-sm'>Recall</span>
                    <span className='text-2xl font-bold text-white'>1.00</span>
                  </div>
                  <div className='flex justify-between items-center'>
                    <span className='text-slate-400 text-sm'>F1-Score</span>
                    <span className='text-2xl font-bold text-blue-400'>1.00</span>
                  </div>
                  <div className='pt-3 border-t border-slate-700/50'>
                    <span className='text-xs text-slate-500'>Support: </span>
                    <span className='text-sm text-slate-300 font-semibold'>17,892 samples</span>
                  </div>
                </div>
              </div>

              {/* High GWP */}
              <div className='bg-gradient-to-br from-slate-900 to-slate-800/50 border border-purple-500/30 p-6 rounded-2xl'>
                <div className='flex items-center gap-3 mb-4'>
                  <div className='w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center'>
                    <CheckCircle className='w-6 h-6 text-white' />
                  </div>
                  <h3 className='text-xl font-bold text-purple-400'>High GWP</h3>
                </div>
                <div className='space-y-3'>
                  <div className='flex justify-between items-center'>
                    <span className='text-slate-400 text-sm'>Precision</span>
                    <span className='text-2xl font-bold text-white'>0.99</span>
                  </div>
                  <div className='flex justify-between items-center'>
                    <span className='text-slate-400 text-sm'>Recall</span>
                    <span className='text-2xl font-bold text-white'>0.99</span>
                  </div>
                  <div className='flex justify-between items-center'>
                    <span className='text-slate-400 text-sm'>F1-Score</span>
                    <span className='text-2xl font-bold text-purple-400'>0.99</span>
                  </div>
                  <div className='pt-3 border-t border-slate-700/50'>
                    <span className='text-xs text-slate-500'>Support: </span>
                    <span className='text-sm text-slate-300 font-semibold'>13,789 samples</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Overall Performance Summary */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ delay: 0.8 }}
            className='bg-gradient-to-br from-slate-900 to-slate-800/50 border border-slate-700 p-10 rounded-3xl shadow-2xl'
          >
            <div className='flex items-center gap-4 mb-8 justify-center'>
              <div className='w-16 h-16 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-2xl flex items-center justify-center shadow-lg'>
                <Award className='w-8 h-8 text-white' />
              </div>
              <h2 className='text-4xl font-bold text-white tracking-tight'>Performance Summary</h2>
            </div>
            <div className='grid md:grid-cols-5 gap-6'>
              <div className='text-center bg-slate-800/30 p-6 rounded-2xl border border-slate-700/50'>
                <div className='text-5xl font-bold bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent mb-2'>99.79%</div>
                <p className='text-slate-300 font-medium'>Test Accuracy</p>
              </div>
              <div className='text-center bg-slate-800/30 p-6 rounded-2xl border border-slate-700/50'>
                <div className='text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent mb-2'>0.998</div>
                <p className='text-slate-300 font-medium'>F1-Score</p>
              </div>
              <div className='text-center bg-slate-800/30 p-6 rounded-2xl border border-slate-700/50'>
                <div className='text-5xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-2'>4,260</div>
                <p className='text-slate-300 font-medium'>km² Coverage</p>
              </div>
              <div className='text-center bg-slate-800/30 p-6 rounded-2xl border border-slate-700/50'>
                <div className='text-5xl font-bold bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent mb-2'>10m</div>
                <p className='text-slate-300 font-medium'>Resolution</p>
              </div>
              <div className='text-center bg-slate-800/30 p-6 rounded-2xl border border-slate-700/50'>
                <div className='text-5xl font-bold bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent mb-2'>46.9K</div>
                <p className='text-slate-300 font-medium'>Test Samples</p>
              </div>
            </div>
          </motion.div>

          {/* Tech Stack Footer */}
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            transition={{ delay: 0.9 }}
            className='bg-slate-900/30 border border-slate-800 p-8 rounded-2xl'
          >
            <h3 className='text-center text-slate-300 mb-6 text-xl font-bold tracking-tight'>Technology Stack</h3>
            <div className='grid md:grid-cols-4 gap-6 mb-6'>
              <div>
                <h4 className='text-cyan-400 font-semibold mb-3 text-sm uppercase tracking-wide'>Machine Learning</h4>
                <div className='flex flex-wrap gap-2'>
                  {['Python', 'TensorFlow', 'Keras', 'NumPy', 'Scikit-learn'].map((tech, i) => (
                    <span key={i} className='px-3 py-1.5 bg-slate-800/50 border border-slate-700 rounded-lg text-slate-300 text-xs font-medium hover:border-cyan-500/30 hover:text-cyan-400 transition-all'>
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <h4 className='text-blue-400 font-semibold mb-3 text-sm uppercase tracking-wide'>Geospatial</h4>
                <div className='flex flex-wrap gap-2'>
                  {['GDAL', 'Rasterio', 'Shapely', 'Fiona', 'GeoPandas'].map((tech, i) => (
                    <span key={i} className='px-3 py-1.5 bg-slate-800/50 border border-slate-700 rounded-lg text-slate-300 text-xs font-medium hover:border-blue-500/30 hover:text-blue-400 transition-all'>
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <h4 className='text-purple-400 font-semibold mb-3 text-sm uppercase tracking-wide'>Backend</h4>
                <div className='flex flex-wrap gap-2'>
                  {['Flask', 'REST API', 'CORS', 'JSON'].map((tech, i) => (
                    <span key={i} className='px-3 py-1.5 bg-slate-800/50 border border-slate-700 rounded-lg text-slate-300 text-xs font-medium hover:border-purple-500/30 hover:text-purple-400 transition-all'>
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <h4 className='text-green-400 font-semibold mb-3 text-sm uppercase tracking-wide'>Frontend</h4>
                <div className='flex flex-wrap gap-2'>
                  {['React', 'TypeScript', 'Vite', 'TailwindCSS', 'Leaflet', 'Chart.js', 'Framer Motion'].map((tech, i) => (
                    <span key={i} className='px-3 py-1.5 bg-slate-800/50 border border-slate-700 rounded-lg text-slate-300 text-xs font-medium hover:border-green-500/30 hover:text-green-400 transition-all'>
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
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

export default About
