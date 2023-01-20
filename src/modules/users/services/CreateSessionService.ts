import AppError from '@shared/errors/AppError';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import authConfig from '@config/auth';
import { getCustomRepository } from 'typeorm';
import User from '../typeorm/entities/User';
<<<<<<< HEAD:src/modules/users/services/CreateSessionsService.ts
import UsersRepository from '../typeorm/repositories/UsersRepository';
import { any } from 'joi';
import auth from '@config/auth';

auth.jwt.secret = "'secret!'";
=======
import { UserRepository } from '../typeorm/repositories/UserRepository';
>>>>>>> parent of 2c94364 (feature/10/orders):src/modules/users/services/CreateSessionService.ts

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: User;
  token: string;
}
class CreateSessionService {
  public async execute({ email, password }: IRequest): Promise<IResponse> {
    const userRepository = getCustomRepository(UserRepository);

    const user = await userRepository.findByEmail(email);

    if (!user) {
      throw new AppError('incorrect email/password combination', 401);
    }
    const passwordConfirmed = await compare(password, user.password);
    if (!passwordConfirmed) {
      throw new AppError('incorrect email/password combination', 401);
    }
    await userRepository.save(user);

    const token = sign({}, authConfig.jwt.secret, {
      subject: user.id,
      expiresIn: authConfig.jwt.expiresIn,
    });
    return { user, token };
  }
}

export default CreateSessionService;
