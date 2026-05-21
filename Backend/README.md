# User CRUD API with PostgreSQL

A complete CRUD (Create, Read, Update, Delete) application built with Node.js, Express, and PostgreSQL.

## Prerequisites

- Node.js (v16+)
- PostgreSQL (v12+)
- npm or yarn

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Database

Update the `.env` file with your PostgreSQL credentials:

```
PORT=3000
DB_USER=postgres
DB_PASSWORD=yourpassword
DB_HOST=localhost
DB_PORT=5432
DB_NAME=users_db
```

### 3. Create Database and Tables

Open PostgreSQL and run:

```bash
psql -U postgres
```

Then execute the SQL file:

```bash
\i database.sql
```

Or run SQL commands directly:

```sql
CREATE DATABASE users_db;
\c users_db;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_email ON users(email);
```

### 4. Start the Application

**Development mode (with auto-reload):**

```bash
npm run dev
```

**Production mode:**

```bash
npm run build
npm start
```

## API Endpoints

### Create User
**POST** `/users`

Request body:
```json
{
  "name": "John Doe",
  "email": "john@example.com"
}
```

Response:
```json
{
  "id": 1,
  "name": "John Doe",
  "email": "john@example.com",
  "created_at": "2026-05-21T10:30:00.000Z",
  "updated_at": "2026-05-21T10:30:00.000Z"
}
```

### Get All Users
**GET** `/users`

Response:
```json
[
  {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "created_at": "2026-05-21T10:30:00.000Z",
    "updated_at": "2026-05-21T10:30:00.000Z"
  }
]
```

### Update User
**PUT** `/users/:id`

Request body:
```json
{
  "name": "Jane Doe",
  "email": "jane@example.com"
}
```

Response:
```json
{
  "id": 1,
  "name": "Jane Doe",
  "email": "jane@example.com",
  "created_at": "2026-05-21T10:30:00.000Z",
  "updated_at": "2026-05-21T10:30:00.000Z"
}
```

### Delete User
**DELETE** `/users/:id`

Response:
```json
{
  "message": "User deleted successfully"
}
```

## Project Structure

```
Backend/
├── app.ts                 # Express app configuration
├── server.ts              # Server entry point
├── database.sql           # Database initialization script
├── .env                   # Environment variables
├── .env.example           # Example environment variables
├── tsconfig.json          # TypeScript configuration
├── package.json           # Project dependencies
├── config/
│   └── db.ts              # PostgreSQL connection pool
├── controllers/
│   └── user.controller.ts # Request handlers
├── services/
│   └── user.service.ts    # Business logic & database queries
├── routes/
│   └── user.routes.ts     # API routes
└── types/
    └── user.types.ts      # TypeScript types/interfaces
```

## Technologies Used

- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **PostgreSQL** - Relational database
- **TypeScript** - Type-safe JavaScript
- **pg** - PostgreSQL client for Node.js
- **ts-node** - TypeScript execution for Node.js
- **Nodemon** - Development auto-reload

## Error Handling

The API includes comprehensive error handling:

- `400 Bad Request` - Missing required fields
- `404 Not Found` - User not found
- `409 Conflict` - Email already exists
- `500 Internal Server Error` - Server error

## Development Tips

1. Use `npm run dev` for development with auto-reload
2. Check `.env` file for correct database credentials
3. Ensure PostgreSQL service is running
4. Use TypeScript strict mode for type safety
5. Check browser console/Postman for API responses

## License

ISC
