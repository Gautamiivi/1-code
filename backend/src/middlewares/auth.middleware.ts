import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload as DefaultJwtPayload } from "jsonwebtoken";

// ✅ Define custom JWT payload type
interface JwtPayload extends DefaultJwtPayload {
  userId: string;
}

// ✅ Extend Express Request globally
declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}

export const protect = (req: Request, res: Response, next: NextFunction): void => {
  const authHeader = req.headers.authorization;
  const token = authHeader?.split(" ")[1];

  if (!token) {
    res.status(401).json({ message: "Not authorized, token missing" });
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
    req.user = decoded; // ✅ Attach user to request
    next();
  } catch (error) {
    console.error("JWT verification error:", error);
    res.status(401).json({ message: "Not authorized, invalid token" });
  }
};
