import { getCustomRepository } from 'typeorm';
import Address from '../typeorm/entities/Address';
import AddressRepository from '../typeorm/repositories/AddressesRepository';


class ListAddressService {
  public async execute({user_id}): Promise<Address[]> {
    const addressesRepository = getCustomRepository(AddressRepository);

    let addresses = await addressesRepository.findByUserId(user_id);

    return addresses;
  }
}

export default ListAddressService;
