# AyushMann Development Setup Script
# Run this script to quickly set up and start the AyushMann application

Write-Host "🌿 AyushMann - Panchakarma Management System" -ForegroundColor Green
Write-Host "=============================================" -ForegroundColor Green
Write-Host ""

# Function to check if a command exists
function Test-Command($cmdname) {
    return [bool](Get-Command -Name $cmdname -ErrorAction SilentlyContinue)
}

# Check prerequisites
Write-Host "📋 Checking Prerequisites..." -ForegroundColor Yellow

if (Test-Command "node") {
    $nodeVersion = node --version
    Write-Host "✅ Node.js: $nodeVersion" -ForegroundColor Green
} else {
    Write-Host "❌ Node.js not found. Please install Node.js 16+ from https://nodejs.org/" -ForegroundColor Red
    exit 1
}

if (Test-Command "npm") {
    $npmVersion = npm --version
    Write-Host "✅ npm: v$npmVersion" -ForegroundColor Green
} else {
    Write-Host "❌ npm not found. Please install npm" -ForegroundColor Red
    exit 1
}

# Check MongoDB
Write-Host "🍃 Checking MongoDB..." -ForegroundColor Yellow
$mongoRunning = Get-Process -Name "mongod" -ErrorAction SilentlyContinue
if ($mongoRunning) {
    Write-Host "✅ MongoDB is running" -ForegroundColor Green
} else {
    Write-Host "⚠️  MongoDB not detected. Make sure MongoDB is running or configure MongoDB Atlas connection" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "🚀 Setting up AyushMann..." -ForegroundColor Cyan

# Navigate to project directory
$projectPath = "e:\Hackathon\AyushMann\ayushmann-project"
if (Test-Path $projectPath) {
    Set-Location $projectPath
    Write-Host "✅ Project directory found" -ForegroundColor Green
} else {
    Write-Host "❌ Project directory not found: $projectPath" -ForegroundColor Red
    exit 1
}

# Install dependencies if needed
if (!(Test-Path "node_modules")) {
    Write-Host "📦 Installing root dependencies..." -ForegroundColor Yellow
    npm install
}

if (!(Test-Path "server/node_modules")) {
    Write-Host "📦 Installing server dependencies..." -ForegroundColor Yellow
    Set-Location "server"
    npm install
    Set-Location ".."
}

if (!(Test-Path "client/node_modules")) {
    Write-Host "📦 Installing client dependencies..." -ForegroundColor Yellow
    Set-Location "client"
    npm install
    Set-Location ".."
}

Write-Host "✅ Dependencies installed successfully!" -ForegroundColor Green
Write-Host ""

# Check environment file
if (!(Test-Path "server/.env")) {
    Write-Host "🔧 Creating environment file..." -ForegroundColor Yellow
    @"
# AyushMann Environment Configuration
MONGODB_URI=mongodb://localhost:27017/ayushmann
JWT_SECRET=ayushmann_super_secret_key_for_jwt_tokens_2025
PORT=5000
NODE_ENV=development
CLIENT_URL=http://localhost:3000
"@ | Out-File -FilePath "server/.env" -Encoding UTF8
    Write-Host "✅ Environment file created" -ForegroundColor Green
}

Write-Host ""
Write-Host "🎯 Starting AyushMann Application..." -ForegroundColor Cyan
Write-Host ""

# Display connection info
Write-Host "📡 Application URLs:" -ForegroundColor Yellow
Write-Host "   Frontend: http://localhost:3000" -ForegroundColor White
Write-Host "   Backend:  http://localhost:5000" -ForegroundColor White
Write-Host ""

Write-Host "🔐 Demo Login Credentials:" -ForegroundColor Yellow
Write-Host "   Patient:      patient@demo.com / demo123" -ForegroundColor White
Write-Host "   Practitioner: doctor@demo.com / demo123" -ForegroundColor White
Write-Host ""

# Start the application
Write-Host "🚀 Starting both frontend and backend..." -ForegroundColor Green
Write-Host "   Press Ctrl+C to stop the application" -ForegroundColor Yellow
Write-Host ""

# Start both servers
try {
    Start-Job -ScriptBlock {
        Set-Location "e:\Hackathon\AyushMann\ayushmann-project\server"
        node server.js
    } -Name "AyushMann-Backend"
    
    Start-Sleep -Seconds 3  # Give backend time to start
    
    # Seed demo users
    Write-Host "🌱 Seeding demo users..." -ForegroundColor Yellow
    try {
        $response = Invoke-RestMethod -Uri "http://localhost:5000/api/auth/seed-demo" -Method POST -ContentType "application/json" -TimeoutSec 10
        Write-Host "✅ Demo users created successfully" -ForegroundColor Green
    } catch {
        Write-Host "⚠️  Demo users may already exist or backend starting up..." -ForegroundColor Yellow
    }
    
    Start-Sleep -Seconds 2
    
    # Start frontend
    Set-Location "client"
    Write-Host "🎨 Starting frontend..." -ForegroundColor Cyan
    npm start
    
} catch {
    Write-Host "❌ Error starting application: $_" -ForegroundColor Red
} finally {
    # Clean up background jobs
    Get-Job -Name "AyushMann-Backend" -ErrorAction SilentlyContinue | Stop-Job
    Get-Job -Name "AyushMann-Backend" -ErrorAction SilentlyContinue | Remove-Job
}