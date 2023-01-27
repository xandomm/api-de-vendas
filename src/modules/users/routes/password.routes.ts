import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import ForgotPasswordController from '../controllers/ForgotPasswordController';
import ResetPasswordController from '../controllers/ResetPasswordController';

const passwordRouter = Router();
const forgotPasswordController = new ForgotPasswordController();
const resetPasswordController = new ResetPasswordController();

passwordRouter.post(
  '/forgot',
  /*
  #swagger.description = 'Password forgot route.'
  #swagger.path = '/password/forget'
  #swagger.parameters['email'] = {
	description: 'User E-mail.',
    type: 'string',
    required: true,
    in: 'body',
    example: 'user@email.com',
    schema: {name: "user@email.com",}
  }

  */
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
    },
  }),
  forgotPasswordController.create,
);

passwordRouter.post(
  '/reset',
  /*
  #swagger.description = 'Password reset route.'
  #swagger.path = '/password/reset'
  #swagger.parameters['token'] = {
	description: 'User token',
    type: 'string',
    required: true,
    in: 'body',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NzQ2ODcxMTQsImV4cCI6MTY3NDc3MzUxNCwic3ViIjoiNTc1YjE4MDYtZGI1OC00ZTk3LTg5MTgtMmRkOWZiY2M2OTkwIn0.4itnQDuxUE-7vOTcYuLjbZBZzMFM0XRDW1k3u2QC88U',
    schema: {token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NzQ2ODcxMTQsImV4cCI6MTY3NDc3MzUxNCwic3ViIjoiNTc1YjE4MDYtZGI1OC00ZTk3LTg5MTgtMmRkOWZiY2M2OTkwIn0.4itnQDuxUE-7vOTcYuLjbZBZzMFM0XRDW1k3u2QC88U",}
  }

  #swagger.parameters['password'] = {
   description: 'User new password.',
   type: 'string',
   required: true,
   in: 'body',
   example: 'kdlkdlf193',
   schema: {password: "kdlkdlf193",}
  }

  #swagger.parameters['password_confirmation'] = {
   description: 'User new password confirmation.',
   type: 'string',
   required: true,
   in: 'body',
   example: 'kdlkdlf193',
   schema: {password: "kdlkdlf193",}
  }
  */
  celebrate({
    [Segments.BODY]: {
      token: Joi.string().uuid().required(),
      password: Joi.string().required(),
      password_confirmation: Joi.string().required().valid(Joi.ref('password')),
    },
  }),
  resetPasswordController.create,
);

export default passwordRouter;
