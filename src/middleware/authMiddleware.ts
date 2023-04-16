import {Request, Response, NextFunction} from 'express';
import {jwtService} from "../jwt-service";

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.split(' ')[1];
    const userId = jwtService.getUserByToken(token);
    if (userId) {
      req.userId = userId;
      return next();
    }
  }
  res.status(401).json({message: 'Unauthorized'});
}
