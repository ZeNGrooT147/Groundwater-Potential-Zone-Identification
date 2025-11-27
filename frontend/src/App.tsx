import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import MapViewer from './pages/MapViewer'
import Dashboard from './pages/Dashboard'
import About from './pages/About'
import BatchAnalysis from './pages/BatchAnalysis'
import LocationComparison from './pages/LocationComparison'
import ExplainableAI from './pages/ExplainableAI'
import AdvancedFeatures from './pages/AdvancedFeatures'
import Navbar from './components/Navbar'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-slate-950">
        <Navbar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/map" element={<MapViewer />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/about" element={<About />} />
          <Route path="/batch" element={<BatchAnalysis />} />
          <Route path="/compare" element={<LocationComparison />} />
          <Route path="/xai" element={<ExplainableAI />} />
          <Route path="/advanced" element={<AdvancedFeatures />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
