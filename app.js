const express = require('express');
const toursRoutes = require('./routes/toursRoutes.js');

const app = express();

app.use(express.json());

app.use('/api/v1/tours', toursRoutes);

const port = 3000;

app.listen(port, () => console.log(`The server is running on port ${port}`));
