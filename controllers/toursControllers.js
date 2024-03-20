const fs = require('fs');

const path = `${__dirname}/../dev-data/data/tours-simple.json`;

const tours = JSON.parse(fs.readFileSync(path, 'utf-8'));

const checkValidId = (req, res, next, val) => {
  if (val > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: `No tour with id equal to ${val}`,
    });
  }

  next();
};

const checkBodyRequest = (req, res, next) => {
  const { name, price } = req.body;

  if (!name || !price) {
    return res.status(400).json({
      status: 'fail',
      message: 'Please provide all required values',
    });
  }

  next();
};

const getAllTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours,
    },
  });
};

const createTour = (req, res) => {
  const tour = req.body;

  const newId = tours.at(-1).id + 1;

  res.status(201).json({
    status: 'created',
    data: {
      tour,
    },
  });
};

const getSingleTour = (req, res) => {
  const { id } = req.params;

  const tour = tours.find((tour) => tour.id === id * 1);

  res.status(200).json({
    status: 'success',
    data: {
      tour,
    },
  });
};

const updateTour = (req, res) => {
  const { id } = req.params;

  const tour = tours.find((tour) => tour.id === id * 1);

  res.json({
    status: 'success',
    message: `Tour with id ${id} is updated`,
  });
};

const deleteTour = (req, res) => {
  const { id } = req.params;

  const tour = tours.find((tour) => tour.id === id * 1);

  res.json({
    status: 'success',
    message: `The tour with id ${id} is deleted`,
  });
};

module.exports = {
  deleteTour,
  createTour,
  getAllTours,
  getSingleTour,
  updateTour,
  checkValidId,
  checkBodyRequest,
};
