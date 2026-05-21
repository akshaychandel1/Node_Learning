# Full Stack Notes App - React + Node.js + PostgreSQL

A complete full-stack application with authentication (JWT), beautiful UI design, and notes CRUD functionality. Built with React TypeScript frontend, Express Node.js backend, and PostgreSQL database.

## 🎯 Features

### Backend (Node.js + Express)
✅ User authentication (register/login)
✅ JWT token management
✅ Password hashing with bcrypt
✅ Notes CRUD operations
✅ User management
✅ PostgreSQL database
✅ TypeScript for type safety

### Frontend (React + TypeScript)
✅ Beautiful authentication pages (login/register)
✅ Glass-morphism design with gradients
✅ Responsive layout (mobile-friendly)
✅ JWT middleware for token validation
✅ Protected routes
✅ Notes management (create, read, update, delete)
✅ State management with Zustand
✅ API integration with axios
✅ Tailwind CSS styling

## 📁 Project Structure

```
NodeLearning/
├── Backend/
│   ├── app.ts                    # Express app config
│   ├── server.ts                 # Server entry point
│   ├── database.sql              # Database schema
│   ├── .env                       # Environment variables
│   ├── package.json
│   ├── tsconfig.json
│   ├── config/
│   │   └── db.ts                 # PostgreSQL connection
│   ├── controllers/
│   │   ├── user.controller.ts
│   │   ├── auth.controller.ts    # Authentication logic
│   │   └── note.controller.ts    # Notes CRUD logic
│   ├── routes/
│   │   ├── user.routes.ts
│   │   ├── auth.routes.ts        # Auth endpoints
│   │   └── note.routes.ts        # Notes endpoints
│   ├── middleware/
│   │   └── auth.ts               # JWT middleware
│   └── types/
│       └── user.types.ts
│
└── frontend/
    ├── src/
    │   ├── App.tsx               # Main app component
    │   ├── main.tsx              # Entry point
    │   ├── index.css             # Global styles
    │   ├── components/
    │   │   ├── NoteForm.tsx      # Note creation/edit
    │   │   └── NoteList.tsx      # Display notes
    │   ├── pages/
    │   │   ├── Login.tsx         # Login page
    │   │   ├── Register.tsx      # Registration page
    │   │   └── Dashboard.tsx     # Main dashboard
    │   ├── middleware/
    │   │   ├── jwtMiddleware.ts  # JWT validation
    │   │   └── ProtectedRoute.tsx # Route protection
    │   ├── services/
    │   │   └── api.ts            # API calls
    │   ├── store/
    │   │   ├── authStore.ts      # Auth state
    │   │   └── noteStore.ts      # Notes state
    │   └── types/
    │       └── index.ts          # TypeScript types
    ├── vite.config.ts
    ├── tailwind.config.js
    ├── tsconfig.json
    └── package.json
```

## 🚀 Quick Start

### Prerequisites
- Node.js (v16+)
- PostgreSQL (v12+)
- npm or yarn

### Step 1: Database Setup

Create PostgreSQL database:

```bash
psql -U postgres
# In PostgreSQL shell:
\i /path/to/Backend/database.sql
```

Or run SQL manually:

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

### Step 2: Backend Setup

```bash
cd Backend

# Install dependencies
npm install

# Update .env with your database credentials
# Default values:
# DB_USER=postgres
# DB_PASSWORD=postgres
# DB_HOST=localhost
# DB_PORT=5432
# DB_NAME=users_db
# JWT_SECRET=your-super-secret-jwt-key-change-in-production

# Start development server (runs on port 3000)
npm run dev
```

### Step 3: Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Start development server (runs on port 3001)
npm run dev
```

Access the app at: **http://localhost:3001**

## 🔐 Authentication Flow

1. **Register**: User creates account with name, email, password
2. **Password Hashing**: Password is hashed using bcrypt (10 rounds)
3. **JWT Token**: Backend generates JWT token valid for 24 hours
4. **Token Storage**: Token stored in localStorage
5. **Protected Routes**: Frontend validates token before rendering protected pages
6. **API Requests**: Token automatically attached to all API requests
7. **Token Validation**: Backend middleware validates token on every request

## 📝 API Endpoints

### Authentication
```
POST /auth/register
Body: { name, email, password }

