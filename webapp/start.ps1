# Groundwater Prediction App Launcher
Write-Host "============================================================" -ForegroundColor Cyan
Write-Host "   🌊 Groundwater Prediction Application" -ForegroundColor Green
Write-Host "   Starting Backend (Flask) and Frontend (React/Vite)" -ForegroundColor Green
Write-Host "============================================================" -ForegroundColor Cyan
Write-Host ""

# Add Node.js to PATH
$env:PATH = "$env:PATH;C:\Program Files\nodejs"

# Start Flask Backend
Write-Host "🔧 Starting Flask Backend..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PSScriptRoot'; python app_hybrid.py" -WindowStyle Normal
Start-Sleep -Seconds 2

# Start React Frontend
Write-Host "🎨 Starting React Frontend..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PSScriptRoot\frontend'; npm run dev" -WindowStyle Normal
Start-Sleep -Seconds 3

Write-Host ""
Write-Host "============================================================" -ForegroundColor Cyan
Write-Host "✅ Both servers are starting!" -ForegroundColor Green
Write-Host ""
Write-Host "🔴 Backend API:  http://localhost:5000" -ForegroundColor Red
Write-Host "🔵 Frontend App: http://localhost:3000" -ForegroundColor Blue
Write-Host ""
Write-Host "📌 OPEN THIS IN YOUR BROWSER:" -ForegroundColor White
Write-Host "   👉 http://localhost:3000" -ForegroundColor Cyan
Write-Host ""
Write-Host "💡 Two PowerShell windows opened:" -ForegroundColor Yellow
Write-Host "   1. Flask Backend" -ForegroundColor White
Write-Host "   2. React Frontend" -ForegroundColor White
Write-Host ""
Write-Host "⚠️  Press Ctrl+C in each window to stop" -ForegroundColor Magenta
Write-Host "============================================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "⏳ Opening browser in 5 seconds..." -ForegroundColor Yellow
Start-Sleep -Seconds 5
Start-Process "http://localhost:3000"
Write-Host "✅ Browser opened!" -ForegroundColor Green
Write-Host ""
Write-Host "Press any key to exit this window (servers will keep running)..."
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
