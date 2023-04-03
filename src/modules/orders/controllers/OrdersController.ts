import { Request, Response } from 'express';
import CreateOrderService from '../services/CreateOrderService';
import ShowOrderService from '../services/ShowOrderService';
import auth from '@config/auth';
const jwt = require('jsonwebtoken');

export default class OrdersController {
  public async show(request: Request, response: Response): Promise<Response> {
    //const { id } = request.params;
    const authHeader = request.headers.authorization;

    const [, token] = authHeader.split(' ');

    const decodedToken = jwt.verify(token, auth.jwt.secret);

    const user_id = decodedToken.sub;

    const showOrder = new ShowOrderService();

    const order = await showOrder.list({ user_id });

    return response.json(order);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { customer_id, products, address_id, order_status, payment_method } = request.body;

    const createOrder = new CreateOrderService();

    const order = await createOrder.execute({
      customer_id,
      products,
      address_id,
      order_status,
      payment_method,
    });

    return response.json(order);
  }
}
