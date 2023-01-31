import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import multer from 'multer';
import uploadConfig from '@config/upload';
import UsersController from '../controllers/UsersController';
import isAuthenticated from '@shared/http/middlewares/isAuthenticated';
import UserAvatarController from '../controllers/UserAvatarController';

const usersRouter = Router();
const usersController = new UsersController();
const usersAvatarController = new UserAvatarController();

const upload = multer(uploadConfig.multer);

usersRouter.get('/',
  /*
  #swagger.description = 'Users List.'
  */

  /*
 #swagger.path = '/users'
 #swagger.responses[200] = {
	description: 'Users List',
    schema: {
      "user": {
        "id": "575b1806-db58-4e97-8918-2dd9fbcc6990",
        "name": "username",
        "email": "user@gmail.com",
        "avatar": null,
        "created_at": "2022-12-06T16:40:02.641Z",
        "updated_at": "2022-12-06T16:40:02.641Z",
        "avatar_url": null,
      },
    }
  }
*/

isAuthenticated, usersController.index);

usersRouter.post(
  '/',

  /*
  #swagger.path = '/users'
  #swagger.description = 'Users create.'
  #swagger.parameters['user'] = {
    description: 'User create',
    type: 'string',
    required: true,
    in: 'body',
    schema: {
      name: "user",
      email: "user@email.com",
      password: "kdlkdlf193",
    }
  }

 #swagger.responses[200] = {
	description: 'User Successfully Created',
    schema: {
      "user": {
        "name": "leo",
        "email": "leoneder@ymail.com",
        "id": "cb5f060f-040c-4610-85e1-44c8812adde1",
        "created_at": "2023-01-25T17:11:10.524Z",
        "updated_at": "2023-01-25T17:11:10.524Z",
        "avatar_url": null
      },
    }
  }
  #swagger.responses[401] = {
    description: 'Email address already used.'
  }


*/
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),
  usersController.create,
);

usersRouter.patch(
  '/avatar',
  /*
  #swagger.description = 'Route for avatar upload.'
*/
  isAuthenticated,
  upload.single('avatar'),
  usersAvatarController.update,
);

export default usersRouter;
