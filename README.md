# Forever - Full Stack E-Commerce Application

A modern, full-stack e-commerce platform built with React, Node.js (TypeScript), and MongoDB. This monorepo contains the frontend customer application, admin dashboard, and backend API server.

## 📋 Table of Contents

- [Project Overview](#project-overview)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation & Setup](#installation--setup)
- [Running the Application](#running-the-application)
- [Environment Variables](#environment-variables)
- [API Endpoints](#api-endpoints)
- [Features](#features)
- [Deployment](#deployment)

## 🎯 Project Overview

Forever is a full-featured e-commerce platform featuring:
- **Customer-facing frontend** for browsing products, shopping, and order management
- **Admin dashboard** for product and order management
- **RESTful backend API** for all business logic
- **Payment integration** with Stripe and Razorpay
- **Image management** via Cloudinary
- **User authentication** with JWT

## 🛠 Tech Stack

### Frontend & Admin
- **Framework**: React 19 (TypeScript)
- **Build Tool**: Vite 7
- **Styling**: Tailwind CSS 4
- **Routing**: React Router DOM 7
- **HTTP Client**: Axios
- **State Management**: React Context API
- **Notifications**: React Toastify
- **Linting**: ESLint 9

### Backend
- **Runtime**: Node.js (TypeScript)
- **Framework**: Express 5
- **Database**: MongoDB with Mongoose 9
- **Authentication**: JWT (jsonwebtoken)
- **Security**: Bcrypt for password hashing
- **File Upload**: Multer
- **Image Service**: Cloudinary
- **Payment**: Stripe & Razorpay
- **Development**: tsx (watch mode)
- **Environment**: dotenv

## 📁 Project Structure

```
forever-main/
├── admin/                    # Admin dashboard (React + Vite + TS)
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── pages/           # Admin pages (Add, List, Orders)
│   │   ├── assets/          # Images and static files
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── package.json
│   └── tsconfig.json
│
├── backend/                  # Node.js API server (TypeScript)
│   ├── config/              # Database & Cloudinary config
│   ├── controllers/         # Business logic (user, product, cart, order)
│   ├── middleware/          # Auth, multer, admin auth
│   ├── models/              # MongoDB schemas
│   ├── routes/              # API routes
│   ├── server.ts
│   ├── package.json
│   └── tsconfig.json
│
├── frontend/                 # Customer-facing React app (TS)
│   ├── src/
│   │   ├── components/      # UI components (Hero, Cart, etc.)
│   │   ├── pages/           # Pages (Home, Product, Cart, etc.)
│   │   ├── context/         # ShopContext for state management
│   │   ├── assets/          # Images and constants
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── package.json
│   └── tsconfig.json
│
├── start.sh                 # Script to launch all services
├── vercel.json              # Vercel deployment configuration
└── README.md
```

## 📦 Prerequisites

- **Node.js** 20 or higher
- **npm** or yarn
- **MongoDB** (local or Atlas connection string)
- **Cloudinary** account (optional, for image uploads)
- **Stripe/Razorpay** accounts (optional, for payments)

## ⚙️ Installation & Setup

### 1. Clone the Repository

```bash
git clone <repository-url>
cd forever-main
```

### 2. Install Dependencies for All Apps

```bash
# Backend dependencies
cd backend
npm install
cd ..

# Frontend dependencies
cd frontend
npm install
cd ..

# Admin dependencies
cd admin
npm install
cd ..
```

### 3. Configure Environment Variables

Create `.env` files in the `backend` directory with required variables (see [Environment Variables](#environment-variables) section).

### 4. Database Setup

Ensure MongoDB is running and accessible. Update the connection string in `backend/.env`.

## 🚀 Running the Application

### Option 1: Run All Services Simultaneously

You can use the provided shell script:
```bash
chmod +x start.sh
./start.sh
```

Or manually in separate terminals:

**Terminal 1 - Backend API**
```bash
cd backend
npm run dev       # Runs with tsx watch
```

**Terminal 2 - Frontend**
```bash
cd frontend
npm run dev       # Starts Vite dev server (http://localhost:5173)
```

**Terminal 3 - Admin Dashboard**
```bash
cd admin
npm run dev       # Starts Vite dev server (http://localhost:5174)
```

### Option 2: Production Build

```bash
# Build all applications
cd frontend && npm run build && cd ..
cd admin && npm run build && cd ..

# Run backend in production
cd backend && npm start
```

## 🔐 Environment Variables

Create a `backend/.env` file with the following variables:

```env
# Server Configuration
PORT=4000
NODE_ENV=development

# Database
MONGODB_URI=<your-mongodb-connection-string>

# JWT
JWT_SECRET=<your-jwt-secret-key>
ADMIN_EMAIL=<admin-email>
ADMIN_PASSWORD=<admin-password>

# Cloudinary (Image Management)
CLOUDINARY_NAME=<your-cloudinary-name>
CLOUDINARY_API_KEY=<your-cloudinary-api-key>
CLOUDINARY_API_SECRET=<your-cloudinary-api-secret>

# Payment Gateways
STRIPE_SECRET_KEY=<your-stripe-secret-key>
RAZORPAY_KEY_ID=<your-razorpay-key-id>
RAZORPAY_KEY_SECRET=<your-razorpay-key-secret>

# Initial API URL (for production/frontend)
# VITE_API_URL=http://localhost:4000
```

## 📡 API Endpoints

### User Authentication
- `POST /api/user/register` - Register new user
- `POST /api/user/login` - User login
- `POST /api/user/admin` - Admin login

### Products
- `GET /api/product/list` - Get all products
- `POST /api/product/single` - Get product details
- `POST /api/product/add` - Add product (admin only)
- `POST /api/product/remove` - Remove product (admin only)

### Cart
- `POST /api/cart/get` - Get user cart (auth required)
- `POST /api/cart/add` - Add item to cart (auth required)
- `POST /api/cart/update` - Update cart item quantity (auth required)

### Orders
- `POST /api/order/place` - Place new order (COD)
- `POST /api/order/stripe` - Place order with Stripe
- `POST /api/order/list` - Get all orders (admin only)
- `POST /api/order/status` - Update order status (admin only)
- `POST /api/order/userorders` - Get user orders (auth required)
- `POST /api/order/verifyStripe` - Verify Stripe payment

## ✨ Features

### Frontend (Customer)
- ✅ Product browsing and search
- ✅ Product filtering and sorting
- ✅ Shopping cart management
- ✅ User authentication
- ✅ Order placement (COD, Stripe)
- ✅ Payment integration (Stripe/Razorpay)
- ✅ Order history and status tracking
- ✅ Responsive design (Tailwind CSS 4)

### Admin Dashboard
- ✅ Product management (add, remove)
- ✅ Order management and status updates
- ✅ Secure admin login
- ✅ Multiple image uploads per product (Cloudinary)

### Backend
- ✅ RESTful API built with TypeScript & Node.js
- ✅ JWT-based authentication
- ✅ Role-based access control (Admin/User)
- ✅ MongoDB data persistence with Mongoose 9
- ✅ Cloudinary image hosting
- ✅ Payment processing (Stripe/Razorpay)

## 🚀 Deployment

The project includes `vercel.json` configurations in multiple directories, making it ready for deployment on **Vercel**.

### Backend Deployment
1. Connect your repository to Vercel.
2. Set the root directory to `backend`.
3. Add all required environment variables.

### Frontend/Admin Deployment
1. Connect your repository to Vercel.
2. Set the root directory to `frontend` (or `admin`).
3. Set the build command to `npm run build`.
4. Set the output directory to `dist`.

## 🐛 Troubleshooting

### MongoDB Connection Timeout
If you see connection pool errors, check:
1. MongoDB is running and accessible
2. Your connection string in `.env` is correct
3. Your IP is whitelisted if using MongoDB Atlas


