import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import CustomersController from '../controllers/CustomersController';
import isAuthenticated from '@shared/http/middlewares/isAuthenticated';
import isCustomerAuthenticated from '@shared/http/middlewares/isCustomerAuthenticated';
import SendOTPCustomerService from '../services/SendOTPCustomerService';

const customersRouter = Router();
const customersController = new CustomersController();
const sendOTP = new SendOTPCustomerService();
customersRouter.get('/', isAuthenticated, customersController.index);

customersRouter.get(
  '/:id',
  isAuthenticated || isCustomerAuthenticated,
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  customersController.show,
);

customersRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
      phone_number: Joi.string().required(),
    },
  }),
  customersController.create,
);
// customersRouter.get('/verify', async (req, res, next) => {
//   await sendOTP.sendOTP('+5534998269655');
//   res.send('ok');
//   next();
// });

// customersRouter.post('/verify', async (req, res, next) => {
//   const { to, code } = req.body;
//   await sendOTP.validateOTP(to, code);
//   res.send('ok');
//   next();
// });
customersRouter.put(
  '/:id',
  isCustomerAuthenticated,
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
    },
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  customersController.update,
);

customersRouter.delete(
  '/:id',
  isAuthenticated || isCustomerAuthenticated,
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  customersController.delete,
);

export default customersRouter;
