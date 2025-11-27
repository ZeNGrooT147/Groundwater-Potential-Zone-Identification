@echo off
echo ================================================
echo   TypeScript Frontend Setup
echo ================================================
echo.

REM Check if Node.js is installed
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [X] Node.js is NOT installed
    echo.
    echo Please follow these steps:
    echo.
    echo 1. Go to: https://nodejs.org/
    echo 2. Download the LTS version (green button)
    echo 3. Install it (takes 2-3 minutes)
    echo 4. Close ALL PowerShell windows
    echo 5. Run this script again
    echo.
    echo See INSTALL_NODEJS.md for detailed instructions.
    echo.
    pause
    exit /b 1
)

echo [OK] Node.js is installed
node --version
echo.

REM Check if packages are installed
if not exist "frontend\node_modules" (
    echo [!] Installing npm packages...
    echo    This will take 2-3 minutes...
    echo.
    cd frontend
    call npm install
    if %ERRORLEVEL% NEQ 0 (
        echo.
        echo [X] npm install failed!
        echo    Try running: npm install --legacy-peer-deps
        pause
        exit /b 1
    )
    cd ..
    echo.
    echo [OK] Packages installed successfully!
    echo.
)

echo ================================================
echo   Starting TypeScript Frontend
echo ================================================
echo.
echo Backend (Flask): http://localhost:5000
echo Frontend (React): http://localhost:3000
echo.

cd frontend
start "TypeScript Frontend - GWP AI" cmd /k "npm run dev"

timeout /t 3 /nobreak >nul

echo.
echo [OK] Frontend is starting in a new window!
echo.
echo Wait 5-10 seconds, then visit:
echo    http://localhost:3000
echo.

pause
