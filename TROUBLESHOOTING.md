# 🔧 AyushMann Troubleshooting Guide

## Common Issues and Solutions

### 1. Port Already in Use Error

**Problem:** `Error: listen EADDRINUSE: address already in use :::3000` or `:::5000`

**Solution:**
```powershell
# Kill processes using ports 3000 and 5000
Get-Process -Id (Get-NetTCPConnection -LocalPort 3000).OwningProcess -ErrorAction SilentlyContinue | Stop-Process -Force
Get-Process -Id (Get-NetTCPConnection -LocalPort 5000).OwningProcess -ErrorAction SilentlyContinue | Stop-Process -Force
```

### 2. MongoDB Connection Error

**Problem:** `MongoNetworkError: failed to connect to server`

**Solutions:**
- **Local MongoDB:** Ensure MongoDB is running locally
  ```powershell
  # Start MongoDB service
  net start MongoDB
  ```
- **MongoDB Atlas:** Update `server/.env` with your Atlas connection string:
  ```
  MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/ayushmann
  ```

### 3. Module Not Found Errors

**Problem:** `Cannot find module 'xyz'`

**Solution:**
```powershell
# Reinstall all dependencies
cd e:\Hackathon\AyushMann\ayushmann-project
Remove-Item -Recurse -Force node_modules, client\node_modules, server\node_modules -ErrorAction SilentlyContinue
npm install
cd server && npm install && cd ..
cd client && npm install && cd ..
```

### 4. Demo Login Not Working

**Problem:** Demo credentials don't work

**Solution:**
```powershell
# Manually seed demo users
curl -X POST http://localhost:5000/api/auth/seed-demo -H "Content-Type: application/json"
```

### 5. Proxy Errors (Frontend to Backend)

**Problem:** `Proxy error: Could not proxy request`

**Solutions:**
- Ensure backend is running on port 5000
- Check `client/package.json` has `"proxy": "http://localhost:5000"`
- Restart both frontend and backend

### 6. Build/Compilation Errors

**Problem:** React compilation errors

**Solution:**
```powershell
# Clear cache and reinstall
cd client
npm run build 2>nul
Remove-Item -Recurse -Force node_modules, .next, dist, build -ErrorAction SilentlyContinue
npm install
```

### 7. Environment Variables Not Loading

**Problem:** Server starts but authentication fails

**Solution:**
```powershell
# Recreate .env file
cd server
Remove-Item .env -ErrorAction SilentlyContinue
"MONGODB_URI=mongodb://localhost:27017/ayushmann
JWT_SECRET=ayushmann_super_secret_key_for_jwt_tokens_2025
PORT=5000
NODE_ENV=development
CLIENT_URL=http://localhost:3000" | Out-File -FilePath .env -Encoding UTF8
```

## Quick Diagnostics

### Check System Status
```powershell
# Check Node.js and npm versions
node --version; npm --version

# Check running processes on required ports
Get-NetTCPConnection -LocalPort 3000,5000 -ErrorAction SilentlyContinue

# Check MongoDB service (Windows)
Get-Service -Name MongoDB -ErrorAction SilentlyContinue
```

### Test Backend API
```powershell
# Test server health
curl http://localhost:5000/api/auth/health

# Test demo user creation
curl -X POST http://localhost:5000/api/auth/seed-demo -H "Content-Type: application/json"
```

## Performance Issues

### Slow Loading
- Clear browser cache (Ctrl+Shift+R in Chrome)
- Check network tab in developer tools for failed requests
- Ensure MongoDB has proper indexing

### Memory Issues
```powershell
# Increase Node.js memory limit
$env:NODE_OPTIONS="--max-old-space-size=8192"
```

## Development Tips

### Reset Everything
```powershell
# Nuclear option - complete reset
cd e:\Hackathon\AyushMann\ayushmann-project
Get-Process -Name node -ErrorAction SilentlyContinue | Stop-Process -Force
Remove-Item -Recurse -Force node_modules, client\node_modules, server\node_modules, client\build -ErrorAction SilentlyContinue
npm install
cd server && npm install && cd ..
cd client && npm install && cd ..
```

### Enable Debug Mode
```powershell
# Add to server/.env for detailed logging
echo "DEBUG=ayushmann:*" >> server/.env
```

## Contact Support

If issues persist:
1. Check the browser console (F12) for JavaScript errors
2. Check server logs in the terminal
3. Verify all dependencies in `package.json` files
4. Ensure you're using Node.js 16+ and npm 8+

## Log Files
- Frontend errors: Browser Developer Console (F12)
- Backend errors: Terminal where `node server.js` is running
- MongoDB errors: MongoDB log files or Atlas dashboard