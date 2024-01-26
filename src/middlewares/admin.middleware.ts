import { RequestWithUser } from '@/interfaces/auth.interface';
import { NextFunction, Response } from 'express';

export const AdminMiddleware = (req: RequestWithUser, res: Response, next: NextFunction) => {
  try {
    if (req.user.role === 'admin') {
      next();
    } else {
      res.status(401).json({ message: 'Unauthorized' });
    }
  } catch (error) {
    next(error);
  }
};
