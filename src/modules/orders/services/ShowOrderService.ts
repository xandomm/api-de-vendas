import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Order from '../typeorm/entities/Order';
import OrdersRepository from '../typeorm/repositories/OrdersRepository';

interface IRequest {
  id: string;
}
interface IOrderList {
  user_id: string;
}

class ShowOrderService {
  public async execute({ id }: IRequest): Promise<Order> {
    const ordersRepository = getCustomRepository(OrdersRepository);

    const order = await ordersRepository.findById(id);

    if (!order) {
      throw new AppError('Order not found.');
    }

    return order;
  }

  public async list({ user_id }: IOrderList): Promise<Order> {
    const ordersRepository = getCustomRepository(OrdersRepository);

    const orders = await ordersRepository.find({
      where: {
        user_id,
      },
    });

    if (!orders) {
      throw new AppError('Order not found.');
    }

    return orders;
  }
}

export default ShowOrderService;
