import { Router } from 'express';
import ProductsController from '../controllers/ProductsController';
import { celebrate, Joi, Segments } from 'celebrate';
import isAuthenticated from '@shared/http/middlewares/isAuthenticated';
import cookieParser from 'cookie-parser';
import isCustomerAuthenticated from '@shared/http/middlewares/isCustomerAuthenticated';
import ProductAvatarController from '../controllers/ProductAvatarController';
import multer from 'multer';
import uploadConfig from '@config/upload';

const productsRouter = Router();
const productsController = new ProductsController();
const productsAvatarController = new ProductAvatarController();
productsRouter.use(cookieParser());
//productsRouter.use(isAuthenticated);
const upload = multer(uploadConfig.multer);
productsRouter.get('/', productsController.index);

productsRouter.get(
  '/:id',
  isAuthenticated || isCustomerAuthenticated,
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  productsController.show,
);

productsRouter.post(
  '/',
  isAuthenticated,
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
  isAuthenticated,
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      price: Joi.number().precision(2).required(),
      quantity: Joi.number().required(),
      description: Joi.string(),
    },
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  productsController.update,
);

productsRouter.delete(
  '/:id',
  isAuthenticated,
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  productsController.delete,
);
productsRouter.patch(
  '/avatar/:id',
  isAuthenticated,
  upload.single('avatar'),
  productsAvatarController.update,
);
export default productsRouter;
