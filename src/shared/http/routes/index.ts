import { Router } from 'express';

const routes = Router();

routes.get('/', (request, response) => {
  return response.json({ messasge: 'hello dev' });
});

export default routes;
