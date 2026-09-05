# PCFORGE — PC Components E-commerce (MERN)

A black/grey/white PC-parts store with a signature scroll-driven hero: the
computer explodes into its components (CPU, GPU, RAM, SSD, motherboard, PSU,
cooler, cabinet) as you scroll, each part labeled with its specs.

Stack: **MongoDB, Express, React (Vite), Node.js**, animation via **GSAP ScrollTrigger**.

```
pcforge/
├── client/          React + Vite frontend
├── server/          Express + MongoDB API
└── demo-preview.html   Standalone static preview of the scroll effect
```

## 1. Prerequisites

- Node.js 18+
- A MongoDB instance — either:
  - local: `mongodb://127.0.0.1:27017/pcforge` (install MongoDB Community Server), or
  - free cloud: a [MongoDB Atlas](https://www.mongodb.com/atlas) cluster (copy its connection string)

## 2. Backend setup

```bash
cd server
npm install
cp .env.example .env
# edit .env: set MONGO_URI to your local or Atlas connection string,
# and set JWT_SECRET to any long random string
npm run seed     # populates the database with 8 sample products
npm run dev      # starts the API on http://localhost:5000
```

## 3. Frontend setup

In a second terminal:

```bash
cd client
npm install
npm run dev      # starts the site on http://localhost:5173
```

The Vite dev server proxies `/api` requests to `http://localhost:5000`, so
just open **http://localhost:5173** — no extra config needed.

## 4. What's included

**Backend (`/server`)**
- `models/` — `Product`, `User`, `Order` (Mongoose)
- `routes/` + `controllers/` — REST API for products, auth (JWT), orders
- `middleware/authMiddleware.js` — route protection + admin gating
- `config/seed.js` — sample catalog of processors, GPUs, RAM, SSDs, motherboards, PSUs, cabinets, coolers

**Frontend (`/client`)**
- `components/ExplodedHero.jsx` — the signature scroll effect (GSAP ScrollTrigger, scrubbed to scroll position, SVG parts, spec labels, progress rail)
- `components/CategoryGrid.jsx`, `ProductCard.jsx`, `Navbar.jsx`, `Footer.jsx`
- `pages/` — Home, Shop (category filter + sort + pagination), ProductDetail, Cart, Checkout, Login, Register
- `context/CartContext.jsx` — cart persisted to `localStorage`
- `context/AuthContext.jsx` — JWT auth persisted to `localStorage`

## 5. API reference

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | `/api/products` | – | List products (`?category=&search=&sort=&page=&limit=&featured=`) |
| GET | `/api/products/:slug` | – | Single product |
| GET | `/api/products/categories/summary` | – | Item counts per category |
| POST | `/api/products` | admin | Create product |
| PUT | `/api/products/:id` | admin | Update product |
| DELETE | `/api/products/:id` | admin | Delete product |
| POST | `/api/auth/register` | – | Create account |
| POST | `/api/auth/login` | – | Log in |
| GET | `/api/auth/profile` | user | Current user |
| POST | `/api/orders` | user | Place order |
| GET | `/api/orders/mine` | user | My orders |
| GET | `/api/orders/:id` | user/admin | Single order |
| GET | `/api/orders` | admin | All orders |
| PUT | `/api/orders/:id/status` | admin | Update order status |

## 6. Making an admin user

Register normally via the site, then in MongoDB set that user's `isAdmin`
field to `true` (e.g. via `mongosh` or MongoDB Compass) to unlock the
product-management endpoints.

## 7. Customizing the color system

All design tokens live in `client/src/styles/global.css` as CSS variables
(`--bg`, `--panel`, `--border`, `--steel`, `--silver`, `--offwhite`, `--white`).
Every component reads from these, so the whole site's palette can be
retuned from one place while staying within black/grey/white.

## 8. Building for production

```bash
cd client && npm run build     # outputs client/dist
cd server && npm start         # run the API with a process manager (pm2, etc.)
```

Serve `client/dist` behind any static host or through Express
(`express.static`), pointing it at your deployed API's URL.
