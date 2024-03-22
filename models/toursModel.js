const mongoose = require('mongoose');

const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Sorry tour must have a name'],
    unique: [true, 'This name is already used'],
  },
  price: {
    type: Number,
    required: [true, 'Sorry tour must have a price '],
  },
  rating: {
    type: Number,
    default: 4.5,
  },
});

const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;
