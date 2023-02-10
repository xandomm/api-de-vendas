import { Request, Response } from 'express';
import CreateAddresseservice from '../services/CreateAddressService';
import DeleteAddresseservice from '../services/DeleteAddressService';
import ListAddressesService from '../services/ListAddressService';
import ShowAddresseservice from '../services/ShowAddressService';


export default class AddressesController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listAddresses = new ListAddressesService();

    const addresses = await listAddresses.execute();

    return response.json(addresses);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const showAddress = new ShowAddresseservice();

    const address = await showAddress.execute({ id });

    return response.json(address);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { address } = request.body;

    const createAddress = new CreateAddresseservice();

    const addr = await createAddress.execute({ address });

    return response.json(addr);
  }



  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteAddress = new DeleteAddresseservice();

    await deleteAddress.execute({ id });

    return response.json([]);
  }
}
