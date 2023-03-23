import { Request, Response } from 'express';
import CreateAddresseservice from '../services/CreateAddressService';
import DeleteAddresseservice from '../services/DeleteAddressService';
import ListAddressesService from '../services/ListAddressService';
import ShowAddresseservice from '../services/ShowAddressService';
import { verify, Secret, JsonWebTokenError } from 'jsonwebtoken';

import authConfig from '@config/auth';
import auth from '@config/auth';
const jwt = require('jsonwebtoken');

export default class AddressesController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listAddresses = new ListAddressesService();

    const addresses = await listAddresses.execute();

    return response.json(addresses);
  }
1
  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const showAddress = new ShowAddresseservice();

    const address = await showAddress.execute({ id });

    return response.json(address);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { cep, street, number, complement, city, neighborhood, latitude, longitude } = request.body;
    const authHeader = request.headers.authorization;

    const createAddress = new CreateAddresseservice();

    const [, token] = authHeader.split(' ');

    const decodedToken = jwt.verify(token, auth.jwt.secret);

    const user_id = decodedToken.sub;

    const addr = await createAddress.execute({
      user_id,
      cep,
      street,
      number,
      complement,
      city,
      neighborhood,
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
