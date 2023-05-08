
import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import AddressRepository from '../typeorm/repositories/AddressesRepository';

interface IRequest {
  id: string;
}

class DeleteAddressService {
  public async execute({ id }: IRequest): Promise<void> {
    const addressesRepository = getCustomRepository(AddressRepository);

    const address = await addressesRepository.findOne(id);

    if (!address) {
      throw new AppError('Address not found.');
    }



    await addressesRepository.remove(address);
  }
}

export default DeleteAddressService;
