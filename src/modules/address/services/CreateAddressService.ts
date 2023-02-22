import redisCache from '@shared/cache/RedisCache';
import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Address from '../typeorm/entities/Address';
import AddressRepository from '../typeorm/repositories/AddressesRepository';

interface IRequest {
  user_id: string;
  nearby_address: string;
  address: string;
}

class CreateAddresseService {
  public async execute({user_id, nearby_address, address}: IRequest): Promise<Address> {
    const addressesRepository = getCustomRepository(AddressRepository);
    const Address = addressesRepository.create({
     user_id,
     nearby_address,
     address,
    });

    await redisCache.invalidate('api-vendas-ADDRESS_LIST');

    await addressesRepository.save(Address);

    return Address;
  }
}

export default CreateAddresseService;
