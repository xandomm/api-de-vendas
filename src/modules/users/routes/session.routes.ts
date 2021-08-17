import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import SessionController from '../controllers/SessionController';

const SessionRoutes = Router();
const SessionController = new SessionController();

SessionRoutes.get('/', SessionController.index);

SessionRoutes.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),
  SessionController.create,
);

SessionRoutes.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  SessionController.delete,
);

export default SessionRoutes;
