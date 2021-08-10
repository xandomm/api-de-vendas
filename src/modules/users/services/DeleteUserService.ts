import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import { UserRepository } from '../typeorm/repositories/UserRepository';

interface IRequest {
  id: string;
}

class DeleteUserService {
  public async execute({ id }: IRequest): Promise<void> {
    const userRepository = getCustomRepository(UserRepository);

    const user = await userRepository.findById(id);

    if (!user) {
      throw new AppError('User not found');
    }

    await userRepository.remove(user);
  }
}
export default DeleteUserService;
