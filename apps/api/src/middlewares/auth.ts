import { Request, Response, NextFunction } from 'express';
import { auth } from '../config/auth';

export async function requireAuth(req: Request, res: Response, next: NextFunction) {
  const headers = new Headers();
  for (const [key, value] of Object.entries(req.headers)) {
    if (value) {
      if (Array.isArray(value)) {
        value.forEach(v => headers.append(key, v));
      } else {
        headers.set(key, value);
      }
    }
  }

  try {
    const session = await auth.api.getSession({
      headers: headers,
    });

    if (!session) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }

    // Attach user and session to the request
    (req as any).user = session.user;
    (req as any).session = session.session;
    next();
  } catch (err) {
    console.error('Session error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
}

export function requireRole(...roles: string[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = (req as any).user;
    if (!user || !roles.includes(user.role)) {
      res.status(403).json({ error: 'Forbidden: insufficient permissions' });
      return;
    }
    next();
  };
}
