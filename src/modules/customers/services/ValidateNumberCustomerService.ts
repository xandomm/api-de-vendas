import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Customer from '../typeorm/entities/Customer';
import CustomersRepository from '../typeorm/repositories/CustomersRepository';
import SendOTPCustomerService from './SendOTPCustomerService';

interface IRequest {
  phone_number: string;
  verification_code: string;
}

class ValidateNumberCustomerService {
  public async execute({
    phone_number,
    verification_code,
  }: IRequest): Promise<Customer> {
    const customersRepository = getCustomRepository(CustomersRepository);

    const customer = await customersRepository.findByPhoneNumber(phone_number);

    if (!customer) {
      throw new AppError('Phone number not found');
    }

    // Create an instance of the OTP service
    const otpService = new SendOTPCustomerService();

    // Validate the OTP
    const isOTPValid = await otpService.validateOTP(
      phone_number,
      verification_code,
    );

    if (!isOTPValid) {
      throw new AppError('Invalid OTP.');
    }

    customer.phone_number = phone_number;
    customer.phone_number_verified = true;
    await customersRepository.save(customer);

    return customer;
  }
}

export default ValidateNumberCustomerService;
