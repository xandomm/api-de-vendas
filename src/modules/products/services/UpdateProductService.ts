import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Product from '../typeorm/entities/Product';
import ProductRepository from '../typeorm/repositories/ProductsRepository';

interface IRequest {
  id: string;
  name: string;
  price: number;
  quantity: number;
  description: string;
}

class UpdateProductService {
  public async execute({
    id,
    name,
    price,
    quantity,
    description,
  }: IRequest): Promise<Product> {
    const productsRepository = getCustomRepository(ProductRepository);

    const product = await productsRepository.findOne(id);

    if (!product) {
      throw new AppError('Product not found.');
    }

    product.name = name;
    product.price = price;
    product.quantity = quantity;
    product.description = description;

    await productsRepository.save(product);

    return product;
  }
}

export default UpdateProductService;
