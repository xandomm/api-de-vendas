import { getCustomRepository } from 'typeorm';
import Orders from '../typeorm/entities/Order';
import OrdersRepository from '../typeorm/repositories/OrdersRepository';

class ListOrdersService {
  public async execute(): Promise<Orders[]> {
    const ordersRepository = getCustomRepository(OrdersRepository);

      let orders = await ordersRepository.find();

    return orders;
  }
}

export default ListOrdersService;
