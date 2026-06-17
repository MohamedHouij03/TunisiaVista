<div align="center">

# 🌍 TunisiaVista

### Premium Tunisia Tourism Platform

*A full-stack travel booking platform showcasing the destinations, tours, and culture of Tunisia.*

[![Angular](https://img.shields.io/badge/Angular-17-DD0031?style=for-the-badge&logo=angular&logoColor=white)](https://angular.io/)
[![Node.js](https://img.shields.io/badge/Node.js-18%2B-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-4.x-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-8.x-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.4-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Bootstrap](https://img.shields.io/badge/Bootstrap-5.3-7952B3?style=for-the-badge&logo=bootstrap&logoColor=white)](https://getbootstrap.com/)
[![License](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)](#-license)

[Features](#-features) • [Demo](#-demo) • [Quick Start](#-quick-start) • [API Reference](#-api-reference) • [Tech Stack](#-technology-stack)

</div>

---

## 🎥 Demo

<div align="center">

<!--
  Replace the placeholder below with your demo video.
  Option A — Upload a GIF/MP4 to the repo (e.g. docs/demo.gif) and reference it:
    ![Demo](docs/demo.gif)

  Option B — Link to a YouTube video using its thumbnail:
    [![Watch the demo](https://img.youtube.com/vi/VIDEO_ID/maxresdefault.jpg)](https://www.youtube.com/watch?v=VIDEO_ID)
-->

> 📺 **Demo video coming soon** — check back for a full walkthrough of the platform.

</div>

---

## ✨ Features

### 🖥️ Frontend
- 🎨 Modern, responsive UI built with **Angular 17 Standalone Components**
- ⚡ Lazy-loaded routes for fast initial load
- 🎬 Smooth scroll animations powered by **AOS**
- 🔐 JWT authentication with **Angular Signals**
- 📱 Mobile-first, fully responsive layout
- 🖼️ Auto-sliding hero gallery with crossfade transitions

### ⚙️ Backend
- 🚀 RESTful API built with **Express.js**
- 🍃 **Mongoose** ODM with 8 well-defined data models
- 🔑 JWT-based authentication & role-based access control (user / admin)
- ✅ Input validation with `express-validator`
- 🌐 CORS-ready for cross-origin frontend requests

### 🛠️ Admin Panel
- 📊 Dashboard with live KPI statistics
- 📝 Full CRUD for Destinations, Tours, and Blog posts
- 📬 Contact message inbox
- 📅 Booking management & status updates
- 📧 Newsletter subscriber list

---

## 📦 Technology Stack

| Layer | Technology |
|:--|:--|
| **Frontend** | Angular 17 · TypeScript · Bootstrap 5 · SCSS |
| **Backend** | Node.js · Express.js |
| **Database** | MongoDB · Mongoose |
| **Authentication** | JWT (jsonwebtoken) · bcrypt.js |
| **Animations** | AOS (Animate On Scroll) |
| **Icons & Fonts** | Bootstrap Icons · Google Fonts (Playfair Display, Inter) |

---

## 🚀 Quick Start

### Prerequisites

- [Node.js](https://nodejs.org/) ≥ 18
- [MongoDB](https://www.mongodb.com/try/download/community) (local instance or [MongoDB Atlas](https://www.mongodb.com/atlas))
- [Angular CLI](https://angular.io/cli): `npm install -g @angular/cli`

### 1️⃣ Clone the repository

```bash
git clone https://github.com/<your-username>/tunisia-travel.git
cd tunisia-travel
```

### 2️⃣ Backend setup

```bash
cd backend
npm install
```

Create a `.env` file in `backend/` (this file is git-ignored and must never be committed):

```env
PORT=3000
DATABASE_URL=mongodb://127.0.0.1:27017/tunisia_travel
JWT_SECRET=replace_with_a_long_random_secret
JWT_EXPIRES_IN=7d
```

> 💡 Generate a strong secret with:
> `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`

Seed the database with sample destinations, tours, and blog posts:

```bash
npm run seed
```

Start the API server:

```bash
npm run dev      # development (auto-restart with nodemon)
npm start        # production
```

The API will be available at `http://localhost:3000/api`

### 3️⃣ Frontend setup

```bash
cd frontend
npm install
npm start
```

The app will be available at `http://localhost:4200`

### 4️⃣ Add your own images

This project ships without media assets. Drop your own photos into:

```
frontend/src/assets/images/
```

---

## 📁 Project Structure

```
tunisia-travel/
├── backend/
│   ├── app.js                  # Express server entry point
│   ├── config/
│   │   ├── db.js               # MongoDB connection + model registry
│   │   └── config.js           # Environment config loader
│   ├── controllers/            # Route handlers (business logic)
│   ├── middleware/
│   │   └── auth.middleware.js  # JWT verification + role guards
│   ├── models/                 # Mongoose schemas
│   ├── routes/
│   │   └── routes.js           # All API route definitions
│   └── scripts/
│       └── seed.js             # Database seeder
│
└── frontend/
    └── src/app/
        ├── core/
        │   ├── services/        # API, Auth & static data services
        │   ├── guards/           # Route guards (auth / admin)
        │   └── interceptors/     # HTTP interceptors (JWT)
        ├── shared/components/    # Navbar, footer, back-to-top
        ├── pages/                # Public-facing pages
        ├── auth/                 # Login & register
        └── admin/                # Admin panel (role-protected)
```

---

## 🛣️ API Reference

| Method | Endpoint | Auth | Description |
|:--|:--|:--|:--|
| `POST` | `/api/auth/register` | — | Register a new user |
| `POST` | `/api/auth/login` | — | Login, returns JWT |
| `GET` | `/api/auth/profile` | User | Get current profile |
| `PUT` | `/api/auth/profile` | User | Update profile |
| `GET` | `/api/destinations` | — | List all destinations |
| `GET` | `/api/destinations/featured` | — | Featured destinations only |
| `GET` | `/api/destinations/:id` | — | Single destination |
| `POST` | `/api/destinations` | Admin | Create destination |
| `PUT` | `/api/destinations/:id` | Admin | Update destination |
| `DELETE` | `/api/destinations/:id` | Admin | Delete destination |
| `GET` | `/api/tours` | — | List all tours |
| `GET` | `/api/tours/:id` | — | Single tour (by id or slug) |
| `POST` | `/api/tours` | Admin | Create tour |
| `PUT` | `/api/tours/:id` | Admin | Update tour |
| `DELETE` | `/api/tours/:id` | Admin | Delete tour |
| `GET` | `/api/blog` | — | List blog posts (paginated) |
| `GET` | `/api/blog/:id` | — | Single blog post |
| `POST`/`PUT`/`DELETE` | `/api/blog/:id` | Admin | Manage blog posts |
| `GET` | `/api/testimonials` | — | List testimonials |
| `POST` | `/api/contact` | — | Send a contact message |
| `GET` | `/api/contact` | Admin | View all messages |
| `POST` | `/api/bookings` | User | Create a booking |
| `GET` | `/api/bookings/my` | User | Get my bookings |
| `GET` | `/api/bookings` | Admin | View all bookings |
| `PUT` | `/api/bookings/:id` | Admin | Update booking status |
| `POST` | `/api/newsletter/subscribe` | — | Subscribe to newsletter |
| `GET` | `/api/admin/stats` | Admin | Dashboard KPI stats |

---

## 🎨 Design System

| Token | Value | Usage |
|:--|:--|:--|
| `--clr-primary` | `#1B4F8A` | Mediterranean blue — primary brand color |
| `--clr-secondary` | `#C8955E` | Sand / warm gold — accents |
| `--clr-accent` | `#D4AF37` | Pure gold — call-to-action elements |
| `--clr-navy` | `#0A1628` | Deep navy — headings |
| `--clr-sand` | `#F5EDD9` | Sand beige — backgrounds |
| `--font-heading` | Playfair Display | All headings |
| `--font-body` | Inter | Body text |
| `--font-elegant` | Cormorant Garamond | Pull quotes |

---

## 🔒 Security Notes

- `.env` files are git-ignored — never commit secrets or connection strings.
- Passwords are hashed with `bcryptjs` before storage.
- Protected routes require a valid JWT, verified via middleware.
- Admin-only routes are additionally gated by role-based access control.

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

Distributed under the **MIT License**. See `LICENSE` for more information.

---

<div align="center">

Made with ❤️ for Tunisia 🇹🇳

</div>
