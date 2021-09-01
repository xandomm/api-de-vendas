import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import usersControllers from '../controllers/UsersControllers';
import isAuthenticated from '../../../shared/http/middlewares/isAuthenticated';
import usersAvatarControllers from '../controllers/UserAvatarController';
import multer from 'multer';
import uploadsConfig from '@config/uploads';

const UserRouter = Router();
const UsersControllers = new usersControllers();
const usersAvatarController = new usersAvatarControllers();

const uploads = multer(uploadsConfig);

UserRouter.get('/', isAuthenticated, UsersControllers.index);

UserRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),
  UsersControllers.create,
);

UserRouter.patch(
  '/avatar',
  isAuthenticated,
  uploads.single('avatar'),
  usersAvatarController.update,
);

UserRouter.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  UsersControllers.delete,
);

export default UserRouter;
