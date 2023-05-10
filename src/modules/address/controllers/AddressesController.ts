import { Request, Response } from 'express';
import CreateAddresseservice from '../services/CreateAddressService';
import DeleteAddresseservice from '../services/DeleteAddressService';
import ListAddressesService from '../services/ListAddressService';
import ShowAddresseservice from '../services/ShowAddressService';
import jwt from 'jsonwebtoken';
import auth from '@config/auth';

export default class AddressesController {
  public async index(request: Request, response: Response): Promise<Response> {
    const user_id = '3b0a36fa-0221-461c-8248-173a4e8cc42c';
    const listAddresses = new ListAddressesService();

    const addresses = await listAddresses.execute({ user_id });

    return response.json(addresses);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const showAddress = new ShowAddresseservice();

    const address = await showAddress.execute({ id });

    return response.json(address);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const {
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
    } = request.body;

    const authHeader = request.headers.authorization;

    const createAddress = new CreateAddresseservice();

    const hasAddressTypes = await createAddress.verifyAddressType();

    if (hasAddressTypes.hasHome && address_type == 'home')
      return response.json('This customer already have a home address');
    if (hasAddressTypes.hasWork && address_type == 'work')
      return response.json('This customer already have a work address');
    if (hasAddressTypes.hasOther && address_type == 'other')
      return response.json('This customer already have a other address');
    if (!authHeader) {
      return response.status(401).json({ error: 'Token not provided' });
    }

    const [, token] = authHeader.split(' ');

    const decodedToken = jwt.verify(token, String(auth.jwt.secret));

    const user_id = decodedToken.sub;

    const addr = await createAddress.execute({
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

    return response.json(addr);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteAddress = new DeleteAddresseservice();

    await deleteAddress.execute({ id });

    return response.json([]);
  }
}
