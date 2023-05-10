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

    const authHeader = request.headers.authorization;
    //console.log("----------authHeader:"+ authHeader);
    const createAddress = new CreateAddresseservice(request.body.address_type);


    const [, token] = authHeader.split(' ');

    const decodedToken = jwt.verify(token, auth.jwt.secret);

    const user_id = decodedToken.sub;

    //const user_id = '3b0a36fa-0221-461c-8248-173a4e8cc42c';
    const listAddresses = new ListAddressesService();

    const addresses = await listAddresses.execute({ user_id });

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
    const { address, cep, street, number, complement, city, neighborhood, address_type, latitude, longitude } = request.body;

    const authHeader = request.headers.authorization;

    const createAddress = new CreateAddresseservice();

    const hasAddressTypes = await createAddress.verifyAddressType();

    if (hasAddressTypes.hasHome && address_type=="home" ) return response.json("This customer already have a home address")
    if (hasAddressTypes.hasWork && address_type=="work" ) return response.json("This customer already have a work address")
    if (hasAddressTypes.hasOther && address_type=="other" ) return response.json("This customer already have a other address")

    const [, token] = authHeader.split(' ');

    const decodedToken = jwt.verify(token, auth.jwt.secret);

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