POST /auth/login
Body: { email, password }
```

### Notes
```
GET /notes                    # Get all user notes
GET /notes/:id               # Get specific note
POST /notes                  # Create note
PUT /notes/:id              # Update note
DELETE /notes/:id           # Delete note
```

### Users (Legacy)
```
GET /users                   # Get all users
POST /users                  # Create user
PUT /users/:id              # Update user
DELETE /users/:id           # Delete user
```

## 🎨 UI Components

### Pages
- **Login Page**: Beautiful login form with gradient background
- **Register Page**: Registration form with password confirmation
- **Dashboard**: Main app with notes grid and logout button

### Components
- **NoteForm**: Create and edit notes
- **NoteList**: Display notes in grid layout
- **Protected Routes**: Route guard for authenticated pages

## 🛡️ Security Features

✅ **Password Hashing**: Bcrypt with 10 rounds
✅ **JWT Tokens**: Secure token-based authentication
✅ **Protected Routes**: Frontend route guards
✅ **Token Validation**: Middleware checks token validity
✅ **Expiration**: Tokens expire after 24 hours
✅ **Secure Headers**: CORS and content-type headers

## 📦 Technologies

### Backend
- Node.js + Express
- TypeScript
- PostgreSQL
- JWT (jsonwebtoken)
- Bcrypt
- Dotenv

### Frontend
- React 18
- TypeScript
- Vite
- React Router v6
- Zustand (state management)
- Axios (HTTP client)
- Tailwind CSS
- TailwindUI patterns

## 🎯 User Flow

1. **Anonymous User** → Visits app → Redirected to /login
2. **New User** → Click "Sign Up" → Fill register form → Account created → Logged in
3. **Existing User** → Fill login form → Token received → Redirected to dashboard
4. **Authenticated User** → View/create/edit/delete notes → Token validated on each action
5. **Logout** → Token removed → Redirected to login page

## ⚙️ Build & Deploy

### Build Backend
```bash
cd Backend
npm run build
npm start
```

### Build Frontend
```bash
cd frontend
npm run build
# Output in dist/ folder
```

## 🐛 Troubleshooting

### Backend won't start
- Check PostgreSQL is running
- Verify .env file database credentials
- Run database.sql to create tables

### Frontend API calls failing
- Ensure backend is running on localhost:3000
- Check browser console for errors
- Verify JWT token in localStorage

### Token expiration issues
- Clear localStorage and re-login
- Tokens expire after 24 hours
- Implement token refresh for production

## 🔑 Environment Variables

### Backend (.env)
```
PORT=3000
DB_USER=postgres
DB_PASSWORD=postgres
DB_HOST=localhost
DB_PORT=5432
DB_NAME=users_db
JWT_SECRET=your-super-secret-jwt-key-change-in-production
```

## 📚 Sample API Usage

### Register User
```bash
curl -X POST http://localhost:3000/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"john@example.com","password":"password123"}'
```

### Login
```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"password123"}'
```

### Create Note
```bash
curl -X POST http://localhost:3000/notes \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{"title":"My Note","content":"Note content here"}'
```

### Get Notes
```bash
curl http://localhost:3000/notes \
  -H "Authorization: Bearer YOUR_TOKEN"
```

## 📖 Learning Resources

- **JWT**: https://jwt.io
- **Bcrypt**: https://www.npmjs.com/package/bcrypt
- **React Router**: https://reactrouter.com/
- **Zustand**: https://github.com/pmndrs/zustand
- **Tailwind CSS**: https://tailwindcss.com

## 💡 Next Steps

### Enhancement Ideas
- Email verification
- Password reset functionality
- Social authentication (Google, GitHub)
- Note sharing with other users
- Note categories/tags
- Search functionality
- Note export (PDF, JSON)
- Dark mode toggle
- User profile page
- Note collaboration

## 📝 License

ISC

## 👨‍💻 Author

Built with ❤️ for learning full-stack development

---

**Happy coding! 🚀**
