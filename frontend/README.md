# Frontend - React TypeScript Notes App

Beautiful React TypeScript frontend with authentication (JWT), beautiful UI design, and notes CRUD functionality.

## Features

✨ **Authentication**
- Beautiful login and register pages
- JWT token-based authentication
- Protected routes
- Automatic token refresh

🎨 **Design**
- Modern gradient background
- Glass-morphism effect
- Responsive design
- Tailwind CSS styling

📝 **Notes Management**
- Create, Read, Update, Delete notes
- Beautiful note cards
- Real-time updates

🛡️ **Middleware**
- JWT middleware for token validation
- Protected route middleware
- Automatic token management

## Setup

### Install Dependencies

```bash
npm install
```

### Environment Setup

Make sure the backend is running on `http://localhost:3000`

### Start Development Server

```bash
npm run dev
```

The app will run on `http://localhost:3001`

## API Integration

The frontend connects to the backend API:
- Base URL: `http://localhost:3000`
- Authentication endpoints
- Notes CRUD endpoints

## Project Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── NoteForm.tsx       # Note creation/edit form
│   │   └── NoteList.tsx       # Display notes
│   ├── pages/
│   │   ├── Login.tsx          # Login page
│   │   ├── Register.tsx       # Registration page
│   │   └── Dashboard.tsx      # Main dashboard
│   ├── middleware/
│   │   ├── jwtMiddleware.ts   # JWT validation logic
│   │   └── ProtectedRoute.tsx # Route protection
│   ├── services/
│   │   └── api.ts             # API calls
│   ├── store/
│   │   ├── authStore.ts       # Auth state management
│   │   └── noteStore.ts       # Notes state management
│   ├── types/
│   │   └── index.ts           # TypeScript types
│   ├── App.tsx                # Main app component
│   ├── main.tsx               # Entry point
│   └── index.css              # Global styles
├── vite.config.ts
├── tailwind.config.js
├── tsconfig.json
└── package.json
```

## Technologies Used

- **React 18** - UI framework
- **TypeScript** - Type safety
- **React Router v6** - Routing
- **Zustand** - State management
- **Axios** - HTTP client
- **Tailwind CSS** - Styling
- **Vite** - Build tool

## Usage

### Login
1. Navigate to `/login`
2. Enter email and password
3. Click "Login"

### Register
1. Navigate to `/register`
2. Fill in name, email, and password
3. Click "Sign Up"

### Create Note
1. Click "+ New Note" button
2. Fill in title and content
3. Click "Save Note"

### Edit Note
1. Click "Edit" on a note card
2. Update the content
3. Click "Save Note"

### Delete Note
1. Click "Delete" on a note card

## Authentication Flow

1. User registers/logs in
2. Backend returns JWT token
3. Token stored in localStorage
4. Middleware checks token validity
5. Protected routes validate authentication
6. Token automatically added to API requests

## Building for Production

```bash
npm run build
```

Output will be in `dist/` folder

## Styling

Custom CSS classes available:
- `.glass-effect` - Glass morphism design
- `.btn-primary` - Primary button style
- `.btn-secondary` - Secondary button style
- `.input-field` - Form input style
- `.card` - Card component style

