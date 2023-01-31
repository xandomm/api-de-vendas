const swaggerAutogen = require('swagger-autogen')();

const outputFile = './swagger/swagger_output.json';
const endpointsFiles = [
  './src/modules/users/routes/users.routes.ts',
  './src/modules/customers/routes/customers.routes.ts',
  './src/modules/orders/routes/orders.routes.ts',
  './src/modules/products/routes/products.routes.ts',
  './src/modules/users/routes/password.routes.ts',
  './src/modules/users/routes/profile.routes.ts',
  './src/modules/users/routes/sessions.routes.ts',
];

swaggerAutogen(outputFile, endpointsFiles);