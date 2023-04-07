import { Request, Response } from 'express';
import CreateSessionsService from '../services/CreateSessionsService';
import { instanceToInstance } from 'class-transformer';
import RefreshTokenService from '../../../shared/http/middlewares/RefreshTokenService';
import { Console } from 'console';

export default class SessionsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const createSession = new CreateSessionsService();

    const user = await createSession.execute({
      email,
      password,
      response,
    });

    return response.json(instanceToInstance(user));
  }

  public async refresh(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const refresh_token = request.cookies.refreshToken;
    const refreshTokenService = new RefreshTokenService();
    const token = await refreshTokenService.refresh(refresh_token);
    return response.json(instanceToInstance(token));
  }
}
