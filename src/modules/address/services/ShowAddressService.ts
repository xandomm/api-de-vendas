import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Address from '../typeorm/entities/Address';
import AddressRepository from '../typeorm/repositories/AddressesRepository';

interface IRequest {
  id: string;
}

class ShowAddressService {
  public async execute({ id }: IRequest): Promise<Address> {
    const addressesRepository = getCustomRepository(AddressRepository);

    const address = await addressesRepository.findOne(id);

    if (!address) {
      throw new AppError('Address not found.');
    }

    return address;
  }
}

export default ShowAddressService;
