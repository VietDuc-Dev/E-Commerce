# 🛍️ E-Commerce Full-Stack Application

## 📌 Project Overview

Welcome to VietDuc E-Commerce, a modern and scalable online shopping platform built with (Node.js, Express, Postgresql, React, typeScript). This application delivers all essential features of a real-world e-commerce system: product management, cart, checkout, order workflow, admin dashboard, role-based access, JWT security, and more.

---

## 🌟 Key Features

- 🔐 **Authentication & Authorization** (JWT,
  change password by email, Role-based: User / Admin)

- 👤 **User Profile Management** (Update info, shipping addresses)

- 🛒 **Shopping Cart** (Add, remove, update quantity)

- 🧾 **Checkout Flow** (Order creation, payment, shipping)

- 💳 **Payment Integration** (Stripe)

- 📦 **Order Management** (CRUD, status updates)

- 🏷️ **Product Management** (CRUD, categories, tags, filters)

- 🖼️ **Product Image Gallery** (Multiple images, Cloudinary/local uploads)

- 🔍 **Advanced Search & Filters** (Keyword, category, price range, AI assistant)

- ⭐ **Product Reviews & Ratings**

- 📊 **Admin Dashboard**

- 📈 **Analytics** (Revenue, top products, sales trends)

- 📅 **Pagination & Sorting**

---

## 🚀 Tools & Technologies

This project leverages the latest tools and frameworks for modern development:

- **Node.js + Express** — RESTful backend

- **React.js** — Modern, fast frontend

- **Postgre DB**

- **Redux Toolkit / Zustand** — State management

- **JWT Authentication**

- **TailwindCSS / Shadcn UI** — Responsive UI styling

- **Cloudinary** — Product media storage

- **Stripe** — Payment gateway support

- **Vite.js** — Fast developer experience

- **TypeScript** — Optional type-safe codebase

---

## 🔄 Getting Started

### 1. DEMO

- Client : https://e-commerce-wine-one-72.vercel.app/
- Dashboard : https://e-commerce-dashboard-hazel.vercel.app/

### 2. Environment Variables

Create a .env file inside your backend folder:

```plaintext
PORT = 4000
FRONTEND_URL =
DASHBOARD_URL =

JWT_EXPIRES_IN =
COOKIE_EXPIRES_IN =
JWT_SECRET_KEY =

SMTP_SERVICE =
SMTP_MAIL =
SMTP_PASSWORD =
SMTP_HOST =
SMTP_PORT =

GEMINI_API_KEY =

CLOUDINARY_CLIENT_NAME =
CLOUDINARY_CLIENT_API =
CLOUDINARY_CLIENT_SECRET =

STRIPE_SECRET_KEY =
STRIPE_WEBHOOK_SECRET =
STRIPE_FRONTEND_KEY =

# DB_USER =
# DB_HOST =
# DB_NAME =
# DB_PASSWORD =
# DB_PORT =

DATABASE_URL=
```

For frontend:

```plaintext
VITE_API_BASE_URL=

VITE_FRONT_END_URL=

VITE_STRIPE_KEY=
```

▶️ Running the Application

- Backend

```bash
cd backend
npm install
npm run dev
```

- Frontend

```bash
cd frontend
npm install
npm run dev
```

---

## 🌐 Deployment

1. Add Environment Variables

Configure all .env values on your hosting provider (Render, Vercel)

2. Deploy Backend : Render

3. Deploy Frontend : Vercel
