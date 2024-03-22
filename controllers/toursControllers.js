const Tour = require('../models/toursModel.js');

const getAllTours = async (req, res) => {
  try {
    // 1) Filtering query
    const queryObj = { ...req.query };
    const excludedFields = ['page', 'sort', 'limit', 'fields'];

    excludedFields.forEach((item) => delete queryObj[item]);

    // 2) Advancing filtering
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte|eq)\b/g, (m) => `$${m}`);
    queryStr = JSON.parse(queryStr);

    const query = Tour.find(queryStr);

    // > : $gt, >=: $gte, =: $e, <: lt, <=: lte
    // { duration: { lt: '5' } } => { duration: { $lt: '5' } }

    // console.log(queryObj);
    // console.log(JSON.parse(JSON.stringify(queryObj).replace('lt', '$lt')));

    const tours = await query;
    res.status(200).json({
      status: 'success',
      results: tours.length,
      data: {
        tours,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: 'Fail',
      message: error,
    });
  }
};

const createTour = async (req, res) => {
  try {
    const newTours = await Tour.create(req.body);

    return res.status(201).json({
      status: 'created',
      data: {
        newTours,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: 'Fail',
      message: error,
    });
  }
};

const getSingleTour = async (req, res) => {
  try {
    const { id } = req.params;

    const tour = await Tour.findById(id);

    res.status(200).json({
      status: 'success',
      data: {
        tour,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error.message,
    });
  }
};

const updateTour = async (req, res) => {
  try {
    const { id } = req.params;

    const tour = await Tour.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    res.json({
      status: 'success',
      data: {
        tour,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error.message,
    });
  }
};

const deleteTour = async (req, res) => {
  try {
    const { id } = req.params;

    await Tour.findByIdAndDelete(id);

    res.json({
      status: 'success',
      data: null,
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error.message,
    });
  }
};

module.exports = {
  deleteTour,
  createTour,
  getAllTours,
  getSingleTour,
  updateTour,
};
