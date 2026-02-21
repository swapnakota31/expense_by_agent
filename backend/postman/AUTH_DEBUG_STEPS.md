# Auth Debug Steps (Postman)

## 1) Import Collection
- Open Postman
- Import file: `backend/postman/ExpenseTracker-Auth-Debug.postman_collection.json`

## 2) Start Backend
```bash
cd backend
npm run dev
```

## 3) Run Requests In Order
1. **Register User**
2. **Login User**

## 4) Expected Results

### Register User
- Success: `201` with `token` and `user`
- If `User already exists`: use a new email value in collection variable `email`

### Login User
- Success: `200` with `token`
- `Invalid credentials` means either wrong email/password OR mismatch in DB data

## 5) Fast Diagnosis Matrix

- Register works, but Login fails:
  - Password typed wrong
  - Email mismatch (different case/whitespace from what was entered)
  - App is pointing to different MongoDB instance/DB
  - Try a fresh email and password and test again

## 6) Frontend URL Check
- Frontend uses `VITE_API_BASE_URL`
- Ensure `frontend/.env` contains:
```env
VITE_API_BASE_URL=http://localhost:5000/api
```
- Restart frontend after env changes.
