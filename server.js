const { config } = require('dotenv');
config();
const mongoose = require('mongoose');
const app = require('./app.js');

const DB = process.env.MONGO_URL.replace(
  /<PASSWORD>/g,
  process.env.DB_PASSWORD
);

mongoose
  .connect(DB)
  .then(() => console.log(`Connected to database`))
  .catch((err) => console.log(err.message));

const PORT = process.env.PORT || 6000;

app.listen(PORT, () => console.log(`The port is running on port ${PORT}`));
