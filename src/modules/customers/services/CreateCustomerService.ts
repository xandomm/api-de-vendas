import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Customer from '../typeorm/entities/Customer';
import CustomersRepository from '../typeorm/repositories/CustomersRepository';

interface IRequest {
  name: string;
  email: string;
  password: string;
  phone_number: string;
}

class CreateCustomerService {
  public async execute({ name, email, password, phone_number }: IRequest): Promise<Customer> {
    const customersRepository = getCustomRepository(CustomersRepository);
    const emailExists = await customersRepository.findByEmail(email);

    if (emailExists) {
      throw new AppError('Email address already used.');
    }

    const customer = customersRepository.create({
      name,
      email,
      password,
      phone_number,
    });

    await customersRepository.save(customer);

    return customer;
  }
}

export default CreateCustomerService;
