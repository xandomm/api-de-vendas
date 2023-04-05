import { Router } from 'express';
import AddressesController from '../controllers/AddressesController';
import { celebrate, Joi, Segments } from 'celebrate';
import isAuthenticated from '@shared/http/middlewares/isAuthenticated';
import cookieParser from 'cookie-parser';

const addressesRouter = Router();
const addressesController = new AddressesController();

enum address_type{
  HOME = 'home',
  WORK = 'work',
  OTHER = 'other',
}

addressesRouter.use(cookieParser());
addressesRouter.use(isAuthenticated);


addressesRouter.get('/', isAuthenticated,

addressesController.index);

addressesRouter.get(
  '/:id',
  /*
  #swagger.description = 'address show'
  #swagger.path = '/addresses/:id'
  #swagger.parameters['id'] = {
   description: 'address Id',
   type: 'string',
   required: true,
   in: 'body',
   schema: {id: "d0694213-6657-4950-bd5a-c0ff324290a",}
  }
  */

  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  addressesController.show,
);

addressesRouter.post(
  '/', isAuthenticated,
  /*
  #swagger.description = 'address Add'
  #swagger.path = '/addresses/'
  #swagger.parameters['name'] = {
   description: 'Address.',
   type: 'string',
   required: true,
   in: 'body',
   schema: {
    address: "Rua A número 300",
   }
  }
  */

  celebrate({
    [Segments.BODY]: {
      user_id: Joi.string(),
      address: Joi.string(),
      cep: Joi.string(),
      street: Joi.string(),
      number: Joi.string(),
      complement: Joi.string(),
      city: Joi.string(),
      neighborhood: Joi.string(),
      address_type: Joi.string().valid(...Object.values(address_type)),
      latitude: Joi.string(),
      longitude: Joi.string(),
    },
  }),
  addressesController.create,
);


addressesRouter.delete(
  '/:id', isAuthenticated,
  /*
  #swagger.description = 'address Delete'
  #swagger.path = '/addresses/:id'
   #swagger.parameters['id'] = {
   description: 'address Delete.',
   type: 'string',
   required: true,
   in: 'body',
      schema: {id: '3a3728a5-b880-47ad-ba8e-794f78c5d286',}
  }
  */
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  addressesController.delete,
);

export default addressesRouter;
