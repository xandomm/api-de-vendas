import EtherialMail from '@config/mail/EtherialMail';
import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import UserTokens from '../typeorm/entities/UserToken';
import { UserRepository } from '../typeorm/repositories/UserRepository';
import { UserTokensRepository } from '../typeorm/repositories/UserTokensRepository';

interface IRequest {
  email: string;
}

class SendForgotPasswordService {
  public async execute({ email }: IRequest): Promise<void> {
    const userRepository = getCustomRepository(UserRepository);
    const userTokensRepository = getCustomRepository(UserTokensRepository);

    const user = await userRepository.findByEmail(email);

    if (!user) {
      throw new AppError('Email not found. ');
    }

    const { token } = await userTokensRepository.generate(user.id);
    // console.log(token);
    await EtherialMail.sendMail({
      to: {
        name: user.name,
        email: user.email,
      },
      subject: '[API VENDAS]: recuperação de senha',
      templateData: {
        template: `Ola {{name}}: {{token}}`,
        variables: {
          name: user.name,
          token,
        },
      },
    });
  }
}

export default SendForgotPasswordService;
