const express = require('express');
const cors = require('cors');
const app = express();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../src/swagger.json');

const routes = require('../src/routes');
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(routes);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(port, () => {
  console.log('API executando em http://localhost:',port);
  console.log(`Documentação em http://localhost:${port}/docs`);
});