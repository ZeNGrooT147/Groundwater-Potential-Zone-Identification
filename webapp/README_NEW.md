# 🌊 Groundwater Potential Prediction - Full Stack Application

## ✅ Complete Setup - Backend (Flask) + Frontend (React/TypeScript)

### 📁 Project Structure
```
webapp/
├── app_hybrid.py           # Flask API backend (port 5000)
├── START_ALL_SERVERS.bat   # 🚀 Double-click to start both servers!
├── gwp_overlay.png          # Groundwater potential map data
├── frontend/                # React/TypeScript/Vite frontend (port 3000)
│   ├── src/
│   │   ├── pages/
│   │   │   ├── LandingPage.tsx    # Home page with animations
│   │   │   ├── MapViewer.tsx      # Interactive Leaflet map
│   │   │   ├── Dashboard.tsx      # Analytics charts
│   │   │   └── About.tsx          # Project info
│   │   ├── components/
│   │   │   ├── Navbar.tsx
│   │   │   └── InteractiveMap.tsx # Leaflet map component
│   │   ├── App.tsx
│   │   └── main.tsx
│   └── package.json
└── templates/               # ❌ OLD (disabled - using React now)
```

### 🚀 Quick Start

**Option 1: Auto-Start (Easiest)**
```bash
# Just double-click this file:
START_ALL_SERVERS.bat
```

**Option 2: Manual Start**
```bash
# Terminal 1 - Backend
cd webapp
python app_hybrid.py

# Terminal 2 - Frontend  
cd webapp/frontend
npm run dev
```

### 🌐 Access the Application

- **Frontend:** http://localhost:3000 (React App - Main UI)
- **Backend API:** http://localhost:5000 (Flask - API Only)

### 📊 Features

✅ **Landing Page** - Beautiful animated particles and glassmorphism effects
✅ **Interactive Map** - Leaflet map with click-to-select coordinates (NO API KEY NEEDED!)
✅ **Coordinate Search** - Enter lat/lon and get groundwater predictions
✅ **Real-Time Predictions** - NDVI, NDWI, Elevation, GWP classification
✅ **Dashboard** - Analytics with Chart.js visualizations
✅ **About Page** - Comprehensive project information
✅ **API Integration** - React frontend calls Flask backend seamlessly

### 🔧 Backend API Endpoints

All API endpoints available at `http://localhost:5000/api/`

- `POST /api/predict` - Get groundwater prediction for coordinates
- `GET /api/statistics` - Get analytics data for dashboard
- `GET /api/map-bounds` - Get map boundary information
- `POST /api/borewell-predict` - Predict borewell depth
- `POST /api/download-report` - Generate PDF report
- `GET /gwp_overlay.png` - Get groundwater potential map image

### 📦 Technology Stack

**Backend:**
- Flask 3.0.0
- Flask-CORS (for cross-origin requests)
- Pillow (image processing)
- NumPy
- Python 3.14.0

**Frontend:**
- React 18.2.0
- TypeScript 5.2.2
- Vite 5.4.21
- TailwindCSS 3.4.0
- Leaflet & react-leaflet 4.2.1 (interactive maps)
- Chart.js 4.4.1 (data visualization)
- Framer Motion 10.16.16 (animations)
- Axios 1.6.2 (HTTP requests)
- React Router DOM 6.20.0 (routing)

### 🗺️ Map Features

- **OpenStreetMap Base Layer** - Free, no API key required
- **Satellite Imagery Overlay** - ESRI World Imagery (50% opacity)
- **Click-to-Select** - Click anywhere on map to set coordinates
- **Custom Markers** - Blue marker shows selected location
- **Interactive Popup** - Shows lat/lon when clicking marker
- **Zoom & Pan** - Full map controls with mouse/touchpad

### 📝 Changes from Old Version

❌ **Removed:**
- Old Flask HTML templates (index.html, dashboard.html, about.html)
- Old Flask routes serving HTML (`/`, `/dashboard`, `/about`)
- Server-side rendering

✅ **Added:**
- Modern React single-page application
- TypeScript for type safety
- Interactive Leaflet maps (instead of static placeholders)
- Real-time API integration
- Beautiful animations and transitions
- Responsive design with TailwindCSS
- Component-based architecture

### 🐛 Troubleshooting

**Frontend not loading?**
```bash
cd frontend
npm install --legacy-peer-deps
npm run dev
```

**Backend API not responding?**
```bash
# Make sure Flask is running
python app_hybrid.py
```

**Port conflicts?**
- Frontend default: 3000 (Vite will auto-switch to 3001, 3002, etc.)
- Backend default: 5000 (change in app_hybrid.py if needed)

**Map not showing?**
- Check browser console for errors (F12)
- Verify Leaflet CSS is loading
- Clear browser cache (Ctrl + Shift + R)

### 📸 Screenshots

**Landing Page:**
- Animated particle background
- Glassmorphic cards
- Smooth gradient animations

**Map Viewer:**
- Full interactive Leaflet map
- Coordinate input fields
- Real-time prediction results
- NDVI, NDWI, Elevation display
- AI-generated explanations

**Dashboard:**
- Pie chart (GWP distribution)
- Bar chart (Environmental indicators)
- Line chart (NDVI trends)
- Real-time data from backend API

### 🎯 Development Notes

- **Hot Module Reload:** Vite automatically reloads changes
- **CORS Enabled:** Flask has CORS configured for frontend requests
- **TypeScript:** Full type checking for better code quality
- **React Leaflet v4.2.1:** Downgraded from v5 for React 18 compatibility
- **Legacy Peer Deps:** Some packages require `--legacy-peer-deps` flag

### 🚦 Next Steps (Optional)

- [ ] Add Mapbox GL for enhanced map features (requires API key)
- [ ] Load real TensorFlow .h5 model for ML predictions
- [ ] Add user authentication
- [ ] Deploy to production server
- [ ] Add more chart types to dashboard
- [ ] Implement PDF report download functionality

---

**Created:** November 2025  
**Author:** AI-Powered Groundwater Prediction System  
**License:** MIT
