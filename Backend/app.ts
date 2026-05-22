import express from 'express';
import cors from 'cors';
import userRoutes from './routes/user.routes';
import authRoutes from './routes/auth.routes';
import noteRoutes from './routes/note.routes';

const app = express();

// CORS configuration
app.use(cors({
  origin: ['http://localhost:3001', 'http://localhost:3002'],
  credentials: true,
}));

app.use(express.json());

app.use('/users', userRoutes);
app.use('/auth', authRoutes);
app.use('/notes', noteRoutes);

export default app;