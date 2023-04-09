import redisCache from '@shared/cache/RedisCache';
import { getCustomRepository } from 'typeorm';
import Address from '../typeorm/entities/Address';
import AddressRepository from '../typeorm/repositories/AddressesRepository';

interface IRequest {
  user_id: string;
  address: string;
  cep: string;
  street: string;
  number: string;
  complement: string;
  city: string;
  neighborhood: string;
  address_type: string;
  latitude: string;
  longitude: string;
}

class CreateAddresseService {
  public async verifyAddressType(): Promise<any> {
    const addressesRepository = getCustomRepository(AddressRepository);
    const hasHome = await addressesRepository.findByAddress_type("home");
    const hasWork = await addressesRepository.findByAddress_type("work");
    const hasOther = await addressesRepository.findByAddress_type("other");
    return {hasHome, hasWork, hasOther}
  }

  public async execute({
    user_id,
    address,
    cep,
    street,
    number,
    complement,
    city,
    neighborhood,
    address_type,
    latitude,
    longitude,
  }: IRequest): Promise<Address> {
    const addressesRepository = getCustomRepository(AddressRepository);

//    console.log(hasHome);


    const Address = addressesRepository.create({
      user_id,
      address,
      cep,
      street,
      number,
      complement,
      city,
      neighborhood,
      address_type,
      latitude,
      longitude,
    });



    await redisCache.invalidate('api-vendas-ADDRESS_LIST');

    await addressesRepository.save(Address);

    return Address;
  }
}

export default CreateAddresseService;
