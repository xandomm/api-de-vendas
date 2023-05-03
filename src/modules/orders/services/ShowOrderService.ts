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

interface IOrderStatus {
  order_status: string;
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

  public async list({ customer }: IOrderList): Promise<Order> {
    const ordersRepository = getCustomRepository(OrdersRepository);

    const orders = await ordersRepository.find({
      where: {
        customer,
      },
    });

    if (!orders) {
      throw new AppError('Order not found.');
    }

    return orders;
  }

  public async list_status_ongoing({ customer }: IOrderList): Promise<Order> {
    const ordersRepository = getCustomRepository(OrdersRepository);

    const orders = await ordersRepository.find({
      where: [
        {customer, order_status: "delivering"},
        {customer, order_status: "ongoing"},
      ],
    });
    return orders;
    }

  public async list_status_history({ customer }: IOrderList): Promise<Order> {
    const ordersRepository = getCustomRepository(OrdersRepository);

    const orders = await ordersRepository.find({
      where: [
        {customer, order_status: "completed"},
        {customer, order_status: "fail_delivery"},
        {customer, order_status: "canceled"},
      ],
    });


    if (!orders) {
      throw new AppError('Order not found.');
    }

    return orders;
  }

}

export default ShowOrderService;
