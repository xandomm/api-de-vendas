import { getCustomRepository } from 'typeorm';
import Address from '../typeorm/entities/Address';
import AddressRepository from '../typeorm/repositories/AddressesRepository';
import AppError from '@shared/errors/AppError';

class ListAddressService {
  public async execute({ user_id }: { user_id: string }): Promise<Address[]> {
    const addressesRepository = getCustomRepository(AddressRepository);

    const addresses:
      | Address[]
      | undefined = await addressesRepository.findByUserId(user_id);
    if (!addresses) {
      throw new AppError('No addresses found ', 200);
    }
    return addresses;
  }
}

export default ListAddressService;
