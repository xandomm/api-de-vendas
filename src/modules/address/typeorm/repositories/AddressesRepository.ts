import { EntityRepository, In, Repository } from 'typeorm';
import Address from '../entities/Address';

interface IFindAddresses {
  id: string;
}

@EntityRepository(Address)
class AddressRepository extends Repository<Address> {
  public async findByName(addr: string): Promise<Address | undefined> {
    const address = this.findOne({
      where: {
        addr,
      },
    });

    return address;
  }

  public async findAllByIds(addresses: IFindAddresses[]): Promise<Address[]> {
    const addressIds = addresses.map(address => address.id);

    const existentAddresses = await this.find({
      where: {
        id: In(addressIds),
      },
    });

    return existentAddresses;
  }
}

export default AddressRepository;
