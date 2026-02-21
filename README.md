# Expense Tracker (Full-Stack)

A full-stack Expense Tracker web app built with:
- **Frontend:** React (Vite), Tailwind CSS, Axios
- **Backend:** Node.js, Express (MVC)
- **Database:** MongoDB with Mongoose
- **Auth:** JWT + bcrypt password hashing

---

## Project Structure (Beginner-Friendly)

```text
expenseerr/
  backend/
    src/
      config/          # Database connection setup
      controllers/     # Request handling logic
      middlewares/     # Auth + error middleware
      models/          # Mongoose schemas
      routes/          # API route definitions
      utils/           # Helper functions (JWT generator)
      app.js           # Express app config
      server.js        # Server bootstrap
    .env.example
    package.json

  frontend/
    src/
      api/             # Axios client
      components/      # Reusable UI components
      context/         # Auth context provider
      pages/           # Login, Register, Dashboard pages
      types/           # Shared TypeScript interfaces
      App.tsx          # Route mapping
      main.tsx         # App entry
      index.css        # Tailwind imports + base styles
    .env.example
    tailwind.config.js
    package.json
```

---

## Backend Setup (Start Here)

1. Open terminal and go to backend:
   ```bash
   cd backend
   ```
2. Copy environment file:
   ```bash
   cp .env.example .env
   ```
   On Windows PowerShell:
   ```powershell
   Copy-Item .env.example .env
   ```
3. Update `.env` values:
   - `MONGO_URI` (your MongoDB connection string)
   - `JWT_SECRET` (any long secret text)
4. Install dependencies:
   ```bash
   npm install
   ```
5. Run backend server:
   ```bash
   npm run dev
   ```
6. Verify server health:
   - Open: `http://localhost:5000/api/health`

---

## Frontend Setup

1. Open a second terminal and go to frontend:
   ```bash
   cd frontend
   ```
2. Copy frontend environment file:
   ```bash
   cp .env.example .env
   ```
   On Windows PowerShell:
   ```powershell
   Copy-Item .env.example .env
   ```
3. Check `VITE_API_BASE_URL` in `.env`:
   ```env
   VITE_API_BASE_URL=http://localhost:5000/api
   ```
4. Install dependencies:
   ```bash
   npm install
   ```
5. Run frontend:
   ```bash
   npm run dev
   ```
6. Open app in browser:
   - `http://localhost:5173`

---

## Main Features Included

- Authentication:
  - Register (name, email, password)
  - Login
  - bcrypt password hashing
  - JWT token auth
  - Protected dashboard route
- Expense Management:
  - Add expense (title, amount, category, date)
  - View logged-in user expenses
  - Edit expense
  - Delete expense
  - Total expense tracking
  - Category filter
- Dashboard:
  - Total expenses
  - Number of transactions
  - Latest 5 transactions

---

## API Routes

Base URL: `http://localhost:5000/api`

- `POST /auth/register`
- `POST /auth/login`
- `GET /dashboard` (protected)
- `GET /expenses` (protected, optional `?category=Food`)
- `POST /expenses` (protected)
- `PUT /expenses/:id` (protected)
- `DELETE /expenses/:id` (protected)

---

## Notes

- If MongoDB is local, make sure MongoDB service is running.
- If you use MongoDB Atlas, set the Atlas URI in backend `.env`.
- Default CORS is enabled for development.
