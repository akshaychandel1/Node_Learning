import { Request, Response } from 'express';
import { pool } from '../config/db';
import { AuthRequest } from '../middleware/auth';

export const getAllNotes = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.userId;

    const result = await pool.query(
      'SELECT * FROM notes WHERE user_id = $1 ORDER BY created_at DESC',
      [userId]
    );

    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch notes' });
  }
};

export const getNoteById = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const userId = req.userId;

    const result = await pool.query(
      'SELECT * FROM notes WHERE id = $1 AND user_id = $2',
      [id, userId]
    );

    if (result.rows.length === 0) {
      res.status(404).json({ error: 'Note not found' });
      return;
    }

    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch note' });
  }
};

export const createNote = async (req: AuthRequest, res: Response) => {
  try {
    const { title, content } = req.body;
    const userId = req.userId;

    if (!title || !content) {
      res.status(400).json({
        error: 'Title and content are required',
      });
      return;
    }

    const result = await pool.query(
      'INSERT INTO notes(user_id, title, content) VALUES($1, $2, $3) RETURNING *',
      [userId, title, content]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create note' });
  }
};

export const updateNote = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;
    const userId = req.userId;

    if (!title || !content) {
      res.status(400).json({
        error: 'Title and content are required',
      });
      return;
    }

    const result = await pool.query(
      'UPDATE notes SET title = $1, content = $2, updated_at = CURRENT_TIMESTAMP WHERE id = $3 AND user_id = $4 RETURNING *',
      [title, content, id, userId]
    );

    if (result.rows.length === 0) {
      res.status(404).json({ error: 'Note not found' });
      return;
    }

    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update note' });
  }
};

export const deleteNote = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const userId = req.userId;

    const result = await pool.query(
      'DELETE FROM notes WHERE id = $1 AND user_id = $2 RETURNING id',
      [id, userId]
    );

    if (result.rows.length === 0) {
      res.status(404).json({ error: 'Note not found' });
      return;
    }

    res.json({
      message: 'Note deleted successfully',
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete note' });
  }
};
