import { Request, Response } from 'express';
import SendForgotPasswordService from '../services/SendForgotPassword';

export default class ForgotPasswordController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email } = request.body;

    const sendForgotPasswordService = new SendForgotPasswordService();

    const user = await sendForgotPasswordService.execute({ email });

    return response.status(204).json(user);
  }
}
