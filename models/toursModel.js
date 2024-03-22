const mongoose = require('mongoose');

const tourSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Sorry tour must have a name'],
      unique: [true, 'This name is already used'],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, 'Sorry tour must have a price '],
    },

    duration: {
      type: Number,
      required: [true, 'Tour must have duration'],
    },
    maxGroupSize: {
      type: Number,
      required: [true, 'Tour must have a group size'],
    },
    difficulty: {
      type: String,
      required: [true, 'A tour must have difficulty'],
    },
    ratingsQuantity: {
      type: Number,
      default: 0,
    },
    avgRating: {
      type: Number,
      default: 4.5,
    },
    priceDiscount: {
      type: Number,
    },
    summary: {
      type: String,
      trim: true,
      required: [true, 'Tour must have a description'],
    },
    description: {
      type: String,
      trim: true,
    },
    imageCover: {
      type: String,
      required: [true, 'Tour must have a cover image'],
    },
    images: {
      type: [String],
    },
    startDates: {
      type: [Date],
    },
  },
  { timestamps: true }
);

const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;
