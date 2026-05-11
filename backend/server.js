const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const dotenv = require('dotenv');
const connectDB = require('./src/config/db');

// Load env vars
dotenv.config();

// Connect to database
connectDB();

const app = express();

// Middleware
app.use(helmet());
app.use(cors({ origin: process.env.FRONTEND_URL || 'http://localhost:3000', credentials: true }));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

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
  res.json({ status: 'OK', message: 'Obsidian Move API is running', timestamp: new Date().toISOString() });
});

// Error handler
app.use(require('./src/middleware/errorHandler'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Obsidian Move API running on port ${PORT}`);
});

module.exports = app;
