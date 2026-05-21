# 🚀 Complete Setup & Running Guide

## Prerequisites
- PostgreSQL installed and running
- Node.js v16+ installed
- Two terminal windows open

## 📋 Step-by-Step Setup

### 1️⃣ Database Setup (Run Once)

```bash
# Open PostgreSQL
psql -U postgres

# Create database and tables
\i /Users/akshaychandel/Desktop/NodeLearning/Backend/database.sql
```

Or paste this directly in PostgreSQL:

```sql
CREATE DATABASE users_db;
\c users_db;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE notes (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE INDEX idx_email ON users(email);
CREATE INDEX idx_user_notes ON notes(user_id);
```

### 2️⃣ Start Backend (Terminal 1)

```bash
cd /Users/akshaychandel/Desktop/NodeLearning/Backend
npm run dev
```

✅ Backend runs on: **http://localhost:3000**

You should see:
```
✓ Server running on 3000
```

### 3️⃣ Start Frontend (Terminal 2)

```bash
cd /Users/akshaychandel/Desktop/NodeLearning/frontend
npm run dev
```

✅ Frontend runs on: **http://localhost:3001**

You should see:
```
VITE v5.0.0 ready in XXX ms
➜ Local: http://localhost:3001/
```

### 4️⃣ Open App in Browser

🌐 Navigate to: **http://localhost:3001**

## 🧪 Testing the App

### First Time Users

1. **Register**
   - Click "Sign Up"
   - Enter name: `John Doe`
   - Enter email: `john@example.com`
   - Enter password: `password123`
   - Confirm password: `password123`
   - Click "Sign Up"

2. **Auto Redirected to Dashboard**
   - Should see "Welcome, John Doe!"
   - See "+ New Note" button

3. **Create a Note**
   - Click "+ New Note"
   - Title: `My First Note`
   - Content: `This is my first note!`
   - Click "Save Note"

4. **View Notes**
   - Note appears in grid
   - Shows title and preview

5. **Edit Note**
   - Click "Edit" on the note
   - Modify content
   - Click "Save Note"

6. **Delete Note**
   - Click "Delete" on the note

7. **Logout**
   - Click "Logout" button
   - Redirected to login page

### Return Users

1. Click "Login"
2. Enter email: `john@example.com`
3. Enter password: `password123`
4. Click "Login"
5. See your notes in dashboard

## 📱 Features Demonstration

### Beautiful UI ✨
- Gradient background (purple → pink → red)
- Glass-morphism effect on forms
- Smooth animations and transitions
- Responsive mobile design
- Clean typography

### Authentication 🔐
- Secure password hashing
- JWT token generation
- Token stored in localStorage
- Protected routes
- Auto-redirect to login if not authenticated

### Notes Management 📝
- Create unlimited notes
- Edit any note
- Delete notes
- Real-time updates
- Notes displayed in grid

### State Management 🎯
- Zustand stores for auth and notes
- Persistent localStorage
- Automatic token initialization

## 🛠️ Troubleshooting

### Backend Won't Start
```bash
# Check PostgreSQL is running
psql -U postgres -c "SELECT 1"

# Verify .env file in Backend/
cat Backend/.env

# Check if port 3000 is in use
lsof -i :3000

# Kill process on port 3000 if needed
kill -9 <PID>
```

### Frontend Won't Start
```bash
# Clear node_modules cache
rm -rf node_modules package-lock.json
npm install

# Check if port 3001 is in use
lsof -i :3001

# Kill process on port 3001 if needed
kill -9 <PID>
```

### API Calls Not Working
- Ensure backend is running on 3000
- Check browser console (F12) for errors
- Verify token in localStorage
- Check CORS headers in backend

### Token Issues
- Clear localStorage: `localStorage.clear()` in console
- Re-login
- Tokens expire after 24 hours

## 📊 Project Statistics

```
Backend:
- 5 Controllers (user, auth, note)
- 3 Routes (user, auth, note)
- 1 Middleware (JWT auth)
- PostgreSQL integration

Frontend:
- 3 Pages (Login, Register, Dashboard)
- 2 Components (NoteForm, NoteList)
- 2 Stores (Auth, Notes)
- 2 Middleware (JWT, Protected Routes)
- Beautiful Tailwind CSS styling
```

## 🎨 UI Breakdown

### Login Page
- Email input
- Password input
- Login button
- Sign up link

### Register Page
- Name input
- Email input
- Password input
- Confirm password input
- Sign up button
- Login link

### Dashboard
- Header with user name
- Logout button
- + New Note button
- Note cards grid
- Edit button per note
- Delete button per note

## 📚 API Endpoints Ready to Test

```
POST /auth/register        → Register new user
POST /auth/login          → Login existing user
POST /notes               → Create note
GET /notes                → Get all user notes
GET /notes/:id           → Get specific note
PUT /notes/:id           → Update note
DELETE /notes/:id        → Delete note
```

## 💾 Database Schema

### Users Table
- `id` (PK): Auto-incremented ID
- `name`: User's full name
- `email`: Unique email address
- `password`: Hashed password
- `created_at`: Account creation time
- `updated_at`: Last update time

### Notes Table
- `id` (PK): Auto-incremented ID
- `user_id` (FK): References users.id
- `title`: Note title
- `content`: Note content
- `created_at`: Note creation time
- `updated_at`: Last update time

## 🔑 Important Endpoints

### Development URLs
- Frontend: `http://localhost:3001`
- Backend: `http://localhost:3000`
- Database: `localhost:5432` (PostgreSQL)

### Environment Variables (.env)
```
PORT=3000
DB_USER=postgres
DB_PASSWORD=postgres
DB_HOST=localhost
DB_PORT=5432
DB_NAME=users_db
JWT_SECRET=your-super-secret-jwt-key-change-in-production
```

## 📈 Next Steps

After running the app:

1. **Experiment**
   - Create multiple notes
   - Try editing and deleting
   - Test with different browsers

2. **Learn**
   - Study the JWT middleware
   - Understand Zustand stores
   - Review API integration

3. **Enhance**
   - Add note categories
   - Implement note search
   - Add rich text editor
   - Enable note sharing

## ❓ Common Commands

```bash
# Backend
cd Backend
npm run dev          # Development mode
npm run build        # Build TypeScript
npm start            # Production mode

# Frontend
cd frontend
npm run dev          # Development mode
npm run build        # Build for production
npm run preview      # Preview production build

# Database
psql -U postgres     # Connect to PostgreSQL
\l                  # List databases
\c users_db         # Connect to users_db
\dt                 # List tables
\q                  # Quit PostgreSQL
```

## 🎓 Learning Goals Achieved

✅ Full-stack application setup
✅ JWT authentication implementation
✅ React with TypeScript
✅ PostgreSQL integration
✅ RESTful API design
✅ State management
✅ Beautiful UI/UX design
✅ Type-safe middleware

---

**You now have a production-ready full-stack application! 🎉**

**Happy coding! 🚀**
