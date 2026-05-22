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

// Debug: list registered routes
setTimeout(() => {
  try {
    // @ts-ignore
    if (!app._router || !app._router.stack) {
      console.log('No router stack available yet');
      return;
    }
    const routes = app._router.stack
      .filter((r: any) => r.route)
      .map((r: any) => ({ path: r.route.path, methods: r.route.methods }));
    console.log('Registered routes:', routes);
  } catch (e) {
    console.error('Failed to list routes', e);
  }
}, 500);

// HTTP endpoint for runtime route inspection
app.get('/debug/routes', (req, res) => {
  try {
    // @ts-ignore
    if (!app._router || !app._router.stack) {
      return res.status(200).json([]);
    }
    const routes = app._router.stack
      .filter((r: any) => r.route)
      .map((r: any) => ({ path: r.route.path, methods: r.route.methods }));
    res.json(routes);
  } catch (e) {
    res.status(500).json({ error: 'Failed to list routes' });
  }
});

export default app;