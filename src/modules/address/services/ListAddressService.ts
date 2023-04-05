import { getCustomRepository } from 'typeorm';
import Address from '../typeorm/entities/Address';
import AddressRepository from '../typeorm/repositories/AddressesRepository';
import redisCache from '@shared/cache/RedisCache';

class ListAddressService {
  public async execute({user_id}): Promise<Address[]> {
    const addressesRepository = getCustomRepository(AddressRepository);

    let addresses = await redisCache.recover<Address[]>(
      'api-vendas-ADDRESS_LIST',
    );

    if (!addresses) {
      addresses = await addressesRepository.findByUserId(user_id);
      await redisCache.save('api-vendas-ADDRESSES_LIST', addresses);
    }

    return addresses;
  }
}

export default ListAddressService;
