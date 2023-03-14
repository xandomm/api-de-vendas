import redisCache from '@shared/cache/RedisCache';
import { getCustomRepository } from 'typeorm';
import Address from '../typeorm/entities/Address';
import AddressRepository from '../typeorm/repositories/AddressesRepository';

interface IRequest {
  user_id: string;
  cep: string;
  street: string;
  number: string;
  complement: string;
  city: string;
  neighborhood: string;
}

class CreateAddresseService {
  public async execute({
    user_id,
    cep,
    street,
    number,
    complement,
    city,
    neighborhood,
  }: IRequest): Promise<Address> {
    const addressesRepository = getCustomRepository(AddressRepository);
    const Address = addressesRepository.create({
      user_id,
      cep,
      street,
      number,
      complement,
      city,
      neighborhood,
    });

    await redisCache.invalidate('api-vendas-ADDRESS_LIST');

    await addressesRepository.save(Address);

    return Address;
  }
}

export default CreateAddresseService;
