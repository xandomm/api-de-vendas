import { Router } from 'express';
import ProductsController from '../controllers/ProductsController';

const ProductsRouter = Router();
const productsController = new ProductsController();

ProductsRouter.get('/', productsController.index);
ProductsRouter.get('/:id', productsController.show);
ProductsRouter.post('/', productsController.create);
ProductsRouter.put('/:id', productsController.update);
ProductsRouter.delete('/:id', productsController.delete);

export default ProductsRouter;
