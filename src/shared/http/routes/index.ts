import { Router } from 'express';
import productsRouter from '@modules/products/routes/products.routes';
import usersRouter from '@modules/users/routes/users.routes';
import sessionsRouter from '@modules/users/routes/sessions.routes';
import passwordRouter from '@modules/users/routes/password.routes';
import profileRouter from '@modules/users/routes/profile.routes';
import customersRouter from '@modules/customers/routes/customers.routes';
import ordersRouter from '@modules/orders/routes/orders.routes';
import swaggerUi from 'swagger-ui-express';
import swaggerFile from '../../../../swagger/swagger_output.json';
import bodyParser from 'body-parser';
import addressesRouter from '@modules/address/routes/Addresses.routes';
import customersSessions from '@modules/customers/routes/customers.sessions.routes';
const routes = Router();
routes.use(bodyParser.urlencoded({ extended: false }));
routes.use('/products', productsRouter);
routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/password', passwordRouter);
routes.use('/profile', profileRouter);
routes.use('/customers', customersRouter);
routes.use('/orders', ordersRouter);
routes.use('/addresses', addressesRouter);
routes.use('/customerSessions', customersSessions);

routes.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

export default routes;
