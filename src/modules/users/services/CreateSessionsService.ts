import AppError from '@shared/errors/AppError';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import authConfig from '@config/auth';
import { getCustomRepository } from 'typeorm';
import User from '../typeorm/entities/User';
import UsersRepository from '../typeorm/repositories/UsersRepository';
import { Response } from 'express';

const ACCESS_TOKEN_EXPIRATION_TIME = '15m';
const REFRESH_TOKEN_EXPIRATION_TIME = '1d';
const JWT_SECRET = authConfig.jwt.secret;
const REFRESH_TOKEN_SECRET = 'secret';

interface IRequest {
  email: string;
  password: string;
  response: Response;
}

interface IResponse {
  user: User;
  token: string;
  refresh_token: string;
}

class CreateSessionsService {
  public async execute({
    email,
    password,
    response,
  }: IRequest): Promise<IResponse> {
    const usersRepository = getCustomRepository(UsersRepository);
    const user = await usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('Incorrect email/password combination.', 401);
    }

    const passwordConfirmed = await compare(password, user.password);

    if (!passwordConfirmed) {
      throw new AppError('Incorrect email/password combination.', 401);
    }

    const token = sign({}, `${JWT_SECRET}`, {
      subject: user.id,
      expiresIn: ACCESS_TOKEN_EXPIRATION_TIME,
    });

    const refresh_token = sign({}, REFRESH_TOKEN_SECRET, {
      subject: user.id,
      expiresIn: REFRESH_TOKEN_EXPIRATION_TIME,
    });

    response.cookie('refreshToken', refresh_token, { httpOnly: true });

    return {
      user,
      token,
      refresh_token,
    };
  }
}

export default CreateSessionsService;
