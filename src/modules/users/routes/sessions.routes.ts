import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import SessionsController from '../controllers/SessionsController';

const sessionsRouter = Router();
const sessionsController = new SessionsController();

sessionsRouter.post(
  '/',
  /*
  #swagger.description = 'User Authentication'
  #swagger.path = '/sessions'
*/

/*
  #swagger.parameters['email'] = {
	description: 'User E-mail.',
    type: 'string',
    required: true,
    in: 'body',
    example: 'user@email.com',
    schema: {name: "user@email.com",}
  }

 #swagger.parameters['password'] = {
   description: 'User Password.',
   type: 'string',
   required: true,
   in: 'body',
   example: 'kdlkdlf193',
   schema: {password: "kdlkdlf193",}
  }

  #swagger.responses[200] = {
	description: 'Successfully login',
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
 "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NzQ2ODcxMTQsImV4cCI6MTY3NDc3MzUxNCwic3ViIjoiNTc1YjE4MDYtZGI1OC00ZTk3LTg5MTgtMmRkOWZiY2M2OTkwIn0.4itnQDuxUE-7vOTcYuLjbZBZzMFM0XRDW1k3u2QC88U",
    }
  }
  #swagger.responses[401] = {
   description: 'Incorrect email/password combination.'
  }


*/
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),
  sessionsController.create,

);

export default sessionsRouter;
