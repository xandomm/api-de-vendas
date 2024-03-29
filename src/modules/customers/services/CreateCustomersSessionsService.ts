import AppError from '@shared/errors/AppError';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import authConfig from '@config/customerAuth';
import { getCustomRepository } from 'typeorm';
import Customer from '../typeorm/entities/Customer';
import CustomersRepository from '../typeorm/repositories/CustomersRepository';
import { Response } from 'express';

const ACCESS_TOKEN_EXPIRATION_TIME = authConfig.jwt.expires_in;
const REFRESH_TOKEN_EXPIRATION_TIME = authConfig.refresh_jwt.secret;
const JWT_SECRET = authConfig.jwt.secret;
const REFRESH_TOKEN_SECRET = authConfig.refresh_jwt.expires_in;

interface IRequest {
  email: string;
  password: string;
  response: Response;
}

interface IResponse {
  customer: Customer;
  token: string;
  refresh_token: string;
}

class CreateCustomersSessionsService {
  public async execute({
    email,
    password,
    response,
  }: IRequest): Promise<IResponse> {
    const customersRepository = getCustomRepository(CustomersRepository);
    const customer = await customersRepository.findByEmail(email);

    if (!customer) {
      throw new AppError('Incorrect email/password combination.', 401);
    }

    const passwordConfirmed = compare(password, customer.password);

    if (!passwordConfirmed) {
      throw new AppError('Incorrect email/password combination.', 401);
    }

    const token = sign({}, JWT_SECRET, {
      subject: customer.id,
      expiresIn: ACCESS_TOKEN_EXPIRATION_TIME,
    });

    const refresh_token = sign({}, REFRESH_TOKEN_SECRET, {
      subject: customer.id,
      expiresIn: REFRESH_TOKEN_EXPIRATION_TIME,
    });

    response.cookie('refreshToken', refresh_token, { httpOnly: true });

    return {
      customer,
      token,
      refresh_token,
    };
  }
}

export default CreateCustomersSessionsService;
