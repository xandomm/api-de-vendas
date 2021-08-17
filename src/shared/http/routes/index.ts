import ProductsRouter from '@modules/products/routes/products.routes';
import UserRouter from '@modules/users/routes/user.routes';
import { Router } from 'express';

const routes = Router();

routes.use('/products', ProductsRouter);
routes.use('/users', UserRouter);

export default routes;
