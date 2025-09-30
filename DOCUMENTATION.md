# AyushMann - Project Documentation

## 🌿 Overview

**AyushMann** is a comprehensive Panchakarma Patient Management and Therapy Scheduling Software designed for the Smart India Hackathon 2025. It modernizes traditional Ayurvedic practices by providing a sophisticated, user-friendly digital platform for both patients and practitioners.

## 🎨 Design Philosophy

The application embodies a **sophisticated blend of Authentic Ayurvedic, Modern, and Minimalistic** design principles:

### Color Palette
- **Primary Colors**: Sage green variants (#87a96b, #6b8f4f, #52713c)
- **Accent Colors**: Terracotta variants (#ec7439, #de5a1f, #b74518)
- **Neutral Colors**: Off-white backgrounds (#faf7f2), charcoal text (#2d2926)
- **Status Colors**: Success (#10b981), Warning (#f59e0b), Error (#ef4444)

### Typography
- **Primary Font**: Inter (body text, labels, buttons)
- **Heading Font**: Crimson Text (elegant serif for main headings)
- **Weights**: 300, 400, 500, 600, 700

### Design Elements
- **Border Radius**: Subtle (4px-8px) for modern, clean aesthetic
- **Shadows**: Subtle drop shadows for depth
- **Animations**: Smooth transitions and micro-interactions
- **Layout**: Mobile-first, fluid responsive design

## 🏗️ Architecture

### Frontend (React.js)
```
client/
├── public/
│   ├── index.html
│   └── manifest.json
├── src/
│   ├── components/
│   │   ├── Navigation/
│   │   └── PrivateRoute/
│   ├── contexts/
│   │   ├── AuthContext.js
│   │   └── NotificationContext.js
│   ├── pages/
│   │   ├── LandingPage/
│   │   ├── Auth/
│   │   ├── Patient/
│   │   ├── Practitioner/
│   │   ├── Booking/
│   │   └── Notifications/
│   ├── App.js
│   ├── index.js
│   └── index.css
└── package.json
```

### Backend (Node.js/Express)
```
server/
├── middleware/
│   ├── auth.js
│   ├── async.js
│   └── errorHandler.js
├── models/
│   └── User.js
├── routes/
│   ├── auth.js
│   ├── users.js
│   ├── appointments.js
│   ├── treatments.js
│   ├── notifications.js
│   └── dashboard.js
├── utils/
│   └── logger.js
├── server.js
└── package.json
```

## 🌟 Key Features

### Dual Portal System
- **Patient Portal**: Dashboard, scheduling, progress tracking
- **Practitioner Portal**: Patient management, scheduling, treatment plans
- **Role-based authentication and authorization**

### Smart Scheduling Engine
- AI-powered practitioner matching
- Dynamic rescheduling capabilities
- Automated waitlist management
- Real-time availability checking

### Real-time Communication
- Socket.IO for live updates
- Multi-channel notifications (SMS, Email, In-app)
- AI-powered local language support
- Voice transcription for feedback

### Security & Compliance
- HIPAA compliant architecture
- AES-256 encryption
- JWT authentication
- Rate limiting and security headers
- Input validation and sanitization

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (v5.0 or higher)
- npm or yarn package manager

### Installation

1. **Clone and Setup**
   ```bash
   # Windows (PowerShell)
   .\setup.ps1
   
   # Linux/macOS
   chmod +x setup.sh
   ./setup.sh
   ```

2. **Manual Setup**
   ```bash
   # Install dependencies
   npm run install-deps
   
   # Configure environment
   cp server/.env.example server/.env
   # Edit server/.env with your configuration
   
   # Start development servers
   npm run dev
   ```

### Environment Configuration
Update `server/.env` with your settings:
```env
# Database
MONGODB_URI=mongodb://localhost:27017/ayushmann

# Authentication
JWT_SECRET=your-super-secret-jwt-key

# External Services
SMTP_HOST=smtp.gmail.com
TWILIO_ACCOUNT_SID=your-twilio-sid
GEMINI_API_KEY=your-gemini-api-key
```

## 📱 Mobile Optimization

The application is designed with a **mobile-first approach**:

- **Touch-friendly interfaces** (minimum 44px touch targets)
- **Optimized for Android devices**
- **Responsive breakpoints**: 640px, 768px, 1024px, 1280px
- **Fluid typography** that scales appropriately
- **Gesture-based navigation** on mobile devices

## 🎯 User Experience Features

### Animations & Interactions
- **Page transitions** with Framer Motion
- **Loading states** with custom spinners
- **Hover effects** and micro-interactions
- **Progress indicators** for multi-step processes
- **Toast notifications** for user feedback

### Accessibility
- **Keyboard navigation** support
- **Screen reader** compatibility
- **High contrast** color ratios
- **Reduced motion** support
- **Focus indicators** for interactive elements

## 🔧 Development

### Available Scripts
```bash
# Development
npm run dev          # Start both client and server
npm run client       # Start React development server
npm run server       # Start Node.js API server
npm run server:dev   # Start API server with nodemon

# Production
npm run build        # Build React app for production
npm start           # Start production servers
```

### Code Structure
- **Component-based architecture** with React hooks
- **Context API** for state management
- **Custom CSS** with CSS variables for theming
- **Modular backend** with Express.js routing
- **Mongoose ODM** for MongoDB operations

## 🧪 Testing & Quality

### Quality Assurance
- **Input validation** with express-validator
- **Error handling** middleware
- **Logging** with Winston
- **Security** headers with Helmet.js
- **Rate limiting** for API protection

### Performance
- **Lazy loading** for routes and components
- **Image optimization** and compression
- **Bundle splitting** for faster loading
- **Caching strategies** for API responses
- **Database indexing** for query optimization

## 🌐 Deployment

### Production Checklist
- [ ] Set `NODE_ENV=production`
- [ ] Configure production database
- [ ] Set up SSL certificates
- [ ] Configure email/SMS services
- [ ] Set up monitoring and logging
- [ ] Configure backup strategies

### Recommended Hosting
- **Frontend**: Vercel, Netlify, or AWS CloudFront
- **Backend**: AWS EC2, Digital Ocean, or Heroku
- **Database**: MongoDB Atlas or AWS DocumentDB
- **File Storage**: AWS S3 or CloudFlare R2

## 🤝 Contributing

### Development Guidelines
1. Follow the established design system
2. Maintain mobile-first responsive design
3. Write semantic, accessible HTML
4. Use the established color palette and typography
5. Test on multiple devices and screen sizes

### Code Style
- Use **ES6+ JavaScript** features
- Follow **React Hooks** patterns
- Maintain **consistent indentation** (2 spaces)
- Use **meaningful variable names**
- Add **comments** for complex logic

## 📞 Support & Documentation

### API Documentation
- Health Check: `GET /health`
- Authentication: `POST /api/auth/login`, `POST /api/auth/register`
- Dashboard: `GET /api/dashboard/patient`, `GET /api/dashboard/practitioner`
- User Management: `GET /api/users`, `PUT /api/auth/profile`

### Troubleshooting
- Check MongoDB connection
- Verify environment variables
- Ensure all dependencies are installed
- Check port availability (3000, 5000)

## 📊 Project Statistics

- **Frontend**: React.js with modern hooks and context
- **Backend**: Node.js/Express with RESTful APIs
- **Database**: MongoDB with Mongoose ODM
- **Styling**: Custom CSS with CSS variables
- **Authentication**: JWT with bcrypt encryption
- **Real-time**: Socket.IO for live updates
- **Mobile**: Optimized for Android devices
- **Design**: Ayurvedic-Modern-Minimalistic theme

---

**Built with 🌿 for Smart India Hackathon 2025**

*Modernizing Ayurvedic care through technology and tradition*