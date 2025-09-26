const express = require('express');
const cors = require('cors');
const app = express();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./src/swagger.json');

const routes = require('./src/routes');

app.use(cors());
app.use(express.json());
app.use(routes);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(3001, () => {
  console.log('API executando em http://localhost:3001');
  console.log('Documentação em http://localhost:3001/docs');
});