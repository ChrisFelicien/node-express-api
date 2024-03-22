const dotenv = require('dotenv');
dotenv.config();
const mongoose = require('mongoose');
const fs = require('fs');
const Tour = require('./models/toursModel.js');

const tours = JSON.parse(
  fs.readFileSync('./dev-data/data/tours.json', 'utf-8')
);

const DB = process.env.MONGO_URL.replace(
  /<PASSWORD>/g,
  process.env.DB_PASSWORD
);

mongoose
  .connect(DB)
  .then(() => console.log(`Connected to database`))
  .catch((err) => console.log(err.message));

Tour.create(tours)
  .then(() => console.log('Data inserted in database'))
  .catch((err) => console.log('error'));
