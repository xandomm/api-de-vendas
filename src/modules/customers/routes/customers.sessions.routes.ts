import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import CustomersSessionsController from '../controllers/CustomersSessionsController';
import cookieParser from 'cookie-parser';
import isCustomerAuthenticated from '@shared/http/middlewares/isCustomerAuthenticated';
import CustomersPhoneVerificationController from '../controllers/CustomersPhoneVerificationController';

const customersSessionsRoute = Router();

const customersSessionsController = new CustomersSessionsController();
const customerVerifyController = new CustomersPhoneVerificationController();

customersSessionsRoute.use(cookieParser());

customersSessionsRoute.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),
  customersSessionsController.create,
);

customersSessionsRoute.post(
  '/verify',
  celebrate({
    [Segments.BODY]: {
      phone_number: Joi.string().required(),
      code: Joi.string().required(),
    },
  }),
  customerVerifyController.verify,
);
customersSessionsRoute.get(
  '/refresh',
  isCustomerAuthenticated,
  customersSessionsController.refresh,
);

export default customersSessionsRoute;
