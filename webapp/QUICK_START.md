# 🚀 Quick Start Guide

## Easy Way to Start All Servers

### ✨ **Option 1: Double-Click the Batch File (EASIEST)**

Just **double-click** this file:
```
START_ALL_SERVERS.bat
```

That's it! It will:
- ✅ Open 2 terminal windows (Flask + React)
- ✅ Start both servers automatically
- ✅ Open your browser to http://localhost:3000

---

### 🎯 **Option 2: PowerShell Script**

Right-click `start.ps1` → **Run with PowerShell**

Or open PowerShell here and run:
```powershell
.\start.ps1
```

---

### 🛑 **How to Stop Servers**

Press **Ctrl+C** in each terminal window, then close them.

---

## 🌐 Application URLs

- **Main App**: http://localhost:3000
- **Map Viewer**: http://localhost:3000/map
- **Dashboard**: http://localhost:3000/dashboard
- **About**: http://localhost:3000/about
- **API Backend**: http://localhost:5000

---

## 📦 What's Running?

1. **Flask Backend** (Port 5000) - API server for predictions
2. **React Frontend** (Port 3000) - Modern web interface

---

## 🆘 Troubleshooting

**If servers don't start:**

1. Make sure Python is installed: `python --version`
2. Make sure Node.js is installed: Check if `C:\Program Files\nodejs` exists
3. Install dependencies:
   - Backend: `pip install -r requirements.txt`
   - Frontend: `cd frontend && npm install`

**If browser shows errors:**
- Wait 10-15 seconds for servers to fully start
- Refresh the page (F5)
- Check terminal windows for error messages

---

## 🎨 Features

✨ **Landing Page** - Modern design with animations
🗺️ **Interactive Map** - Click anywhere to predict groundwater
📊 **Analytics Dashboard** - Charts and statistics
📄 **About Page** - Project information

---

**Need help?** Check the terminal windows for error messages.
