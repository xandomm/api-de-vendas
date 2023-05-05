import CustomersRepository from '@modules/customers/typeorm/repositories/CustomersRepository';
import ProductRepository from '@modules/products/typeorm/repositories/ProductsRepository';
import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Order from '../typeorm/entities/Order';
import OrdersRepository from '../typeorm/repositories/OrdersRepository';



interface IUpdate {
  customer_id: string;
  order_status: string;
}

class UpdateOrderService {
  public async updateStatus({ customer, order_status, id }: IUpdate): Promise<Order> {
    const ordersRepository = getCustomRepository(OrdersRepository);
    //const customersRepository = getCustomRepository(CustomersRepository);

    const order = await ordersRepository.findOne({id});
    if (order.order_status != 'completed' && order.order_status != 'canceled') {
      order.order_status = order_status;
    }


    await ordersRepository.save(order);

    return order;
  }
}

export default UpdateOrderService;
