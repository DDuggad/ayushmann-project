# 🌿 AyushMann - Panchakarma Patient Management System# AyushMann - Panchakarma Patient Management Suite



<div align="center">A comprehensive HealthTech solution for Ayurvedic Panchakarma centers, featuring AI-powered scheduling, real-time progress tracking, and dual-portal system for patients and practitioners.



![AyushMann Logo](https://img.shields.io/badge/AyushMann-Ayurvedic%20Care%20Management-87a96b?style=for-the-badge&logo=leaf)## 🌿 Features



**Modern Digital Healthcare Platform for Ayurvedic Panchakarma Treatment Management**- **Dual Portal System**: Separate interfaces for patients and practitioners

- **Smart Scheduling Engine**: AI-powered therapy scheduling and resource management

[![React](https://img.shields.io/badge/React-18.2.0-61DAFB?style=flat-square&logo=react)](https://reactjs.org/)- **Real-time Progress Tracking**: Live updates on treatment progress

[![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=flat-square&logo=nodedotjs)](https://nodejs.org/)- **Multi-channel Notifications**: SMS, email, and in-app notifications

[![MongoDB](https://img.shields.io/badge/MongoDB-Database-47A248?style=flat-square&logo=mongodb)](https://mongodb.com/)- **AI Communication**: Local language support and voice transcription

[![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)- **HIPAA Compliant**: End-to-end encryption and secure data handling



[Demo](#-demo) • [Features](#-features) • [Quick Start](#-quick-start) • [Contributing](#-contributing)## 🚀 Quick Start



</div>### Prerequisites

- **Node.js** (v16+): [Download here](https://nodejs.org/)

---- **MongoDB** (v5.0+): [Download here](https://www.mongodb.com/try/download/community) or use [MongoDB Atlas](https://www.mongodb.com/atlas)



## 📖 Overview### Installation Steps



**AyushMann** is a comprehensive digital healthcare platform designed specifically for **Panchakarma treatment management**. It bridges the gap between traditional Ayurvedic practices and modern technology, providing seamless communication between patients and practitioners while maintaining the authentic essence of Ayurvedic care.1. **Install Dependencies**

   ```bash

### 🎯 Mission   npm run install-deps

To modernize Ayurvedic healthcare delivery through intelligent scheduling, real-time progress tracking, and culturally-sensitive patient management solutions.   ```



---2. **Start MongoDB** (if using local installation)

   ```bash

## ✨ Features   # Windows (run as Administrator)

   net start MongoDB

### 🏥 **For Healthcare Practitioners**   

- **Smart Scheduling**: AI-powered appointment management with conflict detection   # macOS (with Homebrew)

- **Patient Portal**: Comprehensive patient history and treatment tracking   brew services start mongodb/brew/mongodb-community

- **Progress Analytics**: Visual insights into treatment effectiveness   

- **Multi-language Support**: Hindi, English, and regional language support   # Linux

- **HIPAA Compliance**: Enterprise-grade security for patient data   sudo systemctl start mongod

   ```

### 🧘‍♀️ **For Patients**

- **Treatment Tracking**: Real-time progress monitoring with visual indicators3. **Start Development Server**

- **Smart Notifications**: SMS, email, and in-app reminders in preferred language   ```bash

- **Clinic Finder**: Interactive map to find nearby Ayurveda centers and stores   npm run dev

- **Appointment Management**: Easy booking and rescheduling capabilities   ```

- **Educational Content**: Personalized Ayurvedic wellness tips and guidance

4. **Access the Application**

### 🗺️ **Interactive Map Features**   - Frontend: http://localhost:3000

- **Location-based Search**: Find nearby Ayurveda clinics and herbal stores   - Backend: http://localhost:5000

- **Filtering Options**: Search by clinic type, distance, and specialties   - Health Check: http://localhost:5000/health

- **Ratings & Reviews**: Community-driven feedback system

- **Directions Integration**: One-click Google Maps navigation### Alternative: Frontend-Only Development

- **Contact Integration**: Direct calling and messaging capabilities

If you don't have MongoDB set up, you can still run the frontend:

### 🔧 **Technical Highlights**```bash

- **Responsive Design**: Mobile-first approach optimized for all devicescd client

- **Real-time Updates**: WebSocket integration for live notificationsnpm start

- **Modern UI/UX**: Ayurvedic-inspired design with smooth animations```

- **Error Handling**: Comprehensive error boundaries and fallback mechanisms

The backend will start in development mode without database connection, allowing you to work on the UI.

---

## 📱 Mobile Optimized

## 🚀 Quick Start

Designed with mobile-first approach, optimized for Android devices with responsive design and touch-friendly interfaces.

### Prerequisites

- **Node.js** 16+ ## 🎨 Design Theme

- **MongoDB** (local or cloud)

- **npm** or **yarn**Sophisticated blend of Authentic Ayurvedic, Modern, and Minimalistic design with:

- Calming sage green and terracotta color palette

### Installation- Clean typography with Inter font family

- Subtle animations and smooth transitions

1. **Clone the repository**- Minimalist UI with ample white space

   ```bash

   git clone https://github.com/yourusername/ayushmann-project.git## 🏗️ Tech Stack

   cd ayushmann-project

   ```- **Frontend**: React.js, CSS3, HTML5

- **Backend**: Node.js, Express.js

2. **Install dependencies**- **Database**: MongoDB

   ```bash- **Authentication**: OAuth 2.0

   # Install all dependencies (root, server, client)- **Cloud**: AWS/Firebase

   npm run install-deps- **AI/ML**: TensorFlow, Scikit-learn

   ```

## 📂 Project Structure

3. **Environment Setup**

   ```bash```

   # Copy environment template (if available)ayushmann-project/

   cp server/.env.example server/.env├── client/          # React frontend

   ├── server/          # Node.js backend

   # Or create .env file in server/ directory with:├── shared/          # Shared utilities

   # MONGODB_URI=mongodb://localhost:27017/ayushmann└── docs/           # Documentation

   # JWT_SECRET=your_secret_key_here```

   # PORT=5000

   ```## 🔐 Security



4. **Start the application**- AES-256 encryption

   ```bash- TLS/SSL protocols

   # Method 1: Start both frontend and backend together- HIPAA compliance

   npm start- OAuth 2.0 authentication

   - Role-based access control

   # Method 2: Start individually

   # Terminal 1 - Backend:## 📞 Support

   cd server && npm start

   For support and questions, please contact the AyushMann development team.

   # Terminal 2 - Frontend:

   cd client && npm start---

   ```

*Built for Smart India Hackathon 2025 - HealthTech Category*
5. **Seed demo data**
   ```powershell
   # Create demo users (Windows PowerShell)
   Invoke-RestMethod -Uri "http://localhost:5000/api/auth/seed-demo" -Method POST -ContentType "application/json"
   ```

### 🌐 Access Points
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000

---

## 🎮 Demo

### Demo Credentials
Try the application with these pre-configured accounts:

**Patient Demo Account:**
- 📧 Email: `patient@demo.com`
- 🔑 Password: `demo123`
- 🎯 Access: Patient dashboard, appointment booking, treatment tracking, clinic finder map

**Practitioner Demo Account:**
- 📧 Email: `doctor@demo.com`
- 🔑 Password: `demo123`
- 🎯 Access: Practitioner dashboard, patient management, analytics

### Key Demo Features
1. **Interactive Dashboard**: View appointments, treatment progress, and analytics
2. **Map Integration**: Find nearby Ayurveda centers with filtering options
3. **Real-time Notifications**: Experience live updates and alerts
4. **Responsive Design**: Test on different screen sizes and devices

---

## 🏗️ Architecture

```
AyushMann/
├── 📁 client/                 # React Frontend
│   ├── 📁 public/            # Static assets
│   ├── 📁 src/
│   │   ├── 📁 components/    # Reusable UI components
│   │   │   ├── ErrorBoundary/     # Error handling
│   │   │   ├── LoadingSpinner/    # Loading states
│   │   │   ├── Map/               # Ayurveda map feature
│   │   │   └── Navigation/        # App navigation
│   │   ├── 📁 pages/         # Route-specific pages
│   │   │   ├── Auth/              # Login/Register
│   │   │   ├── LandingPage/       # Homepage
│   │   │   ├── Patient/           # Patient portal
│   │   │   └── Practitioner/      # Doctor portal
│   │   ├── 📁 contexts/      # React Context providers
│   │   └── 📁 styles/        # CSS and styling
│   └── 📄 package.json
│
├── 📁 server/                # Node.js Backend
│   ├── 📁 routes/           # API route handlers
│   ├── 📁 models/           # MongoDB data models
│   ├── 📁 middleware/       # Express middleware
│   ├── 📁 utils/            # Backend utilities
│   └── 📄 server.js         # Main server entry point
│
├── 📄 package.json          # Root package configuration
└── 📄 README.md            # This file
```

### Tech Stack

**Frontend:**
- ⚛️ **React 18.2** - Modern UI library with hooks
- 🎨 **Framer Motion** - Smooth animations and transitions
- 🗺️ **React Router** - Client-side routing
- 📱 **Responsive CSS** - Mobile-first design
- 🔔 **Axios** - HTTP client for API calls

**Backend:**
- 🟢 **Node.js** - JavaScript runtime
- 🚀 **Express.js** - Web application framework
- 🍃 **MongoDB** - NoSQL database
- 🔐 **JWT** - Authentication and authorization
- 📊 **Winston** - Comprehensive logging
- 🔒 **bcrypt** - Password hashing

---

## 📱 Mobile Optimization

AyushMann is built with a **mobile-first approach**:

- ✅ **Responsive Design**: Adapts to all screen sizes
- ✅ **Touch-friendly UI**: Optimized for mobile interactions
- ✅ **Fast Loading**: Optimized assets and lazy loading
- ✅ **Offline Support**: Basic offline functionality
- ✅ **Android Optimized**: Specifically tested on Android devices

---

## 🎨 UI/UX Design

### Design Philosophy
- **Ayurvedic Inspiration**: Colors and elements inspired by nature and traditional Ayurveda
- **Minimalistic Approach**: Clean, uncluttered interface focusing on essential information
- **Cultural Sensitivity**: Respectful integration of traditional symbols and modern design

### Color Palette
- **Primary**: Sage Green (`#87a96b`) - Represents growth and healing
- **Accent**: Terracotta (`#ec7439`) - Warmth and traditional earth tones
- **Neutrals**: Cream and charcoal for balance and readability

### Typography
- **Headings**: Crimson Text - Elegant serif for important text
- **Body**: Inter - Modern, readable sans-serif for content

---

## 🔐 Security Features

- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: bcrypt encryption for user passwords
- **CORS Protection**: Cross-origin request security
- **Input Validation**: Comprehensive data validation
- **Error Handling**: Secure error messages without data exposure
- **HTTPS Ready**: SSL/TLS encryption support

---

## 🐛 Bug Testing & Quality Assurance

### ✅ **Issues Fixed:**
- **Login Redirects**: Fixed demo login to redirect to correct dashboard (not homepage)
- **Error Boundaries**: Added comprehensive error handling with fallback UI
- **Loading States**: Enhanced loading indicators and authentication flow
- **Mobile Responsiveness**: Optimized for Android and mobile devices
- **CSS Compatibility**: Fixed appearance property issues
- **Authentication Flow**: Improved token management and user session handling

### 🧪 **Testing Checklist:**
- ✅ Demo login functionality (patient/practitioner)
- ✅ Dashboard redirects based on user role
- ✅ Map integration and clinic search
- ✅ Responsive design on mobile devices
- ✅ Error handling and boundary testing
- ✅ API endpoint validation
- ✅ Cross-browser compatibility

---

## 🚀 Deployment

### Production Build

```bash
# Build frontend for production
npm run build

# Start production server
npm start
```

### Environment Variables for Production

Create `.env` file in `/server` directory:

```env
# Database
MONGODB_URI=mongodb://localhost:27017/ayushmann
MONGODB_TEST_URI=mongodb://localhost:27017/ayushmann_test

# Authentication
JWT_SECRET=your_super_secret_jwt_key_here
JWT_EXPIRES_IN=7d

# Server Configuration
PORT=5000
NODE_ENV=production
CLIENT_URL=http://localhost:3000

# Optional: Email & SMS Integration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
```

---

## 🤝 Contributing

We welcome contributions! Here's how to get started:

### Development Workflow

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

### Code Standards
- Follow ESLint configuration
- Write comprehensive tests for new features
- Update documentation for API changes
- Maintain mobile-first responsive design principles

---

## 📞 Support & Contact

- **Issues**: [GitHub Issues](https://github.com/yourusername/ayushmann-project/issues)
- **Discussions**: [GitHub Discussions](https://github.com/yourusername/ayushmann-project/discussions)
- **Email**: support@ayushmann.health

---

## 📝 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **Ayurvedic Community** - For inspiring authentic healthcare approaches
- **Open Source Contributors** - For the amazing tools and libraries
- **Beta Testers** - For valuable feedback and suggestions
- **Traditional Healers** - For sharing wisdom that guides this platform

---

<div align="center">

**Made with 💚 for the Ayurvedic Community**

*Bridging Traditional Wisdom with Modern Technology*

**Built for Smart India Hackathon 2025 - HealthTech Category**

</div>