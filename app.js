const express = require('express');
const morgan = require('morgan');
const toursRoutes = require('./routes/toursRoutes.js');
const usersRoutes = require('./routes/usersRoutes.js');

const app = express();

app.use(express.json());
app.use(morgan('dev'));

app.use('/api/v1/tours', toursRoutes);
app.use('/api/v1/users', usersRoutes);

const port = 3000;

app.listen(port, () => console.log(`The server is running on port ${port}`));
