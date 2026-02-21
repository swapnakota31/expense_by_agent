# Expense Tracker Backend

Backend API for Expense Tracker using Node.js, Express, MongoDB, and JWT auth.

## Run locally

1. Copy `.env.example` to `.env`
2. Update `MONGO_URI` and `JWT_SECRET`
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start in dev mode:
   ```bash
   npm run dev
   ```

## API Base URL
`http://localhost:5000/api`

## Main Routes
- `POST /auth/register`
- `POST /auth/login`
- `GET /dashboard` (protected)
- `GET /expenses` (protected, optional `?category=Food`)
- `POST /expenses` (protected)
- `PUT /expenses/:id` (protected)
- `DELETE /expenses/:id` (protected)
