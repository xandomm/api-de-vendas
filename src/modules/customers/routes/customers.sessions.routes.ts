import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import CustomersSessionsController from '../controllers/CustomersSessionsController';
import cookieParser from 'cookie-parser';

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

customersSessionsRoute.get('/refresh', customersSessionsController.refresh);

export default customersSessionsRoute;
