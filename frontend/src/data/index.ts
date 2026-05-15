import { Ticket } from '@/types';

const futureDate = (days: number) => {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d.toISOString();
};

export const demoTickets: Ticket[] = [
  { _id: '1', seller: { id: '2', _id: '2', name: 'Rahul Sharma', email: '', role: 'user', isVerified: true, kyc: { status: 'verified' }, wallet: { balance: 0 }, ratings: { average: 4.8, count: 24 }, totalSales: 12, totalPurchases: 0, createdAt: '' } as any, type: 'bus', source: 'Delhi', destination: 'Manali', travelDate: futureDate(3), travelTime: '18:30', operator: 'Obsidian Premium', seatNumber: 'L4', pnr: 'OB7823456', originalPrice: 1500, sellingPrice: 1200, aiSuggestedPrice: 1100, description: 'Luxury Volvo AC Sleeper. Selling due to plan change.', status: 'approved', isUrgent: false, fraudScore: 5, views: 45, createdAt: futureDate(-2) },
  { _id: '2', seller: { id: '3', _id: '3', name: 'Priya Patel', email: '', role: 'user', isVerified: true, kyc: { status: 'verified' }, wallet: { balance: 0 }, ratings: { average: 4.6, count: 18 }, totalSales: 8, totalPurchases: 0, createdAt: '' } as any, type: 'bus', source: 'Mumbai', destination: 'Goa', travelDate: futureDate(5), travelTime: '22:15', operator: 'Emirates Road', seatNumber: 'S4', pnr: 'ER2847561', originalPrice: 1200, sellingPrice: 900, description: 'Premium AC sleeper berth. Great scenic route!', status: 'approved', isUrgent: false, fraudScore: 3, views: 32, createdAt: futureDate(-1) },
  { _id: '3', seller: { id: '2', _id: '2', name: 'Rahul Sharma', email: '', role: 'user', isVerified: true, kyc: { status: 'verified' }, wallet: { balance: 0 }, ratings: { average: 4.8, count: 24 }, totalSales: 12, totalPurchases: 0, createdAt: '' } as any, type: 'bus', source: 'Bangalore', destination: 'Chennai', travelDate: futureDate(2), travelTime: '21:00', operator: 'Royal Transit', seatNumber: 'A4', pnr: 'RT9912345', originalPrice: 800, sellingPrice: 600, description: 'Luxury Volvo AC Sleeper. Very comfortable.', status: 'approved', isUrgent: true, fraudScore: 2, views: 28, createdAt: futureDate(-1) },
  { _id: '4', seller: { id: '4', _id: '4', name: 'Amit Kumar', email: '', role: 'user', isVerified: true, kyc: { status: 'pending' }, wallet: { balance: 0 }, ratings: { average: 4.2, count: 6 }, totalSales: 3, totalPurchases: 0, createdAt: '' } as any, type: 'bus', source: 'Bangalore', destination: 'Hyderabad', travelDate: futureDate(7), travelTime: '22:00', operator: 'Gold Class', seatNumber: '8C', pnr: 'GC45678901', originalPrice: 1200, sellingPrice: 800, description: 'Overnight premium bus, includes blanket.', status: 'approved', isUrgent: false, fraudScore: 8, views: 67, createdAt: futureDate(-3) },
  { _id: '5', seller: { id: '5', _id: '5', name: 'Sneha Reddy', email: '', role: 'user', isVerified: true, kyc: { status: 'verified' }, wallet: { balance: 0 }, ratings: { average: 4.9, count: 32 }, totalSales: 20, totalPurchases: 0, createdAt: '' } as any, type: 'bus', source: 'Delhi', destination: 'Jaipur', travelDate: futureDate(4), travelTime: '15:30', operator: 'Obsidian Premium', seatNumber: '15', pnr: 'OB1234567', originalPrice: 900, sellingPrice: 700, description: 'AC Seater with high-speed WiFi included.', status: 'approved', isUrgent: false, fraudScore: 1, views: 41, createdAt: futureDate(-2) },
  { _id: '6', seller: { id: '5', _id: '5', name: 'Sneha Reddy', email: '', role: 'user', isVerified: true, kyc: { status: 'verified' }, wallet: { balance: 0 }, ratings: { average: 4.9, count: 32 }, totalSales: 20, totalPurchases: 0, createdAt: '' } as any, type: 'bus', source: 'Mumbai', destination: 'Pune', travelDate: futureDate(6), travelTime: '14:45', operator: 'Emirates Road', seatNumber: '22', pnr: 'ER78901234', originalPrice: 600, sellingPrice: 400, description: 'Afternoon luxury bus, window seat.', status: 'approved', isUrgent: false, fraudScore: 4, views: 55, createdAt: futureDate(-4) },
  { _id: '7', seller: { id: '3', _id: '3', name: 'Priya Patel', email: '', role: 'user', isVerified: true, kyc: { status: 'verified' }, wallet: { balance: 0 }, ratings: { average: 4.6, count: 18 }, totalSales: 8, totalPurchases: 0, createdAt: '' } as any, type: 'bus', source: 'Hyderabad', destination: 'Bangalore', travelDate: futureDate(1), travelTime: '20:30', operator: 'Gold Class', seatNumber: 'B2', pnr: 'GC55667788', originalPrice: 1100, sellingPrice: 750, description: 'Premium AC Sleeper bus, travels overnight.', status: 'approved', isUrgent: true, fraudScore: 6, views: 19, createdAt: futureDate(-1) },
  { _id: '8', seller: { id: '4', _id: '4', name: 'Amit Kumar', email: '', role: 'user', isVerified: true, kyc: { status: 'pending' }, wallet: { balance: 0 }, ratings: { average: 4.2, count: 6 }, totalSales: 3, totalPurchases: 0, createdAt: '' } as any, type: 'bus', source: 'Chennai', destination: 'Madurai', travelDate: futureDate(8), travelTime: '18:00', operator: 'Royal Transit', seatNumber: 'U1', pnr: 'RT9876543', originalPrice: 800, sellingPrice: 600, description: 'AC sleeper, upper berth.', status: 'approved', isUrgent: false, fraudScore: 3, views: 23, createdAt: futureDate(-5) },
  { _id: '9', seller: { id: '2', _id: '2', name: 'Rahul Sharma', email: '', role: 'user', isVerified: true, kyc: { status: 'verified' }, wallet: { balance: 0 }, ratings: { average: 4.8, count: 24 }, totalSales: 12, totalPurchases: 0, createdAt: '' } as any, type: 'bus', source: 'Delhi', destination: 'Dehradun', travelDate: futureDate(10), travelTime: '23:00', operator: 'Obsidian Premium', seatNumber: '5A', pnr: 'OB12345678', originalPrice: 1000, sellingPrice: 800, description: 'Premium electric luxury bus!', status: 'approved', isUrgent: false, fraudScore: 2, views: 89, createdAt: futureDate(-6) },
];

