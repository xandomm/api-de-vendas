import { EntityRepository, Repository } from 'typeorm';
import Order from '../entities/Order';
import Customer from '@modules/customers/typeorm/entities/Customer';

interface IProduct {
  product_id: string;
  price: number;
  quantity: number;
}

interface IRequest {
  customer: Customer;
  products: IProduct[];
  address_id: string;
  order_status: string;
  payment_method: string;
}

@EntityRepository(Order)
class OrdersRepository extends Repository<Order> {
  public async findById(id: string): Promise<Order | undefined> {
    const order = this.findOne(id, {
      relations: ['order_products', 'customer'],
    });

    return order;
  }

  public async findByUserId(user_id: string): Promise<Order | undefined> {
    const order = this.find({
      where: {
        user_id,
      },
    });

    return order;
  }

  public async createOrder({ customer, products, address_id, order_status,  payment_method }: IRequest): Promise<Order> {
    const order = this.create({
      customer: customer,
      order_products: products,
      address_id: address_id,
      order_status: order_status,
      payment_method: payment_method,
    });

    await this.save(order);

    return order;
  }

}

export default OrdersRepository;
