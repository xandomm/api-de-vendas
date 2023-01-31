import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import isAuthenticated from '@shared/http/middlewares/isAuthenticated';
import ProfileController from '../controllers/ProfileController';

const profileRouter = Router();
const profileController = new ProfileController();

profileRouter.use(isAuthenticated);

profileRouter.get('/',
/*
#swagger.description = 'Route for show user profile.'
 #swagger.path = '/Profile'

 #swagger.responses[200] = {
	description: 'Show current user profile',
  schema: {
   "id": "575b1806-db58-4e97-8918-2dd9fbcc6990",
   "name": "teste",
   "email": "teste@gmail.com",
   "avatar": null,
   "created_at": "2022-12-06T16:40:02.641Z",
   "updated_at": "2022-12-06T16:40:02.641Z",
   "avatar_url": null
   }
  }

*/
profileController.show);


profileRouter.put(
  '/',
  /*
  #swagger.description = 'Route for user update password.'
  #swagger.path = '/Profile'
  #swagger.parameters['profile'] = {
    description: 'Update user password',
    type: 'string',
    required: true,
    in: 'body',
    schema: {
      name: "user",
      email: "user@email.com",
      old_password: "sfdfdfs223",
      password: "kdlkdlf193",
      passowrd_confirmation: "kdlkdlf193",
    }
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
