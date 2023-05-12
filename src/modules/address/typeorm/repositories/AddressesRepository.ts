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

  public async findByUserId(user_id: string): Promise<Address | undefined> {
    const address = this.findOne({
      where: {
        user_id,
      },
    });

    return address;
  }

  public async findByAddress_type(
    address_type: string,
  ): Promise<Address | undefined> {
    const address = await this.findOne({
      where: {
        address_type,
      },
    });

    return address;
  }

  public async findById({ id }: { id: string }) {
    const address = await this.findOne({
      where: {
        id,
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
