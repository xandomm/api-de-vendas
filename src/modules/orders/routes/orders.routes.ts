import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import OrdersController from '../controllers/OrdersController';
import isAuthenticated from '@shared/http/middlewares/isAuthenticated';

const ordersRouter = Router();
const ordersController = new OrdersController();

ordersRouter.use(isAuthenticated);

ordersRouter.get('/:id',
  /*
  #swagger.description = 'Orders show route'
  #swagger.path = '/orders'
  #swagger.parameters['Orders'] = {
	description: 'Show order by id',
    type: 'string',
    required: true,
    in: 'body',
    schema: {id: "bc455857-7280-4d61-84f9-3e4b8ed466ac",}
  }
  #swagger.responses[200] = {
	description: 'orders ids list',
  schema: {
     "id": "bc455857-7280-4d61-84f9-3e4b8ed466ac",
   },
  }
  */

  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  ordersController.show,
);

ordersRouter.post(
  '/',
  /*
  #swagger.description = 'Create order route'
  #swagger.path = '/orders'
  #swagger.parameters['Orders'] = {
	description: 'create new order',
    type: 'string',
    required: true,
    in: 'body',
    schema: {
      customer_id: "bc455857-7280-4d61-84f9-3e4b8ed466ac",
      products: [
        {
        "id":"9ced9f7a-e062-4b6a-b9a8-f594cc27b948",
        "quantity":2
        },
    ]
    }
  }

  */
  celebrate({
    [Segments.BODY]: {
      customer_id: Joi.string().uuid().required(),
      products: Joi.required(),
      order_address: Joi.required(),
      order_status: Joi.required(),
      payment_method: Joi.required(),
    },
  }),
  ordersController.create,
);

export default ordersRouter;
