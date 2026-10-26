import jwt, { JwtPayload } from 'jsonwebtoken';
import express, { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';

dotenv.config();

export interface AuthenticatedRoleRequest extends Request {
  user?: {
    id: number;
    email: string;
    role: string;
  };
}
export interface AuthenticatedRequest extends Request {
    user?: string | JwtPayload;
  }

export const authenticateToken = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const authHeader = req.header('Authorization');
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: "Access denied, no token provided" });
  }

  const secret = process.env.JWT_SECRET;
  if (!secret) {
    return res.status(500).json({ error: "JWT_SECRET is not defined in server environment" });
  }

  jwt.verify(token, secret, (err, decodedUser) => {
    if (err) {
      return res.status(403).json({ error: "Invalid or expired token" });
    }
    req.user = decodedUser;
    next();
  });
};


export const requireRole = (allowedRoles: string[]) => {
  return (req: AuthenticatedRoleRequest, res: Response, next: NextFunction): void => {
    if (!req.user) {
      res.status(401).json({ error: 'Unauthorized: User missing from token' });
      return;
    }

    if (!allowedRoles.includes(req.user.role)) {
      res.status(403).json({ error: 'Forbidden: Insufficient privileges' });
      return;
    }

    next();
  };
}