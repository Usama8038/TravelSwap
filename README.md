# TravelSwap 🎫✨

> **The Stock Market of Premium Travel**

TravelSwap is a high-fidelity "Luxury Mobility Exchange" built with AI-powered price intelligence and a secure Escrow system. It allows users to recover value from cancelled journeys by trading unused luxury bus tickets in a secure, futuristic ecosystem.

![TravelSwap](https://img.shields.io/badge/TravelSwap-Production_Ready-D4AF37?style=for-the-badge)
![Next.js](https://img.shields.io/badge/Next.js-15-000000?style=for-the-badge&logo=next.js)
![Express](https://img.shields.io/badge/Express-4-000000?style=for-the-badge&logo=express)
![MongoDB](https://img.shields.io/badge/MongoDB-8-47A248?style=for-the-badge&logo=mongodb)
![Socket.io](https://img.shields.io/badge/Socket.io-Live-010101?style=for-the-badge&logo=socket.io)

---

## 💎 The Luxury Mobility Exchange

TravelSwap is not a generic resale site. It's a premium trading floor for mobility assets:
- **Cinematic Experience**: Ultra-premium UI inspired by luxury automotive brands (Porsche, Tesla) and first-class travel.
- **AI Pricing Matrix**: Algorithmic price recommendations based on time-decay velocity, historical route demand, and scarcity.
- **Secure Escrow Layer**: Funds are held in a secure state until the PNR is verified with the operator via our simulated B2B API.
- **Global Real-Time Updates**: Instant notifications for market activity, price alerts, and transaction statuses via Socket.io.

---

## 🚀 Deployment (Production Launch)

This project is configured for one-click deployment to the cloud.

### 1. Database (MongoDB Atlas)
- Set up a cluster on [MongoDB Atlas](https://www.mongodb.com/).
- Whitelist your deployment IPs.
- Copy your `MONGODB_URI`.

### 2. Backend (Render/Railway)
- Connect this repository to [Render](https://render.com).
- The `render.yaml` blueprint will automatically configure the Node.js environment.
- Add your `.env` variables (see section below).

### 3. Frontend (Vercel)
- Connect the `frontend` folder to [Vercel](https://vercel.com).
- Set `NEXT_PUBLIC_API_URL` to your production backend endpoint.

---

## 📁 Project Architecture

```
├── frontend/                 # Next.js 15 (TypeScript, Tailwind CSS v4)
│   ├── src/app/              # Cinematic App Router pages
│   ├── src/context/          # Auth, Theme & Global Real-Time Context
│   ├── src/hooks/            # useSocket & useAuth custom hooks
│   └── src/components/       # Glassmorphism & Motion components
│
├── backend/                  # Node.js & Express.js API
│   ├── src/services/         # EscrowService, OperatorService, SocketService
│   ├── src/controllers/      # AI Pricing Matrix & Auth logic
│   ├── src/middleware/       # JWT Cookie Protection & Security Headers
│   └── server.js             # HTTP & Socket.io server entry
```

---

## 🔒 Production Environment Variables

### Backend (`.env`)
```bash
PORT=5000
NODE_ENV=production
MONGODB_URI=mongodb+srv://...
JWT_SECRET=your_production_secret
JWT_EXPIRE=30d
FRONTEND_URL=https://your-app.vercel.app
```

### Frontend (`.env.local`)
```bash
NEXT_PUBLIC_API_URL=https://your-backend.onrender.com/api
```

---

## 🎨 Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | Next.js 15, React, TypeScript |
| **Styling** | Tailwind CSS v4 (Matte Black & Gold Theme) |
| **Real-Time** | Socket.io (Global Context) |
| **Animations** | Framer Motion (Physics-based) |
| **Backend** | Node.js, Express.js |
| **Security** | Helmet, HPP, XSS-Clean, Rate-Limiting |
| **Database** | MongoDB Atlas, Mongoose |
| **Session** | JWT via Secure HTTP-Only Cookies |

---

## 📄 License

MIT License — Built with ❤️ for the future of mobility.

