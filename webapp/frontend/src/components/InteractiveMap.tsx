import { useEffect } from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents } from 'react-leaflet'
import L from 'leaflet'
import { Locate } from 'lucide-react'
import 'leaflet/dist/leaflet.css'

// Fix Leaflet default marker icon issue with Vite
delete (L.Icon.Default.prototype as any)._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
})

interface InteractiveMapProps {
  onLocationSelect?: (lat: number, lon: number) => void
  selectedLat?: number
  selectedLon?: number
}

// Component to handle recentering
function RecenterButton() {
  const map = useMap()
  
  const recenterToDharwad = () => {
    map.setView([15.5, 75.0], 10)
  }
  
  return (
    <button
      onClick={recenterToDharwad}
      className="absolute top-4 right-4 z-[1000] bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white px-4 py-2 rounded-lg shadow-lg flex items-center gap-2 font-semibold text-sm transition-all hover:scale-105"
      title="Recenter to Dharwad District"
    >
      <Locate className="w-4 h-4" />
      Back to Dharwad
    </button>
  )
}

function MapClickHandler({ onLocationSelect }: { onLocationSelect?: (lat: number, lon: number) => void }) {
  useMapEvents({
    click(e: any) {
      const { lat, lng } = e.latlng
      if (onLocationSelect) {
        onLocationSelect(lat, lng)
      }
    },
  })
  return null
}

function MapUpdater({ lat, lon }: { lat: number; lon: number }) {
  const map = useMap()
  
  useEffect(() => {
    if (lat && lon) {
      map.setView([lat, lon], 12)
    }
  }, [lat, lon, map])
  
  return null
}

const InteractiveMap = ({ onLocationSelect, selectedLat, selectedLon }: InteractiveMapProps) => {
  const center: [number, number] = [
    selectedLat || 15.5,
    selectedLon || 75.0
  ]
  
  // Custom marker icons for different GWP classes
  const createColoredIcon = (color: string) => {
    return L.divIcon({
      className: 'custom-div-icon',
      html: `<div style="background-color: ${color}; width: 24px; height: 24px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 8px rgba(0,0,0,0.3);"></div>`,
      iconSize: [24, 24],
      iconAnchor: [12, 12]
    })
  }

  return (
    <div className="w-full h-full rounded-2xl overflow-hidden" style={{ minHeight: '500px' }}>
      <MapContainer
        center={center}
        zoom={10}
        scrollWheelZoom={true}
        style={{ height: '100%', width: '100%' }}
        className="z-0"
      >
        {/* Base map tiles from OpenStreetMap */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {/* Satellite imagery option */}
        <TileLayer
          attribution='Imagery &copy; <a href="https://www.esri.com/">Esri</a>'
          url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
          opacity={0.5}
        />
        
        {/* Click handler */}
        <MapClickHandler onLocationSelect={onLocationSelect} />
        
        {/* Recenter button */}
        <RecenterButton />
        
        {/* Map updater when coordinates change */}
        {selectedLat && selectedLon && (
          <MapUpdater lat={selectedLat} lon={selectedLon} />
        )}
        
        {/* Selected location marker */}
        {selectedLat && selectedLon && (
          <Marker 
            position={[selectedLat, selectedLon]}
            icon={createColoredIcon('#60a5fa')}
          >
            <Popup>
              <div className="text-gray-900 font-semibold">
                <p>Selected Location</p>
                <p className="text-sm">Lat: {selectedLat.toFixed(4)}</p>
                <p className="text-sm">Lon: {selectedLon.toFixed(4)}</p>
              </div>
            </Popup>
          </Marker>
        )}
        
        {/* Dharwad district bounds rectangle */}
        {/* You can add a rectangle here to show the district bounds */}
      </MapContainer>
      
      <style>{`
        .leaflet-container {
          background: #1e293b;
        }
        .custom-div-icon {
          background: transparent;
          border: none;
        }
      `}</style>
    </div>
  )
}

export default InteractiveMap