export const popularRoutes = [
  { source: 'Delhi', destination: 'Manali', count: 245, avgSaving: 400, icon: '🚌' },
  { source: 'Mumbai', destination: 'Goa', count: 189, avgSaving: 300, icon: '🚌' },
  { source: 'Bangalore', destination: 'Chennai', count: 156, avgSaving: 200, icon: '🚌' },
  { source: 'Delhi', destination: 'Jaipur', count: 134, avgSaving: 150, icon: '🚌' },
  { source: 'Mumbai', destination: 'Pune', count: 198, avgSaving: 100, icon: '🚌' },
  { source: 'Bangalore', destination: 'Hyderabad', count: 112, avgSaving: 350, icon: '🚌' },
];

export const testimonials = [
  { name: 'Ananya Gupta', role: 'Frequent Traveler', text: 'Saved ₹500 on a Delhi-Manali bus that I found last minute. TravelSwap is a game-changer!', rating: 5, avatar: 'AG' },
  { name: 'Vikram Singh', role: 'Business Professional', text: 'I had to cancel my trip but recovered 85% of my ticket cost through TravelSwap. Amazing platform!', rating: 5, avatar: 'VS' },
  { name: 'Meera Krishnan', role: 'Student', text: 'As a student, every rupee matters. Found discounted luxury bus tickets for my holiday trips.', rating: 4, avatar: 'MK' },
  { name: 'Rajesh Iyer', role: 'Seller', text: 'Sold 15 tickets so far and recovered money from cancelled plans. The AI pricing tool is brilliant.', rating: 5, avatar: 'RI' },
];

export const stats = [
  { label: 'Tickets Sold', value: 12500, suffix: '+' },
  { label: 'Happy Users', value: 8200, suffix: '+' },
  { label: 'Money Saved', value: 25, suffix: 'L+', prefix: '₹' },
  { label: 'Success Rate', value: 98, suffix: '%' },
];

export const cities = [
  'Delhi', 'Mumbai', 'Bangalore', 'Chennai', 'Kolkata', 'Hyderabad',
  'Pune', 'Jaipur', 'Goa', 'Lucknow', 'Ahmedabad', 'Kochi',
  'Chandigarh', 'Indore', 'Bhopal', 'Varanasi', 'Patna', 'Surat'
];

export const faqData = [
  { q: 'How does TravelSwap work?', a: 'TravelSwap allows you to list your unused luxury bus tickets for resale. Buyers can search and purchase these tickets at discounted prices. Our AI verifies tickets and suggests fair pricing.' },
  { q: 'Is it legal to resell tickets?', a: 'TravelSwap facilitates the transfer of tickets through name-change processes supported by transport operators. We ensure all transfers comply with operator policies.' },
  { q: 'How is payment handled?', a: 'Payments are held in escrow. The seller receives payment only after the buyer confirms ticket receipt. This protects both parties.' },
  { q: 'What if I receive an invalid ticket?', a: 'We verify all tickets before listing. If you receive an invalid ticket, raise a dispute and our team will investigate within 24 hours. Full refunds are provided for verified fraud cases.' },
  { q: 'What are the fees?', a: 'TravelSwap charges a 5% platform fee on successful sales. Buyers pay the listed price with no additional fees.' },
  { q: 'How long does ticket transfer take?', a: 'Most transfers are completed within 2-4 hours after purchase. Operator confirmation may vary but we strive for instant transfers.' },
  { q: 'Can I cancel after buying?', a: 'Cancellation is available within 30 minutes of purchase for a full refund. After that, standard cancellation policies apply.' },
  { q: 'How does AI pricing work?', a: 'Our AI analyzes route demand, travel date, operator type, and market conditions to suggest optimal pricing that maximizes both seller recovery and buyer savings.' },
];
