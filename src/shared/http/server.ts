import 'reflect-metadata';
import '@shared/typeORM';
import express, { Response, Request, NextFunction } from 'express';
import cors from 'cors';
import routes from './routes';
import AppError from '@shared/errors/AppError';

const app = express();
app.use(cors());
app.use(express.json());
app.use(routes);
app.use(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  (error: Error, response: Response, request: Request, next: NextFunction) => {
    if (error instanceof AppError) {
      return response.status(error.statusCode).json({
        status: 'error',
        message: error.message,
      });
    }
    return response.status(500).json({
      status: 'error',
      message: 'Internal server error',
    });
  },
);
app.listen(3333, () => {
  console.log('Server starter on port 3333');
});
