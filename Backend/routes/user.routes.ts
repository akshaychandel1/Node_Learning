import { Router } from 'express';
import { authMiddleware } from '../middleware/auth';
import { requireRole } from '../middleware/authorize';

import {
  create,
  getAll,
  update,
  remove,
  setPermissions,
} from '../controllers/user.controller';

const router = Router();

router.post('/', create);
router.get('/', authMiddleware, getAll);
router.put('/:id', authMiddleware, update);
router.delete('/:id', authMiddleware, remove);

// Managers and admins can set permissions; managers cannot assign admin role
router.patch('/:id/permissions', authMiddleware, requireRole(['admin', 'manager']), setPermissions);

export default router;