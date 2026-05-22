import { Response, NextFunction } from 'express';
import { AuthRequest } from './auth';

// roleAllowed: array of roles that are permitted (e.g. ['admin','manager'])
export const requireRole = (roleAllowed: string[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    const role = req.user?.role;
    if (!role || !roleAllowed.includes(role)) {
      res.status(403).json({ error: 'Insufficient role' });
      return;
    }
    next();
  };
};

// permissionName: 'view'|'create'|'edit'|'delete'
export const requirePermission = (permissionName: string) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    // Admins always have all permissions
    if (req.user?.role === 'admin') {
      next();
      return;
    }
    const permissions = req.user?.permissions || {};
    if (!permissions[permissionName]) {
      res.status(403).json({ error: `Permission denied: '${permissionName}' required` });
      return;
    }
    next();
  };
};

export default { requireRole, requirePermission };
