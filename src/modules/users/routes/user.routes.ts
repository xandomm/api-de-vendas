import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import usersControllers from '../controllers/UsersControllers';

const UserRouter = Router();
const UsersControllers = new usersControllers();

UserRouter.get('/', UsersControllers.index);

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
