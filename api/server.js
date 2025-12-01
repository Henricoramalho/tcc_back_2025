const express = require('express');
const cors = require('cors');
const routes = require('../src/routes');

const port = process.env.PORT || 3001;
const app = express();

// Permitir requisições apenas do seu front-end
app.use(cors({
    origin: 'https://menegonlucas.github.io', // seu front-end
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));

app.use(express.json());
app.use(routes);

app.listen(port, () => {
    console.log('API respondendo em http://localhost:' + port);
});
