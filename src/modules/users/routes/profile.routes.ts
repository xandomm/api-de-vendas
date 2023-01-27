import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import isAuthenticated from '@shared/http/middlewares/isAuthenticated';
import ProfileController from '../controllers/ProfileController';

const profileRouter = Router();
const profileController = new ProfileController();

profileRouter.use(isAuthenticated);

profileRouter.get('/',
/*
#swagger.description = 'Route for user profiles.'
 #swagger.path = '/Profile'

*/
profileController.show);


profileRouter.put(
  '/',
  /*
 #swagger.description = 'Route for user update password.'
 #swagger.path = '/Profile'
 #swagger.parameters['name'] = {
	description: 'User name.',
    type: 'string',
    required: true,
    in: 'body',
    example: 'José da Silva',
    schema: {name: "José da Silva",}

  }

  #swagger.parameters['email'] = {
	description: 'User E-mail.',
    type: 'string',
    required: true,
    in: 'body',
    example: 'user@email.com',
    schema: {name: "user@email.com",}
  }

 #swagger.parameters['old_Password'] = {
   description: 'User old password.',
   type: 'string',
   required: true,
   in: 'body',
   example: 'kdlkdlf193',
   schema: {password: "kdlkdlf193",}
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

  #swagger.responses[401] = {
    description: 'User not found.'
  }
  #swagger.responses[402] = {
    description: 'There is already one user with this email.'
  }
  #swagger.responses[403] = {
    description: 'Old password is required.'
  }
  #swagger.responses[404] = {
    description: 'Old password does not match.'
  }

*/
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      old_password: Joi.string(),
      password: Joi.string().optional(),
      password_confirmation: Joi.string()
        .valid(Joi.ref('password'))
        .when('password', {
          is: Joi.exist(),
          then: Joi.required(),
        }),
    },
  }),
  profileController.update,
);

export default profileRouter;
