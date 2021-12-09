import ProductsRouter from '@modules/products/routes/products.routes';
import ForgotPasswordRoutes from '@modules/users/routes/password.routes';
import SessionRoutes from '@modules/users/routes/session.routes';
import UserRouter from '@modules/users/routes/user.routes';
import { Router } from 'express';

const routes = Router();

routes.use('/products', ProductsRouter);
routes.use('/users', UserRouter);
routes.use('/sessions', SessionRoutes);
routes.use('/password', ForgotPasswordRoutes);

export default routes;
