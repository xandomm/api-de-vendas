import { Request, Response, NextFunction } from 'express';
import Redis from 'ioredis';
import { RateLimiterRedis } from 'rate-limiter-flexible';
import AppError from '@shared/errors/AppError';
p
export default async function rateLimiter(
  request: Request,
  response: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const redisClient = new Redis({
      //host: process.env.REDIS_HOST,

      host: 'redis://red-cg2unao2qv24hdmtf7t0',
      //port: Number(process.env.REDIS_PORT),
      port: Number(6379),
      password: process.env.REDIS_PASS || undefined,
    });

    const limiter = new RateLimiterRedis({
      storeClient: redisClient,
      keyPrefix: 'ratelimit',
      points: 5,
      duration: 1,
    });

    await limiter.consume(request.ip);

    return next();
  } catch (err) {
    throw new AppError('Too many requests.', 429);
  }
}
