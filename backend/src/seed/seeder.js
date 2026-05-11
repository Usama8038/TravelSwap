const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
dotenv.config();

const User = require('../models/User');
const Ticket = require('../models/Ticket');
const Order = require('../models/Order');
const Review = require('../models/Review');
const Transaction = require('../models/Transaction');

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/obsidianmove');
    console.log('Connected to MongoDB');

    // Clear existing data
    await Promise.all([User.deleteMany(), Ticket.deleteMany(), Order.deleteMany(), Review.deleteMany(), Transaction.deleteMany()]);

    const hashedPassword = await bcrypt.hash('password123', 12);

    // Create users
    const users = await User.insertMany([
      { name: 'Admin User', email: 'admin@obsidianmove.com', password: hashedPassword, role: 'admin', isVerified: true, kyc: { status: 'verified' }, ratings: { average: 5, count: 10 } },
      { name: 'Rahul Sharma', email: 'rahul@example.com', password: hashedPassword, role: 'user', isVerified: true, phone: '9876543210', kyc: { status: 'verified' }, ratings: { average: 4.8, count: 24 }, totalSales: 12, wallet: { balance: 15000 } },
      { name: 'Priya Patel', email: 'priya@example.com', password: hashedPassword, role: 'user', isVerified: true, phone: '9876543211', kyc: { status: 'verified' }, ratings: { average: 4.6, count: 18 }, totalSales: 8, wallet: { balance: 8500 } },
      { name: 'Amit Kumar', email: 'amit@example.com', password: hashedPassword, role: 'user', isVerified: true, phone: '9876543212', kyc: { status: 'pending' }, ratings: { average: 4.2, count: 6 }, totalSales: 3 },
      { name: 'Sneha Reddy', email: 'sneha@example.com', password: hashedPassword, role: 'user', isVerified: true, kyc: { status: 'verified' }, ratings: { average: 4.9, count: 32 }, totalSales: 20, wallet: { balance: 25000 } },
      { name: 'Demo User', email: 'demo@obsidianmove.com', password: hashedPassword, role: 'user', isVerified: true, kyc: { status: 'verified' }, wallet: { balance: 5000 } }
    ]);

    console.log('Users seeded');

    const futureDate = (days) => new Date(Date.now() + days * 24 * 60 * 60 * 1000);

    const tickets = await Ticket.insertMany([
      { seller: users[1]._id, type: 'bus', source: 'Delhi', destination: 'Manali', travelDate: futureDate(3), travelTime: '18:30', operator: 'Obsidian Premium', seatNumber: 'L4', pnr: 'OB7823456', originalPrice: 1500, sellingPrice: 1200, aiSuggestedPrice: 1100, status: 'approved', views: 45, description: 'Luxury Volvo AC Sleeper. Selling due to plan change.' },
      { seller: users[2]._id, type: 'bus', source: 'Mumbai', destination: 'Goa', travelDate: futureDate(5), travelTime: '22:15', operator: 'Emirates Road', seatNumber: 'S4', pnr: 'ER2847561', originalPrice: 1200, sellingPrice: 900, aiSuggestedPrice: 950, status: 'approved', views: 32, description: 'Premium AC sleeper berth. Great scenic route!' },
      { seller: users[1]._id, type: 'bus', source: 'Bangalore', destination: 'Chennai', travelDate: futureDate(2), travelTime: '21:00', operator: 'Royal Transit', seatNumber: 'A4', pnr: 'RT9912345', originalPrice: 800, sellingPrice: 600, aiSuggestedPrice: 650, status: 'approved', isUrgent: true, views: 28, description: 'Luxury Volvo AC Sleeper. Very comfortable.' },
      { seller: users[3]._id, type: 'bus', source: 'Bangalore', destination: 'Hyderabad', travelDate: futureDate(7), travelTime: '22:00', operator: 'Gold Class', seatNumber: '8C', pnr: 'GC45678901', originalPrice: 1200, sellingPrice: 800, aiSuggestedPrice: 850, status: 'approved', views: 67, description: 'Overnight premium bus, includes blanket.' },
      { seller: users[4]._id, type: 'bus', source: 'Delhi', destination: 'Jaipur', travelDate: futureDate(4), travelTime: '15:30', operator: 'Obsidian Premium', seatNumber: '15', pnr: 'OB1234567', originalPrice: 900, sellingPrice: 700, aiSuggestedPrice: 720, status: 'approved', views: 41, description: 'AC Seater with high-speed WiFi included.' },
      { seller: users[4]._id, type: 'bus', source: 'Mumbai', destination: 'Pune', travelDate: futureDate(6), travelTime: '14:45', operator: 'Emirates Road', seatNumber: '22', pnr: 'ER78901234', originalPrice: 600, sellingPrice: 400, aiSuggestedPrice: 450, status: 'approved', views: 55, description: 'Afternoon luxury bus, window seat.' },
      { seller: users[2]._id, type: 'bus', source: 'Hyderabad', destination: 'Bangalore', travelDate: futureDate(1), travelTime: '20:30', operator: 'Gold Class', seatNumber: 'B2', pnr: 'GC55667788', originalPrice: 1100, sellingPrice: 750, aiSuggestedPrice: 800, status: 'approved', isUrgent: true, views: 19, description: 'Premium AC Sleeper bus, travels overnight.' },
      { seller: users[3]._id, type: 'bus', source: 'Chennai', destination: 'Madurai', travelDate: futureDate(8), travelTime: '18:00', operator: 'Royal Transit', seatNumber: 'U1', pnr: 'RT9876543', originalPrice: 800, sellingPrice: 600, aiSuggestedPrice: 650, status: 'approved', views: 23, description: 'AC sleeper, upper berth.' },
      { seller: users[1]._id, type: 'bus', source: 'Delhi', destination: 'Dehradun', travelDate: futureDate(10), travelTime: '23:00', operator: 'Obsidian Premium', seatNumber: '5A', pnr: 'OB12345678', originalPrice: 1000, sellingPrice: 800, aiSuggestedPrice: 850, status: 'approved', views: 89, description: 'Premium electric luxury bus!' },
      { seller: users[4]._id, type: 'bus', source: 'Pune', destination: 'Mumbai', travelDate: futureDate(1), travelTime: '07:00', operator: 'Emirates Road', seatNumber: 'C1', pnr: 'ER11223344', originalPrice: 500, sellingPrice: 350, aiSuggestedPrice: 380, status: 'approved', isUrgent: true, views: 12, description: 'Morning AC bus, reaches in 3.5 hours.' },
      { seller: users[2]._id, type: 'bus', source: 'Kolkata', destination: 'Siliguri', travelDate: futureDate(12), travelTime: '16:30', operator: 'Royal Transit', seatNumber: '18', pnr: 'RT4567890', originalPrice: 1200, sellingPrice: 900, status: 'pending', views: 5 },
      { seller: users[3]._id, type: 'bus', source: 'Lucknow', destination: 'Delhi', travelDate: futureDate(3), travelTime: '05:45', operator: 'Gold Class', seatNumber: '7', pnr: 'GC5566778', originalPrice: 800, sellingPrice: 600, status: 'pending', views: 8 }
    ]);

    console.log('Tickets seeded');

    // Create some orders
    await Order.insertMany([
      { buyer: users[5]._id, seller: users[1]._id, ticket: tickets[0]._id, amount: 4200, platformFee: 210, sellerEarnings: 3990, paymentStatus: 'released', status: 'completed', completedAt: new Date() },
      { buyer: users[5]._id, seller: users[2]._id, ticket: tickets[1]._id, amount: 900, platformFee: 45, sellerEarnings: 855, paymentStatus: 'held', status: 'confirmed' }
    ]);

    console.log('Orders seeded');
    console.log('✅ Database seeded successfully!');
    process.exit(0);
  } catch (err) {
    console.error('Seed error:', err);
    process.exit(1);
  }
};

seed();
