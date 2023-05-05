import { Request, Response } from 'express';
import ValidateNumberCustomerService from '../services/ValidateNumberCustomerService';

export default class CustomersPhoneVerificationController {
  public async verify(request: Request, response: Response): Promise<Response> {
    const { phone_number, code } = request.body;

    const verifyCustomer = new ValidateNumberCustomerService();
    const customer = await verifyCustomer.execute({
      phone_number,
      verification_code: code,
    });

    return response.json(customer);
  }
}
