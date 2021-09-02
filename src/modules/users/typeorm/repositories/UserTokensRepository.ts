import { EntityRepository, Repository } from 'typeorm';
import UserTokens from '../entities/UserToken';

@EntityRepository(UserTokens)
export class UserTokensRepository extends Repository<UserTokens> {
  public async findByToken(token: string): Promise<UserTokens | undefined> {
    const UserToken = await this.findOne({
      where: {
        token,
      },
    });
    return UserToken;
  }
  public async generate(user_id: string): Promise<UserTokens | undefined> {
    const UserToken = await this.create({
      user_id,
    });

    await this.save(UserToken);

    return UserToken;
  }
}
