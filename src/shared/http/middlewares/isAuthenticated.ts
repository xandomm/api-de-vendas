import { NextFunction, Request, Response } from 'express';
import { verify, Secret } from 'jsonwebtoken';
import AppError from '@shared/errors/AppError';
import authConfig from '@config/auth';
import { Response } from 'aws-sdk';

interface ITokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

export default function isAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError('JWT Token is missing.');
  }
  // Bearer sdlkfjsldkfjlsjfffdklfjdflksjflkjfdlk3405905
  const [, token] = authHeader.split(' ');

  try {
    const decodedToken = verify(token, authConfig.jwt.secret as Secret);

    const { sub } = decodedToken as ITokenPayload;

    request.user = {
      id: sub,
    };

    return next();
  } catch (error){
    if (error.name === 'TokenExpiredError') {

     const refreshToken = request.cookies.refreshToken;
     if (!refreshToken) {
       console.log('error 401');
       response.status(401).json({ message: 'Refresh token is missing' });
     }
    const decodedToken = verify(refreshToken, authConfig.jwt.secret as Secret);

    const { sub } = decodedToken as ITokenPayload;

    request.user = {
      id: sub,
    };
    response.cookie('refreshToken', refreshToken, { httpOnly: true });

    return next();
    }
  }
}
