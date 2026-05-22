import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { pool } from '../config/db';

export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password, role: requestedRole } = req.body;

    if (!name || !email || !password) {
      res.status(400).json({
        error: 'Name, email, and password are required',
      });
      return;
    }

    // Check if user already exists
    const userExists = await pool.query(
      'SELECT * FROM users WHERE email = $1',
      [email]
    );

    if (userExists.rows.length > 0) {
      res.status(409).json({ error: 'Email already exists' });
      return;
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Allow any valid role to be chosen at signup
    const validRoles = ['user', 'manager', 'admin'];
    let assignedRole = 'user';
    if (requestedRole && validRoles.includes(requestedRole)) {
      assignedRole = requestedRole;
    } else if (requestedRole) {
      res.status(400).json({ error: 'Invalid role. Must be user, manager, or admin' });
      return;
    }

    // Create user
    const result = await pool.query(
      'INSERT INTO users(name, email, password, role, permissions) VALUES($1, $2, $3, $4, $5) RETURNING id, name, email, role, permissions',
      [name, email, hashedPassword, assignedRole, JSON.stringify({})]
    );

    const user = result.rows[0];

    // Generate token including role and permissions
    const generatedToken = jwt.sign(
      { userId: user.id, email: user.email, role: user.role, permissions: user.permissions },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '24h' }
    );

    res.status(201).json({
      message: 'User registered successfully',
      token: generatedToken,
      user,
    });
  } catch (error: any) {
    console.error('Register error:', error);
    const msg = process.env.NODE_ENV === 'production' ? 'Registration failed' : `Registration failed: ${error.message || error}`;
    res.status(500).json({
      error: msg,
    });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({
        error: 'Email and password are required',
      });
      return;
    }

    // Find user
    const result = await pool.query(
      'SELECT * FROM users WHERE email = $1',
      [email]
    );

    if (result.rows.length === 0) {
      res.status(401).json({ error: 'Invalid email or password' });
      return;
    }

    const user = result.rows[0];

    // Compare passwords
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      res.status(401).json({ error: 'Invalid email or password' });
      return;
    }

    // Generate token
    const token = jwt.sign(
      { userId: user.id, email: user.email, role: user.role, permissions: user.permissions },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '24h' }
    );

    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        permissions: user.permissions,
      },
    });
  } catch (error: any) {
    console.error('Login error:', error);
    res.status(500).json({
      error: 'Login failed',
    });
  }
};
