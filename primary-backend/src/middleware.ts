import type {Request, Response, NextFunction} from 'express';
import jwt from 'jsonwebtoken';

declare global {
  namespace Express {
    interface Request {
      id?: number;
    }
  }
}

type AuthTokenPayload = jwt.JwtPayload & {
  id: number;
};

function getToken(authorizationHeader: string | undefined) {
  if (!authorizationHeader) {
    return undefined;
  }

  return authorizationHeader.startsWith('Bearer ')
    ? authorizationHeader.slice('Bearer '.length)
    : authorizationHeader;
}

function isAuthTokenPayload(payload: string | jwt.JwtPayload): payload is AuthTokenPayload {
  return typeof payload !== 'string' && typeof payload.id === 'number';
}

export function authMiddleware(req:Request, res:Response, next:NextFunction) {
  const token = getToken(req.headers.authorization);
  if (!token) {
    return res.status(401).json({
      message: "Unauthorized"
    });
  }

  try{
    const payload=jwt.verify(token, process.env["JWT_SECRET"]!);
    if (!isAuthTokenPayload(payload)) {
      return res.status(401).json({
        message: "Unauthorized"
      });
    }

    req.id=payload.id;
    next();
  }
  catch(err){
    return res.status(401).json({
      message: "Unauthorized"
    });
  }

  
  
}
