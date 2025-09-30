# 🌿 AyushMann - Panchakarma Management Suite# 🌿 AyushMann - Panchakarma Patient Management System# AyushMann - Panchakarma Patient Management Suite



<div align="center">



![AyushMann Banner](https://img.shields.io/badge/AyushMann-Healthcare%20Management-87a96b?style=for-the-badge&logo=leaf)<div align="center">A comprehensive HealthTech solution for Ayurvedic Panchakarma centers, featuring AI-powered scheduling, real-time progress tracking, and dual-portal system for patients and practitioners.



**A modern, comprehensive healthcare platform for Ayurvedic Panchakarma treatment management**



[![React](https://img.shields.io/badge/React-18.2-61DAFB?style=flat-square&logo=react)](https://reactjs.org/)![AyushMann Logo](https://img.shields.io/badge/AyushMann-Ayurvedic%20Care%20Management-87a96b?style=for-the-badge&logo=leaf)## 🌿 Features

[![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=flat-square&logo=nodedotjs)](https://nodejs.org/)

[![MongoDB](https://img.shields.io/badge/MongoDB-Database-47A248?style=flat-square&logo=mongodb)](https://mongodb.com/)

[![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)

**Modern Digital Healthcare Platform for Ayurvedic Panchakarma Treatment Management**- **Dual Portal System**: Separate interfaces for patients and practitioners

[🚀 Quick Start](#-quick-start) • [✨ Features](#-features) • [📖 Demo](#-demo) • [🏗️ Architecture](#%EF%B8%8F-architecture)

- **Smart Scheduling Engine**: AI-powered therapy scheduling and resource management

</div>

[![React](https://img.shields.io/badge/React-18.2.0-61DAFB?style=flat-square&logo=react)](https://reactjs.org/)- **Real-time Progress Tracking**: Live updates on treatment progress

---

[![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=flat-square&logo=nodedotjs)](https://nodejs.org/)- **Multi-channel Notifications**: SMS, email, and in-app notifications

## ✨ Features

[![MongoDB](https://img.shields.io/badge/MongoDB-Database-47A248?style=flat-square&logo=mongodb)](https://mongodb.com/)- **AI Communication**: Local language support and voice transcription

🧘‍♀️ **Dual Portal System** - Separate interfaces for patients and practitioners  

📊 **Smart Dashboard** - Real-time progress tracking and analytics  [![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)- **HIPAA Compliant**: End-to-end encryption and secure data handling

🗺️ **Location Services** - Find nearby Ayurveda clinics and stores  

🔔 **Notifications** - Multi-channel alerts and reminders  

📱 **Mobile Optimized** - Responsive design for all devices  

🔐 **Secure Auth** - Role-based access with JWT authentication  [Demo](#-demo) • [Features](#-features) • [Quick Start](#-quick-start) • [Contributing](#-contributing)## 🚀 Quick Start

🎨 **Beautiful UI** - Modern Ayurvedic-inspired design  



---

</div>### Prerequisites

## 🚀 Quick Start

- **Node.js** (v16+): [Download here](https://nodejs.org/)

### **One-Click Setup (Windows)**

```powershell---- **MongoDB** (v5.0+): [Download here](https://www.mongodb.com/try/download/community) or use [MongoDB Atlas](https://www.mongodb.com/atlas)

# Method 1: PowerShell Script (Recommended)

.\start-ayushmann.ps1



# Method 2: Batch File## 📖 Overview### Installation Steps

start-ayushmann.bat

```



### **Manual Setup****AyushMann** is a comprehensive digital healthcare platform designed specifically for **Panchakarma treatment management**. It bridges the gap between traditional Ayurvedic practices and modern technology, providing seamless communication between patients and practitioners while maintaining the authentic essence of Ayurvedic care.1. **Install Dependencies**

```bash

# 1. Install dependencies   ```bash

npm install

cd server && npm install && cd ../client && npm install### 🎯 Mission   npm run install-deps



# 2. Set environment variablesTo modernize Ayurvedic healthcare delivery through intelligent scheduling, real-time progress tracking, and culturally-sensitive patient management solutions.   ```

cd ../server

cp .env.example .env

# Edit .env with your MongoDB connection

---2. **Start MongoDB** (if using local installation)

# 3. Start the application

# Terminal 1 - Backend   ```bash

cd server && npm start

## ✨ Features   # Windows (run as Administrator)

# Terminal 2 - Frontend  

cd client && npm start   net start MongoDB

```

### 🏥 **For Healthcare Practitioners**   

### **Access Points**

- 🌐 **Frontend**: http://localhost:3000- **Smart Scheduling**: AI-powered appointment management with conflict detection   # macOS (with Homebrew)

- 🔧 **Backend**: http://localhost:5000

- 📧 **Demo Patient**: `patient@demo.com` / `demo123`- **Patient Portal**: Comprehensive patient history and treatment tracking   brew services start mongodb/brew/mongodb-community

- 👩‍⚕️ **Demo Practitioner**: `doctor@demo.com` / `demo123`

- **Progress Analytics**: Visual insights into treatment effectiveness   

---

- **Multi-language Support**: Hindi, English, and regional language support   # Linux

## 📖 Demo

- **HIPAA Compliance**: Enterprise-grade security for patient data   sudo systemctl start mongod

### **Patient Portal**

- 📊 Personal health dashboard   ```

- 📅 Appointment scheduling

- 🗺️ Find nearby Ayurveda centers### 🧘‍♀️ **For Patients**

- 📈 Treatment progress tracking

- 💬 Communication with practitioners- **Treatment Tracking**: Real-time progress monitoring with visual indicators3. **Start Development Server**



### **Practitioner Portal**- **Smart Notifications**: SMS, email, and in-app reminders in preferred language   ```bash

- 👥 Patient management system

- 📋 Treatment planning tools- **Clinic Finder**: Interactive map to find nearby Ayurveda centers and stores   npm run dev

- 📊 Practice analytics

- 💼 Schedule management- **Appointment Management**: Easy booking and rescheduling capabilities   ```

- 📝 Digital prescriptions

- **Educational Content**: Personalized Ayurvedic wellness tips and guidance

---

4. **Access the Application**

## 🏗️ Architecture

### 🗺️ **Interactive Map Features**   - Frontend: http://localhost:3000

```

AyushMann/- **Location-based Search**: Find nearby Ayurveda clinics and herbal stores   - Backend: http://localhost:5000

├── 🎨 client/                 # React Frontend

│   ├── src/- **Filtering Options**: Search by clinic type, distance, and specialties   - Health Check: http://localhost:5000/health

│   │   ├── components/        # Reusable UI components

│   │   │   ├── UI/           # Unified component library- **Ratings & Reviews**: Community-driven feedback system

│   │   │   ├── Navigation/   # App navigation

│   │   │   ├── Map/          # Location services- **Directions Integration**: One-click Google Maps navigation### Alternative: Frontend-Only Development

│   │   │   └── ErrorBoundary/ # Error handling

│   │   ├── pages/            # Route-specific pages- **Contact Integration**: Direct calling and messaging capabilities

│   │   │   ├── Auth/         # Login/Register

│   │   │   ├── Patient/      # Patient portalIf you don't have MongoDB set up, you can still run the frontend:

│   │   │   └── Practitioner/ # Doctor portal

│   │   └── contexts/         # React Context providers### 🔧 **Technical Highlights**```bash

│   └── package.json

│- **Responsive Design**: Mobile-first approach optimized for all devicescd client

├── 🔧 server/                 # Node.js Backend  

│   ├── routes/               # API endpoints- **Real-time Updates**: WebSocket integration for live notificationsnpm start

│   ├── models/               # MongoDB schemas

│   ├── middleware/           # Express middleware- **Modern UI/UX**: Ayurvedic-inspired design with smooth animations```

│   └── server.js

│- **Error Handling**: Comprehensive error boundaries and fallback mechanisms

└── 📄 Docs & Config          # Setup and documentation

```The backend will start in development mode without database connection, allowing you to work on the UI.



### **Tech Stack**---



**Frontend:** React 18.2, Framer Motion, CSS3, HTML5  ## 📱 Mobile Optimized

**Backend:** Node.js, Express.js, MongoDB, JWT, Socket.io  

**Tools:** Git, npm, PowerShell scripts  ## 🚀 Quick Start

**Design:** Ayurvedic-inspired UI with sage green & terracotta colors  

Designed with mobile-first approach, optimized for Android devices with responsive design and touch-friendly interfaces.

---

### Prerequisites

## 🎨 Design Philosophy

- **Node.js** 16+ ## 🎨 Design Theme

**Sophisticated blend of Authentic Ayurvedic, Modern, and Minimalistic design**

- **MongoDB** (local or cloud)

- 🎨 **Color Palette**: Calming sage green (#87a96b) and warm terracotta (#ec7439)

- 🔤 **Typography**: Clean Inter font with Crimson Text accents- **npm** or **yarn**Sophisticated blend of Authentic Ayurvedic, Modern, and Minimalistic design with:

- ✨ **Animations**: Smooth Framer Motion transitions

- 📱 **Responsive**: Mobile-first design principles- Calming sage green and terracotta color palette

- 🧘 **Mindful UX**: Intuitive navigation reflecting Ayurvedic harmony

### Installation- Clean typography with Inter font family

---

- Subtle animations and smooth transitions

## 🔧 Development

1. **Clone the repository**- Minimalist UI with ample white space

### **Available Scripts**

```bash   ```bash

npm start           # Start both frontend and backend

npm run client      # Start React development server   git clone https://github.com/yourusername/ayushmann-project.git## 🏗️ Tech Stack

npm run server      # Start Node.js API server

npm run build       # Build for production   cd ayushmann-project

```

   ```- **Frontend**: React.js, CSS3, HTML5

### **Environment Variables**

```env- **Backend**: Node.js, Express.js

MONGODB_URI=mongodb://localhost:27017/ayushmann

JWT_SECRET=your_secret_key_here2. **Install dependencies**- **Database**: MongoDB

PORT=5000

NODE_ENV=development   ```bash- **Authentication**: OAuth 2.0

CLIENT_URL=http://localhost:3000

```   # Install all dependencies (root, server, client)- **Cloud**: AWS/Firebase



---   npm run install-deps- **AI/ML**: TensorFlow, Scikit-learn



## 🛠️ Troubleshooting   ```



### **Common Issues**## 📂 Project Structure



**Port conflicts:** `Get-NetTCPConnection -LocalPort 3000,5000` to check ports  3. **Environment Setup**

**MongoDB errors:** Ensure MongoDB is running or use Atlas connection  

**Dependencies:** Run `npm install` in root, server, and client directories     ```bash```

**Demo login:** POST to `/api/auth/seed-demo` to create demo users  

   # Copy environment template (if available)ayushmann-project/

### **Reset Everything**

```powershell   cp server/.env.example server/.env├── client/          # React frontend

# Nuclear option - complete reset

Remove-Item -Recurse -Force node_modules, client\node_modules, server\node_modules   ├── server/          # Node.js backend

npm install && cd server && npm install && cd ../client && npm install

```   # Or create .env file in server/ directory with:├── shared/          # Shared utilities



---   # MONGODB_URI=mongodb://localhost:27017/ayushmann└── docs/           # Documentation



## 🤝 Contributing   # JWT_SECRET=your_secret_key_here```



1. **Fork** the repository   # PORT=5000

2. **Create** a feature branch: `git checkout -b feature/amazing-feature`

3. **Commit** changes: `git commit -m 'Add amazing feature'`   ```## 🔐 Security

4. **Push** to branch: `git push origin feature/amazing-feature`

5. **Open** a Pull Request



### **Code Standards**4. **Start the application**- AES-256 encryption

- ✅ Use ES6+ JavaScript features

- ✅ Follow React Hooks patterns   ```bash- TLS/SSL protocols

- ✅ Maintain responsive design

- ✅ Write semantic, accessible HTML   # Method 1: Start both frontend and backend together- HIPAA compliance

- ✅ Add meaningful comments

   npm start- OAuth 2.0 authentication

---

   - Role-based access control

## 📞 Support & Links

   # Method 2: Start individually

### **Quick Links**

- 🐛 **Issues**: [GitHub Issues](https://github.com/DDuggad/ayushmann-project/issues)   # Terminal 1 - Backend:## 📞 Support

- 📚 **Documentation**: See `TROUBLESHOOTING.md`

- 💬 **Discussions**: [GitHub Discussions](https://github.com/DDuggad/ayushmann-project/discussions)   cd server && npm start



### **API Endpoints**   For support and questions, please contact the AyushMann development team.

- `POST /api/auth/login` - User authentication

- `POST /api/auth/register` - User registration   # Terminal 2 - Frontend:

- `POST /api/auth/seed-demo` - Create demo users

- `GET /api/dashboard/patient` - Patient dashboard data   cd client && npm start---

- `GET /api/dashboard/practitioner` - Practitioner dashboard data

   ```

---

*Built for Smart India Hackathon 2025 - HealthTech Category*

## 📄 License5. **Seed demo data**

   ```powershell

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.   # Create demo users (Windows PowerShell)

   Invoke-RestMethod -Uri "http://localhost:5000/api/auth/seed-demo" -Method POST -ContentType "application/json"

---   ```



<div align="center">### 🌐 Access Points

- **Frontend**: http://localhost:3000

**Built with ❤️ for Smart India Hackathon 2025**- **Backend API**: http://localhost:5000



🌿 *Bridging ancient Ayurvedic wisdom with modern technology* 🌿---



</div>## 🎮 Demo

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