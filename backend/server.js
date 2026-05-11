const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const rateLimit = require('express-rate-limit');
const xss = require('xss-clean');
const hpp = require('hpp');
const http = require('http');
const { Server } = require('socket.io');

const connectDB = require('./src/config/db');

// Load env vars
dotenv.config();

// Connect to database
connectDB();

const app = express();
const server = http.createServer(app);

// Setup Socket.io
const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true,
  }
});
// Attach io to req object so controllers can use it
app.use((req, res, next) => {
  req.io = io;
  next();
});
require('./src/services/SocketService')(io);

// Middleware
app.use(helmet());
app.use(cors({ origin: process.env.FRONTEND_URL || 'http://localhost:3000', credentials: true }));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan('dev'));

// Security Middleware
app.use(xss()); // Prevent XSS attacks
app.use(hpp()); // Prevent HTTP Param Pollution

// Rate Limiting
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 mins
  max: 100 // limit each IP to 100 requests per window
});
app.use('/api', limiter);

// Static uploads folder
app.use('/uploads', express.static('uploads'));

// Routes
app.use('/api/auth', require('./src/routes/auth'));
app.use('/api/tickets', require('./src/routes/tickets'));
app.use('/api/orders', require('./src/routes/orders'));
app.use('/api/admin', require('./src/routes/admin'));
app.use('/api/ai', require('./src/routes/ai'));
app.use('/api/wallet', require('./src/routes/wallet'));

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'TravelSwap API is running', timestamp: new Date().toISOString() });
});

// Error handler
app.use(require('./src/middleware/errorHandler'));

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`🚀 TravelSwap API & Socket server running on port ${PORT}`);
});

module.exports = { app, server };
