import { Router } from 'express';
import ProductsController from '../controllers/ProductsController';
import ProductAvatarController from '../controllers/ProductAvatarController';
import uploadConfig from '@config/upload';
import { celebrate, Joi, Segments } from 'celebrate';
import multer from 'multer';
import isAuthenticated from '@shared/http/middlewares/isAuthenticated';

const productsRouter = Router();
const productsController = new ProductsController();
const productsAvatarController = new ProductAvatarController();
const upload = multer(uploadConfig.multer);
productsRouter.get(
  '/',
  /*
  #swagger.description = 'Products List'
  #swagger.path = '/Products'
  #swagger.responses[200] = {
	description: 'Show Products List',
    schema: {
        "id": "d0694213-6657-4950-bd5a-c0ff324290a2",
        "avatar": "https://quitandanaturale.com.br/wp-content/uploads/2021/07/abobora-menina.jpg",
        "name": "Abóbora Menina",
        "price": "10.00",
        "quantity": 20,
        "created_at": "2023-01-15T22:15:13.229Z",
        "updated_at": "2023-01-15T22:15:13.229Z"
    }
  }
*/

  productsController.index,
);

productsRouter.get(
  '/:id',
  /*
  #swagger.description = 'Product show'
  #swagger.path = '/Products/:id'
  #swagger.parameters['id'] = {
   description: 'Product Id',
   type: 'string',
   required: true,
   in: 'body',
   example: 'd0694213-6657-4950-bd5a-c0ff324290a',
   schema: {id: "d0694213-6657-4950-bd5a-c0ff324290a",}
  }

  #swagger.responses[200] = {
	description: 'Show Selected Product',
    schema: {
        "id": "d0694213-6657-4950-bd5a-c0ff324290a2",
        "avatar": "https://quitandanaturale.com.br/wp-content/uploads/2021/07/abobora-menina.jpg",
        "name": "Abóbora Menina",
        "price": "10.00",
        "quantity": 20,
        "created_at": "2023-01-15T22:15:13.229Z",
        "updated_at": "2023-01-15T22:15:13.229Z"
    }
  }
*/

  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  productsController.show,
);

productsRouter.post(
  '/',
  /*
  #swagger.description = 'Product Add'
  #swagger.path = '/Products/'
  #swagger.parameters['name'] = {
   description: 'Produt Name.',
   type: 'string',
   required: true,
   in: 'body',
   example: 'Abóbora',
   schema: {name: "Abóbora",}
  }

  #swagger.parameters['price'] = {
   description: 'Produt price.',
   type: 'float',
   required: true,
   in: 'body',
   example: '2.4',
   schema: {price: 2.4,}
  }

  #swagger.parameters['quantity'] = {
   description: 'Produt qauntity.',
   type: 'integer',
   required: true,
   in: 'body',
   example: '5',
   schema: {qauntity: 5,}
  }

  */
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      price: Joi.number().precision(2).required(),
      quantity: Joi.number().required(),
    },
  }),
  productsController.create,
);

productsRouter.put(
  '/:id',
  /*
  #swagger.description = 'Product Add'
  #swagger.path = '/Products/'
  #swagger.parameters['name'] = {
   description: 'Produt Name.',
   type: 'string',
   required: true,
   in: 'body',
   example: 'Abóbora',
   schema: {name: "Abóbora",}
  }

  #swagger.parameters['price'] = {
   description: 'Produt price.',
   type: 'float',
   required: true,
   in: 'body',
   example: '2.4',
   schema: {price: 2.4,}
  }

  #swagger.parameters['quantity'] = {
   description: 'Produt qauntity.',
   type: 'integer',
   required: true,
   in: 'body',
   example: '5',
   schema: {qauntity: 5,}
  }

  */
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      price: Joi.number().precision(2).required(),
      quantity: Joi.number().required(),
    },
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  productsController.update,
);

productsRouter.patch(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  isAuthenticated,
  upload.single('avatar'),
  productsAvatarController.update,
);
productsRouter.delete(
  '/:id',
  /*
  #swagger.description = 'Product Delete'
  #swagger.path = '/Products/:id'
   #swagger.parameters['id'] = {
   description: 'User id.',
   type: 'string',
   required: true,
   in: 'body',
   example: '3a3728a5-b880-47ad-ba8e-794f78c5d286',
   schema: {id: '3a3728a5-b880-47ad-ba8e-794f78c5d286',}
  }
  */
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  productsController.delete,
);

export default productsRouter;
