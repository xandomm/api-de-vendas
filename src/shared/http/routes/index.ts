import ProductsRouter from '@modules/products/routes/products.routes';
import { Router } from 'express';

const routes = Router();

routes.use('/products', ProductsRouter);

export default routes;
