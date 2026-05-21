"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteNote = exports.updateNote = exports.createNote = exports.getNoteById = exports.getAllNotes = void 0;
const db_1 = require("../config/db");
const getAllNotes = async (req, res) => {
    try {
        const userId = req.userId;
        const result = await db_1.pool.query('SELECT * FROM notes WHERE user_id = $1 ORDER BY created_at DESC', [userId]);
        res.json(result.rows);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch notes' });
    }
};
exports.getAllNotes = getAllNotes;
const getNoteById = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.userId;
        const result = await db_1.pool.query('SELECT * FROM notes WHERE id = $1 AND user_id = $2', [id, userId]);
        if (result.rows.length === 0) {
            res.status(404).json({ error: 'Note not found' });
            return;
        }
        res.json(result.rows[0]);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch note' });
    }
};
exports.getNoteById = getNoteById;
const createNote = async (req, res) => {
    try {
        const { title, content } = req.body;
        const userId = req.userId;
        if (!title || !content) {
            res.status(400).json({
                error: 'Title and content are required',
            });
            return;
        }
        const result = await db_1.pool.query('INSERT INTO notes(user_id, title, content) VALUES($1, $2, $3) RETURNING *', [userId, title, content]);
        res.status(201).json(result.rows[0]);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to create note' });
    }
};
exports.createNote = createNote;
const updateNote = async (req, res) => {
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
        const result = await db_1.pool.query('UPDATE notes SET title = $1, content = $2, updated_at = CURRENT_TIMESTAMP WHERE id = $3 AND user_id = $4 RETURNING *', [title, content, id, userId]);
        if (result.rows.length === 0) {
            res.status(404).json({ error: 'Note not found' });
            return;
        }
        res.json(result.rows[0]);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to update note' });
    }
};
exports.updateNote = updateNote;
const deleteNote = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.userId;
        const result = await db_1.pool.query('DELETE FROM notes WHERE id = $1 AND user_id = $2 RETURNING id', [id, userId]);
        if (result.rows.length === 0) {
            res.status(404).json({ error: 'Note not found' });
            return;
        }
        res.json({
            message: 'Note deleted successfully',
        });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to delete note' });
    }
};
exports.deleteNote = deleteNote;
