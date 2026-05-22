import { Request, Response } from 'express';

import {
  createUser,
  getUsers,
  updateUser,
  deleteUser,
  updatePermissions,
} from '../services/user.service';

export const create = async (
  req: Request,
  res: Response
) => {
  try {
    const { name, email } = req.body;

    if (!name || !email) {
      res.status(400).json({
        error: 'Name and email are required',
      });
      return;
    }

    const user = await createUser(req.body);
    res.status(201).json(user);
  } catch (error: any) {
    if (error.code === '23505') {
      res.status(409).json({
        error: 'Email already exists',
      });
    } else {
      res.status(500).json({
        error: 'Failed to create user',
      });
    }
  }
};

export const getAll = async (
  req: Request,
  res: Response
) => {
  try {
    const users = await getUsers();
    res.json(users);
  } catch (error) {
    res.status(500).json({
      error: 'Failed to fetch users',
    });
  }
};

export const update = async (
  req: Request,
  res: Response
) => {
  try {
    const { name, email } = req.body;

    if (!name || !email) {
      res.status(400).json({
        error: 'Name and email are required',
      });
      return;
    }

    const user = await updateUser(String(req.params.id), req.body);

    if (!user) {
      res.status(404).json({
        error: 'User not found',
      });
      return;
    }

    res.json(user);
  } catch (error: any) {
    if (error.code === '23505') {
      res.status(409).json({
        error: 'Email already exists',
      });
    } else {
      res.status(500).json({
        error: 'Failed to update user',
      });
    }
  }
};

export const remove = async (
  req: Request,
  res: Response
) => {
  try {
    const deleted = await deleteUser(String(req.params.id));

    if (!deleted) {
      res.status(404).json({
        error: 'User not found',
      });
      return;
    }

    res.json({
      message: 'User deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      error: 'Failed to delete user',
    });
  }
};

export const setPermissions = async (req: Request, res: Response) => {
  try {
    const targetId = String(req.params.id);
    const { role, permissions } = req.body;

    // Only allow managers to assign up to 'manager' and not 'admin'
    const requester = (req as any).user;
    if (requester.role === 'manager' && role === 'admin') {
      res.status(403).json({ error: 'Managers cannot assign admin role' });
      return;
    }

    const updated = await updatePermissions(targetId, role, permissions);
    if (!updated) {
      res.status(404).json({ error: 'User not found' });
      return;
    }

    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update permissions' });
  }
};