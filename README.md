# Obsidian Move 🎫✈️

> **Recover Money From Cancelled Journeys**

AI-powered travel ticket resale marketplace where users can securely buy and sell already-booked bus, train, and flight tickets.

![Obsidian Move](https://img.shields.io/badge/Obsidian Move-v1.0-6366f1?style=for-the-badge)
![Next.js](https://img.shields.io/badge/Next.js-14-000000?style=for-the-badge&logo=next.js)
![Express](https://img.shields.io/badge/Express-4-000000?style=for-the-badge&logo=express)
![MongoDB](https://img.shields.io/badge/MongoDB-8-47A248?style=for-the-badge&logo=mongodb)

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- MongoDB (local or Atlas)
- npm

### 1. Backend Setup
```bash
cd backend
npm install
# Start MongoDB locally or update .env with your MongoDB URI
npm run dev
# API runs on http://localhost:5000
```

### 2. Seed Sample Data
```bash
cd backend
npm run seed
```

### 3. Frontend Setup
```bash
cd frontend
npm install
npm run dev
# App runs on http://localhost:3000
```

### 4. Demo Login Credentials
| Role | Email | Password |
|------|-------|----------|
| User | demo@obsidianmove.com | password123 |
| Admin | admin@obsidianmove.com | password123 |

---

## 📁 Project Structure

```
├── frontend/                 # Next.js 14 (TypeScript, Tailwind CSS)
│   ├── src/app/              # App Router pages
│   ├── src/components/       # Reusable components
│   ├── src/context/          # Auth & Theme providers
│   ├── src/data/             # Demo/sample data
│   └── src/types/            # TypeScript definitions
│
├── backend/                  # Express.js API
│   ├── src/models/           # Mongoose schemas
│   ├── src/routes/           # API routes
│   ├── src/controllers/      # Request handlers
│   ├── src/middleware/       # Auth, error handling
│   ├── src/seed/             # Database seeder
│   └── server.js             # Entry point
```

---

## 🎨 Features

### Core
- ✅ User authentication (JWT + Google OAuth ready)
- ✅ Ticket listing & management
- ✅ Search with advanced filters
- ✅ Buyer/Seller dashboards
- ✅ Admin panel with analytics
- ✅ Profile & KYC verification

### AI-Powered
- ✅ Smart price recommendations
- ✅ Fraud detection scoring
- ✅ Demand prediction
- ✅ AI chatbot assistant

### UI/UX
- ✅ Dark/Light mode
- ✅ Glassmorphism design
- ✅ Framer Motion animations
- ✅ Fully responsive (mobile-first)
- ✅ Loading skeletons
- ✅ Toast notifications
- ✅ Empty states

### Payment
- ✅ Escrow payment flow
- ✅ Wallet system
- ✅ Transaction history
- ✅ Stripe-ready integration

---

## 📡 API Endpoints

| Category | Method | Endpoint | Description |
|----------|--------|----------|-------------|
| Auth | POST | `/api/auth/register` | Register user |
| Auth | POST | `/api/auth/login` | Login |
| Auth | GET | `/api/auth/me` | Get current user |
| Tickets | GET | `/api/tickets` | Search tickets |
| Tickets | POST | `/api/tickets` | Create listing |
| Tickets | GET | `/api/tickets/:id` | Get ticket details |
| Orders | POST | `/api/orders` | Buy ticket |
| Orders | GET | `/api/orders/my-purchases` | Buyer's orders |
| AI | POST | `/api/ai/price-suggest` | AI pricing |
| AI | POST | `/api/ai/chat` | AI chatbot |
| Admin | GET | `/api/admin/stats` | Platform stats |
| Wallet | GET | `/api/wallet/balance` | Wallet balance |

---

## 🛠 Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js 14, React, TypeScript |
| Styling | Tailwind CSS v4 |
| Animations | Framer Motion |
| Icons | Lucide React |
| Backend | Express.js, Node.js |
| Database | MongoDB, Mongoose |
| Auth | JWT, bcryptjs |
| Notifications | react-hot-toast |

---

## 📱 Pages

| Page | Route | Description |
|------|-------|-------------|
| Landing | `/` | Hero, stats, featured tickets |
| Search | `/search` | Filter & browse tickets |
| Ticket Detail | `/ticket/[id]` | Full ticket view + buy |
| Login | `/login` | User authentication |
| Signup | `/signup` | Account creation |
| Seller Dashboard | `/dashboard/seller` | Manage listings |
| Buyer Dashboard | `/dashboard/buyer` | Purchase history |
| Profile | `/dashboard/profile` | Settings & KYC |
| Admin | `/admin` | Platform management |
| About | `/about` | Company info |
| Contact | `/contact` | Contact form |
| FAQ | `/faq` | Common questions |

---

## 🔒 Environment Variables

### Backend (`.env`)
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/obsidianmove
JWT_SECRET=your_secret_key
STRIPE_SECRET_KEY=sk_test_xxx
OPENAI_API_KEY=sk-xxx
```

### Frontend (`.env.local`)
```
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

---

## 📄 License

MIT License — Built with ❤️ by the Obsidian Move team.
