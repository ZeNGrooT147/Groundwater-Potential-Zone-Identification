@echo off
echo ============================================================
echo   🌊 Groundwater Prediction Application
echo   Starting Backend (Flask) and Frontend (React/Vite)
echo ============================================================
echo.

REM Start Flask Backend in new window
echo 🔧 Starting Flask Backend on http://localhost:5000...
start "Flask Backend - Port 5000" cmd /k "cd /d %~dp0 && python app_hybrid.py"
timeout /t 3 /nobreak > nul

REM Add Node.js to PATH and start Vite Frontend in new window
echo 🎨 Starting React Frontend on http://localhost:3000...
start "React Frontend - Port 3000" powershell -NoExit -Command "cd '%~dp0frontend'; $env:PATH = \"$env:PATH;C:\Program Files\nodejs\"; npm run dev"
timeout /t 3 /nobreak > nul

echo.
echo ============================================================
echo ✅ Both servers are starting!
echo.
echo 🔴 Backend API:  http://localhost:5000
echo 🔵 Frontend App: http://localhost:3000
echo.
echo 📌 OPEN THIS IN YOUR BROWSER:
echo    👉 http://localhost:3000
echo.
echo 💡 Two terminal windows will open:
echo    1. Flask Backend (black window)
echo    2. React Frontend (another window)
echo.
echo ⚠️  Press Ctrl+C in each window to stop servers
echo ============================================================
echo.
timeout /t 5
start http://localhost:3000
echo Browser opening automatically...
echo.
