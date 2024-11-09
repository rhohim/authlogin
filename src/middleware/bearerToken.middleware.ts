import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import jwtPayload from '../type/auth.type'
import db from '../utils/connectDB'
import { checkTokenBlacklisted } from '../services/auth.service'

export const authenticateAndAuthorize = (req: Request, res: Response, next: NextFunction): void => {
  const authHeader = req.header('Authorization') as string
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).send({ message: 'Unauthorized Bearer' })
    return
  }

  if (checkTokenBlacklisted(authHeader.split(' ')[1])) {
    res.status(401).json({ message: 'Token has been invalidated' })
    return
  }

  const token = authHeader.slice(7)
  const decoded = jwt.decode(token) as jwtPayload | null
  if (!token || token === 'null') {
    res.status(403).send({ message: 'Forbidden: Token is null' })
    return
  }

  if (decoded) {
    if (decoded.exp && decoded.exp < Math.floor(Date.now() / 1000)) {
      res.status(401).send({ message: 'Unauthorized: Token has expired' })
      return
    }

    const sql = 'SELECT password FROM user WHERE password = ?';
    db.query(sql, [decoded.password], (error: any, results: any) => {
      if (error) {
        console.error('Database error:', error);
        res.status(500).send({ message: 'Server error' });
        return;
      }

      if (results.length === 0) {
        res.status(403).send({ message: 'Forbidden: User not found' });
        return;
      }

      const storedPassword = results[0].password;

      try {
        if (storedPassword === decoded.password) { 
          return next();
        } else {
          res.status(403).send({ message: 'Forbidden: Invalid credentials' });
        }
      } catch (error) {
        console.error('Authentication error:', error);
        res.status(401).send({ message: 'Unauthorized' });
      }
    });
  }
}
