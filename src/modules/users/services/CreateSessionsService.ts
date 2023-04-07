import AppError from '@shared/errors/AppError';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import authConfig from '@config/auth';
import { getCustomRepository } from 'typeorm';
import User from '../typeorm/entities/User';
import UsersRepository from '../typeorm/repositories/UsersRepository';
import { Response } from 'express';

const ACCESS_TOKEN_EXPIRATION_TIME = '15m';
authConfig.jwt.secret;
interface IRequest {
  email: string;
  password: string;
  response: Response;
}

interface IResponse {
  user: User;
  token: string;
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

    const token = sign({}, authConfig.jwt.secret, {
      subject: user.id,
      expiresIn: ACCESS_TOKEN_EXPIRATION_TIME,
    });

    return {
      user,
      token,
    };
  }
}

export default CreateSessionsService;
