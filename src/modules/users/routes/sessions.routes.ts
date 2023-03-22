import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import SessionsController from '../controllers/SessionsController';
import cookieParser from 'cookie-parser';
const sessionsRouter = Router();
const sessionsController = new SessionsController();
sessionsRouter.use(cookieParser());
sessionsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),
  sessionsController.create,
);

sessionsRouter.get('/refresh', sessionsController.refresh);

export default sessionsRouter;
