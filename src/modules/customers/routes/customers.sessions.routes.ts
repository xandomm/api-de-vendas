import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import CustomersSessionsController from '../controllers/CustomersSessionsController';
import cookieParser from 'cookie-parser';
import isCustomerAuthenticated from '@shared/http/middlewares/isCustomerAuthenticated';
import SendOTPCustomerService from '../services/SendOTPCustomerService';

const customersSessionsRoute = Router();

const customersSessionsController = new CustomersSessionsController();
const sendOTP = new SendOTPCustomerService();
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
customersSessionsRoute.get('/verify', async (req, res, next) => {
  await sendOTP.sendOTP('+5534998269655');
  res.send('ok');
  next();
});

customersSessionsRoute.post('/verify', async (req, res, next) => {
  const { to, code } = req.body;
  await sendOTP.validateOTP(to, code);
  res.send('ok');
  next();
});
customersSessionsRoute.get(
  '/refresh',
  isCustomerAuthenticated,
  customersSessionsController.refresh,
);

export default customersSessionsRoute;
