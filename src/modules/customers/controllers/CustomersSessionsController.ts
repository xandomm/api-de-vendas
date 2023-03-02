import { Request, Response } from 'express';
import CreateCustomersSessionsService from '../services/CreateCustomersSessionsService';
import { instanceToInstance } from 'class-transformer';
import RefreshTokenService from '../../../shared/http/middlewares/RefreshTokenService';

export default class CustomersSessionsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const createCustomersSession = new CreateCustomersSessionsService();

    const user = await createCustomersSession.execute({
      email,
      password,
      response,
    });

    return response.json(instanceToInstance(user));
  }

  public async refresh(request: Request, response: Response): Promise<Response> {

    const refresh_token = request.cookies.refreshToken;
    const refreshTokenService = new RefreshTokenService();
    const token = await refreshTokenService.refresh(refresh_token);
    return response.json(instanceToInstance(token));
  }



}
