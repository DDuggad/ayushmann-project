const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const rateLimit = require('express-rate-limit');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const http = require('http');
const socketIo = require('socket.io');

// Load environment variables
dotenv.config();

// Import routes
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const appointmentRoutes = require('./routes/appointments');
const treatmentRoutes = require('./routes/treatments');
const notificationRoutes = require('./routes/notifications');
const dashboardRoutes = require('./routes/dashboard');

// Import middleware
const errorHandler = require('./middleware/errorHandler');
const logger = require('./utils/logger');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: process.env.CLIENT_URL || "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/ayushmann';

// Security middleware
app.use(helmet());
app.use(compression());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.'
});
app.use(limiter);

// CORS configuration
app.use(cors({
  origin: process.env.CLIENT_URL || "http://localhost:3000",
  credentials: true
}));

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Logging middleware
app.use((req, res, next) => {
  logger.info(`${req.method} ${req.url} - ${req.ip}`);
  next();
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    service: 'AyushMann API',
    version: '1.0.0'
  });
});

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/treatments', treatmentRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/dashboard', dashboardRoutes);

// Socket.IO for real-time features
io.on('connection', (socket) => {
  logger.info(`User connected: ${socket.id}`);

  // Join user to their room for personalized notifications
  socket.on('join-user', (userId) => {
    socket.join(`user-${userId}`);
    logger.info(`User ${userId} joined their room`);
  });

  // Handle appointment updates
  socket.on('appointment-update', (data) => {
    socket.to(`user-${data.patientId}`).emit('appointment-notification', data);
    socket.to(`user-${data.practitionerId}`).emit('appointment-notification', data);
  });

  // Handle real-time messaging
  socket.on('send-message', (data) => {
    socket.to(`user-${data.recipientId}`).emit('new-message', data);
  });

  socket.on('disconnect', () => {
    logger.info(`User disconnected: ${socket.id}`);
  });
});

// Store io instance for use in routes
app.set('socketio', io);

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

// Error handling middleware
app.use(errorHandler);

// Function to find available port
const findAvailablePort = (startPort) => {
  return new Promise((resolve, reject) => {
    const net = require('net');
    const testServer = net.createServer();

    testServer.listen(startPort, (err) => {
      if (err) {
        testServer.close();
        findAvailablePort(startPort + 1).then(resolve).catch(reject);
      } else {
        const port = testServer.address().port;
        testServer.close(() => {
          resolve(port);
        });
      }
    });

    testServer.on('error', (err) => {
      if (err.code === 'EADDRINUSE') {
        testServer.close();
        findAvailablePort(startPort + 1).then(resolve).catch(reject);
      } else {
        reject(err);
      }
    });
  });
};

// Start server function
const startServer = async (withDatabase = true) => {
  try {
    const availablePort = await findAvailablePort(PORT);

    server.listen(availablePort, () => {
      const dbStatus = withDatabase ? 'Connected' : 'NOT Connected (MongoDB not available)';
      const warningNote = withDatabase ? '' : '\n    📝 Note: Some API endpoints may not work without database connection.';
      const portNote = availablePort !== PORT ? ` (auto-selected from ${PORT})` : '';

      logger.info(`AyushMann server running on port ${availablePort}${withDatabase ? '' : ' (WITHOUT DATABASE)'}`);
      console.log(`
    🌿 AyushMann API Server Started${withDatabase ? '' : ' (Development Mode)'}
    📊 Port: ${availablePort}${portNote}
    🗄️  Database: ${dbStatus}
    🔧 Environment: ${process.env.NODE_ENV || 'development'}
    🌐 CORS Origin: ${process.env.CLIENT_URL || 'http://localhost:3000'}
    ⚡ Socket.IO: Enabled${warningNote}
    `);
    });
  } catch (error) {
    logger.error('Failed to start server:', error);
    console.error('❌ Failed to start server:', error.message);
    process.exit(1);
  }
};

// Database connection with better error handling
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000, // 5 second timeout
  socketTimeoutMS: 45000, // 45 second timeout
})
  .then(() => {
    logger.info('Connected to MongoDB');
    console.log('✅ MongoDB connected successfully');

    // Start server with database connection
    startServer(true);
  })
  .catch((error) => {
    logger.error('Database connection failed:', error);
    console.error(`
  ❌ MongoDB Connection Failed
  
  Please ensure MongoDB is running:
  
  1. Install MongoDB: https://www.mongodb.com/try/download/community
  2. Start MongoDB service:
     - Windows: Start "MongoDB" service in Services
     - macOS: brew services start mongodb/brew/mongodb-community
     - Linux: sudo systemctl start mongod
  
  3. Or use MongoDB Atlas (cloud): https://www.mongodb.com/atlas
  
  Current connection string: ${MONGODB_URI}
  `);

    // Don't exit in development, allow server to start without DB for frontend development
    if (process.env.NODE_ENV === 'production') {
      process.exit(1);
    } else {
      // Start server without database for frontend development
      startServer(false);
    }
  });

// Graceful shutdown
process.on('SIGTERM', () => {
  logger.info('SIGTERM received. Shutting down gracefully...');
  server.close(() => {
    mongoose.connection.close().then(() => {
      logger.info('Process terminated');
      process.exit(0);
    }).catch(() => {
      process.exit(0);
    });
  });
});

process.on('SIGINT', () => {
  logger.info('SIGINT received. Shutting down gracefully...');
  server.close(() => {
    mongoose.connection.close().then(() => {
      logger.info('Process terminated');
      process.exit(0);
    }).catch(() => {
      process.exit(0);
    });
  });
});

module.exports = app;