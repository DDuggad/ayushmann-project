#!/bin/bash

# AyushMann Development Setup Script

echo "🌿 Setting up AyushMann Development Environment..."

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ Node.js is not installed. Please install Node.js first.${NC}"
    exit 1
fi

# Check if MongoDB is running
if ! pgrep -x "mongod" > /dev/null; then
    echo -e "${YELLOW}⚠️  MongoDB is not running. Please start MongoDB first.${NC}"
fi

echo -e "${GREEN}📦 Installing root dependencies...${NC}"
npm install

echo -e "${GREEN}📦 Installing server dependencies...${NC}"
cd server && npm install

echo -e "${GREEN}📦 Installing client dependencies...${NC}"
cd ../client && npm install

echo -e "${GREEN}🔧 Setting up environment variables...${NC}"
cd ../server
if [ ! -f .env ]; then
    cp .env.example .env
    echo -e "${YELLOW}⚠️  Please update the .env file with your configuration${NC}"
fi

# Create logs directory
mkdir -p logs

cd ..

echo -e "${GREEN}✅ Setup complete!${NC}"
echo ""
echo -e "${GREEN}🚀 To start the development servers:${NC}"
echo -e "   ${YELLOW}npm run dev${NC} (runs both client and server)"
echo ""
echo -e "   ${YELLOW}Or run separately:${NC}"
echo -e "   ${YELLOW}npm run server${NC} (API server on port 5000)"
echo -e "   ${YELLOW}npm run client${NC} (React app on port 3000)"
echo ""
echo -e "${GREEN}🌐 Application URLs:${NC}"
echo -e "   Frontend: ${YELLOW}http://localhost:3000${NC}"
echo -e "   Backend:  ${YELLOW}http://localhost:5000${NC}"
echo -e "   Health:   ${YELLOW}http://localhost:5000/health${NC}"