import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Customer from '../typeorm/entities/Customer';
import CustomersRepository from '../typeorm/repositories/CustomersRepository';
import { sendSMS } from '@config/sms';

interface IRequest {
  name: string;
  email: string;
  password: string;
  phone_number: string;
}
function generateRandomCharacters() {
  let result = '';
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (let i = 0; i < 5; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters.charAt(randomIndex);
  }

  return result;
}

class CreateCustomerService {
  public async execute({
    name,
    email,
    password,
    phone_number,
  }: IRequest): Promise<Customer> {
    const customersRepository = getCustomRepository(CustomersRepository);
    const emailExists = await customersRepository.findByEmail(email);
    const phoneNumberExists = await customersRepository.findByPhoneNumber(
      phone_number,
    );

    if (phoneNumberExists) {
      throw new AppError('Phone number already used.');
    }

    if (emailExists) {
      throw new AppError('Email address already used.');
    }

    const phone_number_verification_code = generateRandomCharacters();

    const phone_number_verified = false;
    const customer = customersRepository.create({
      name,
      email,
      password,
      phone_number,
      phone_number_verification_code,
      phone_number_verified,
    });
    const message = `Olá ${name}, seja bem vindo ao cesta feira app! 
    \n Seu código de verificação é:  ${phone_number_verification_code}`;
    const onSentSms = await sendSMS({
      to: phone_number,
      message,
    });

    if (!onSentSms) {
      throw new AppError('Error sending sms');
    }
    await customersRepository.save(customer);

    return customer;
  }
}

export default CreateCustomerService;
