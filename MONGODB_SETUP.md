# MongoDB Setup Guide for AyushMann

## Option 1: Local MongoDB Installation (Recommended for Development)

### Windows
1. **Download MongoDB Community Server**
   - Visit: https://www.mongodb.com/try/download/community
   - Download the Windows installer (.msi)
   - Run the installer with default settings

2. **Start MongoDB Service**
   ```powershell
   # As Administrator
   net start MongoDB
   
   # Or use Services.msc to start "MongoDB" service
   ```

3. **Verify Installation**
   ```powershell
   # Check if MongoDB is running
   mongo --version
   ```

### macOS
1. **Install via Homebrew**
   ```bash
   # Install Homebrew if not already installed
   /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
   
   # Add MongoDB tap
   brew tap mongodb/brew
   
   # Install MongoDB Community Edition
   brew install mongodb-community
   ```

2. **Start MongoDB**
   ```bash
   # Start MongoDB service
   brew services start mongodb/brew/mongodb-community
   
   # Or run manually
   mongod --config /usr/local/etc/mongod.conf --fork
   ```

### Linux (Ubuntu/Debian)
1. **Import Public Key**
   ```bash
   wget -qO - https://www.mongodb.org/static/pgp/server-6.0.asc | sudo apt-key add -
   ```

2. **Add Repository**
   ```bash
   echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/6.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-6.0.list
   ```

3. **Install MongoDB**
   ```bash
   sudo apt-get update
   sudo apt-get install -y mongodb-org
   ```

4. **Start MongoDB**
   ```bash
   sudo systemctl start mongod
   sudo systemctl enable mongod
   ```

## Option 2: MongoDB Atlas (Cloud Database)

### Setup Steps
1. **Create Account**
   - Visit: https://www.mongodb.com/atlas
   - Sign up for free account

2. **Create Cluster**
   - Choose "Build a Database"
   - Select "Free Shared" option
   - Choose your preferred cloud provider and region
   - Create cluster

3. **Configure Access**
   - Add your IP address to the IP Access List
   - Create a database user with username and password

4. **Get Connection String**
   - Click "Connect" on your cluster
   - Choose "Connect your application"
   - Copy the connection string

5. **Update Environment Variables**
   ```bash
   # In server/.env file
   MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/ayushmann?retryWrites=true&w=majority
   ```

## Troubleshooting

### Common Issues

1. **Connection Refused (ECONNREFUSED)**
   - Ensure MongoDB service is running
   - Check if port 27017 is available
   - Verify connection string format

2. **Authentication Failed**
   - Check username/password in connection string
   - Ensure user has proper permissions

3. **Network Issues**
   - Add your IP to Atlas whitelist
   - Check firewall settings
   - Verify internet connection

### Verification Commands

```bash
# Test MongoDB connection (local)
mongo

# Show databases
show dbs

# Exit MongoDB shell
exit

# Check MongoDB service status (Windows)
sc query MongoDB

# Check MongoDB service status (Linux/macOS)
brew services list | grep mongodb    # macOS
sudo systemctl status mongod         # Linux
```

## Development Tips

1. **Use MongoDB Compass** (GUI tool)
   - Download: https://www.mongodb.com/products/compass
   - Connect to your database visually
   - Browse collections and documents

2. **Environment Variables**
   ```bash
   # For local development
   MONGODB_URI=mongodb://127.0.0.1:27017/ayushmann
   
   # For Atlas
   MONGODB_URI=mongodb+srv://username:password@cluster.xxxxx.mongodb.net/ayushmann
   ```

3. **Sample Data**
   - The application will create sample users when you register
   - Use demo accounts from the login page
   - Check the dashboard routes for mock data

## Need Help?

- MongoDB Documentation: https://docs.mongodb.com/
- MongoDB University (Free Courses): https://university.mongodb.com/
- Community Support: https://developer.mongodb.com/community/forums/