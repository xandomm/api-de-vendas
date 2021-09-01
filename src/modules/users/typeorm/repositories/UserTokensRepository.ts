import { EntityRepository, Repository } from 'typeorm';
import UserTokens from '../entities/UserToken';

@EntityRepository(UserTokens)
export class UserTokensRepository extends Repository<UserTokens> {
  public async findByName(name: string): Promise<UserTokens | undefined> {
    const user = await this.findOne({
      where: {
        name,
      },
    });
    return user;
  }
  public async findById(id: string): Promise<UserTokens | undefined> {
    const user = await this.findOne({
      where: {
        id,
      },
    });
    return user;
  }
  public async findByEmail(email: string): Promise<UserTokens | undefined> {
    const user = await this.findOne({
      where: {
        email,
      },
    });
    return user;
  }
}
