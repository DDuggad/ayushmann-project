# AyushMann Development Setup Script for Windows

Write-Host "🌿 Setting up AyushMann Development Environment..." -ForegroundColor Green

# Check if Node.js is installed
if (-not (Get-Command node -ErrorAction SilentlyContinue)) {
    Write-Host "❌ Node.js is not installed. Please install Node.js first." -ForegroundColor Red
    exit 1
}

Write-Host "📦 Installing root dependencies..." -ForegroundColor Green
npm install

Write-Host "📦 Installing server dependencies..." -ForegroundColor Green
Set-Location server
npm install

Write-Host "📦 Installing client dependencies..." -ForegroundColor Green
Set-Location ..\client
npm install

Write-Host "🔧 Setting up environment variables..." -ForegroundColor Green
Set-Location ..\server
if (-not (Test-Path .env)) {
    Copy-Item .env.example .env
    Write-Host "⚠️  Please update the .env file with your configuration" -ForegroundColor Yellow
}

# Create logs directory
New-Item -ItemType Directory -Force -Path logs | Out-Null

Set-Location ..

Write-Host "✅ Setup complete!" -ForegroundColor Green
Write-Host ""
Write-Host "🚀 To start the development servers:" -ForegroundColor Green
Write-Host "   npm run dev" -ForegroundColor Yellow -NoNewline
Write-Host " (runs both client and server)"
Write-Host ""
Write-Host "   Or run separately:" -ForegroundColor Yellow
Write-Host "   npm run server" -ForegroundColor Yellow -NoNewline
Write-Host " (API server on port 5000)"
Write-Host "   npm run client" -ForegroundColor Yellow -NoNewline
Write-Host " (React app on port 3000)"
Write-Host ""
Write-Host "🌐 Application URLs:" -ForegroundColor Green
Write-Host "   Frontend: " -NoNewline
Write-Host "http://localhost:3000" -ForegroundColor Yellow
Write-Host "   Backend:  " -NoNewline
Write-Host "http://localhost:5000" -ForegroundColor Yellow
Write-Host "   Health:   " -NoNewline
Write-Host "http://localhost:5000/health" -ForegroundColor Yellow