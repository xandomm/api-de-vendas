import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import CustomersController from '../controllers/CustomersController';
import isAuthenticated from '@shared/http/middlewares/isAuthenticated';

const customersRouter = Router();
const customersController = new CustomersController();

customersRouter.use(isAuthenticated);

customersRouter.get('/',
   /*
  #swagger.description = 'Show all customers route'
  #swagger.path = '/customers'
  #swagger.parameters['Customers'] = {
	description: 'Show customer by id',
    type: 'string',
    required: true,
    in: 'body',
  }

  */


customersController.index);

customersRouter.get(
  '/:id',
   /*
  #swagger.description = 'Customer show route'
  #swagger.path = '/customers'
  #swagger.parameters['Customers'] = {
	description: 'Show customer by id',
    type: 'string',
    required: true,
    in: 'body',
    schema: {id: "bc455857-7280-4d61-84f9-3e4b8ed466ac",}
  }

  */
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  customersController.show,
);

customersRouter.post(
  '/',
   /*
  #swagger.description = 'Create new customer'
  #swagger.path = '/customers'
  #swagger.parameters['Customers'] = {
	description: 'Create new customer',
    type: 'string',
    required: true,
    in: 'body',
    schema: {
      name: "teste",
      email: "teste@teste.com",
    }
  }
  */
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
    },
  }),
  customersController.create,
);

customersRouter.put(
  '/:id',
 /*
  #swagger.description = 'Update customer'
  #swagger.path = '/customers/:id'
  #swagger.parameters['Customers'] = {
	description: 'Update customer',
    type: 'string',
    required: true,
    in: 'body',
    schema: {
      name: "teste",
      email: "teste@teste.com",
    }
  }
  */

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
  /*
  #swagger.description = 'Delete customer'
  #swagger.path = '/customers'
  #swagger.parameters['Customers'] = {
	description: 'Delete customer by id',
    type: 'string',
    required: true,
    in: 'body',
    schema: {id: "bc455857-7280-4d61-84f9-3e4b8ed466ac",}
  }

  */

  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  customersController.delete,
);

export default customersRouter;
