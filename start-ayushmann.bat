@echo off
title AyushMann - Panchakarma Management System
color 0A

echo.
echo ============================================
echo   AyushMann - Panchakarma Management System
echo ============================================
echo.

:: Check if Node.js is installed
node --version >nul 2>&1
if errorlevel 1 (
    echo [ERROR] Node.js not found. Please install Node.js 16+ from https://nodejs.org/
    pause
    exit /b 1
)

echo [INFO] Node.js found: 
node --version

:: Navigate to project directory
cd /d "e:\Hackathon\AyushMann\ayushmann-project"
if not exist "package.json" (
    echo [ERROR] Project not found in current directory
    pause
    exit /b 1
)

:: Install dependencies if needed
if not exist "node_modules" (
    echo [INFO] Installing root dependencies...
    npm install
)

if not exist "server\node_modules" (
    echo [INFO] Installing server dependencies...
    cd server
    npm install
    cd ..
)

if not exist "client\node_modules" (
    echo [INFO] Installing client dependencies...
    cd client
    npm install
    cd ..
)

:: Create .env file if it doesn't exist
if not exist "server\.env" (
    echo [INFO] Creating environment configuration...
    (
        echo MONGODB_URI=mongodb://localhost:27017/ayushmann
        echo JWT_SECRET=ayushmann_super_secret_key_for_jwt_tokens_2025
        echo PORT=5000
        echo NODE_ENV=development
        echo CLIENT_URL=http://localhost:3000
    ) > server\.env
)

echo.
echo ============================================
echo   Application Information
echo ============================================
echo Frontend: http://localhost:3000
echo Backend:  http://localhost:5000
echo.
echo Demo Credentials:
echo Patient:      patient@demo.com / demo123
echo Practitioner: doctor@demo.com / demo123
echo.
echo ============================================
echo   Starting AyushMann Application...
echo ============================================
echo.

:: Start backend server in background
echo [INFO] Starting backend server...
start "AyushMann Backend" cmd /k "cd /d server && node server.js"

:: Wait a moment for backend to start
timeout /t 5 /nobreak >nul

:: Seed demo users
echo [INFO] Setting up demo users...
curl -X POST http://localhost:5000/api/auth/seed-demo -H "Content-Type: application/json" >nul 2>&1

:: Start frontend
echo [INFO] Starting frontend...
cd client
npm start

echo.
echo [INFO] Application stopped. Press any key to exit...
pause >nul