import { Request, Response } from 'express';

import {
  createUser,
  getUsers,
  updateUser,
  deleteUser,
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