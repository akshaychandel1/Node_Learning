import { Router } from 'express';
import {
  getAllNotes,
  getNoteById,
  createNote,
  updateNote,
  deleteNote,
} from '../controllers/note.controller';
import { authMiddleware } from '../middleware/auth';
import { requirePermission } from '../middleware/authorize';

const router = Router();

// All note routes require authentication
router.use(authMiddleware);

router.get('/', requirePermission('view'), getAllNotes);
router.get('/:id', requirePermission('view'), getNoteById);
router.post('/', requirePermission('create'), createNote);
router.put('/:id', requirePermission('edit'), updateNote);
router.delete('/:id', requirePermission('delete'), deleteNote);

export default router;
