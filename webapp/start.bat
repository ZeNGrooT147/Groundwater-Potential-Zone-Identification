@echo off
echo ================================================
echo   Groundwater Potential AI
echo ================================================
echo.
echo Starting Flask Backend...
echo.

cd /d %~dp0
start "GWP AI - Flask Backend" cmd /k ""C:/Program Files/Python314/python.exe" app_hybrid.py"

timeout /t 2 /nobreak >nul

echo.
echo ================================================
echo   Server Started!
echo ================================================
echo.
echo Access at: http://localhost:5000
echo.
echo Press Ctrl+C in the server window to stop.
echo.

pause
