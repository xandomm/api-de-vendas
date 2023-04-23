import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import CustomersSessionsController from '../controllers/CustomersSessionsController';
import cookieParser from 'cookie-parser';
import isCustomerAuthenticated from '@shared/http/middlewares/isCustomerAuthenticated';

const customersSessionsRoute = Router();

const customersSessionsController = new CustomersSessionsController();

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

customersSessionsRoute.get('/refresh', isCustomerAuthenticated,
  customersSessionsController.refresh,
);

export default customersSessionsRoute;
