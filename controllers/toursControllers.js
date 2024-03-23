const Tour = require('../models/toursModel.js');

const topFiveCheap = (req, res, next) => {
  // limit=5&sort=price,avgRating,name
  req.query.limit = '5';
  req.query.sort = 'price,avgRating,name';
  req.query.fields = 'name,price,avgRating';

  next();
};

const getAllTours = async (req, res) => {
  try {
    console.log(req.query);
    // 1) Filtering query
    const queryObj = { ...req.query };
    const excludedFields = ['page', 'sort', 'limit', 'fields'];

    excludedFields.forEach((item) => delete queryObj[item]);

    // 2) Advancing filtering
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte|eq)\b/g, (m) => `$${m}`);
    queryStr = JSON.parse(queryStr);

    let query = Tour.find(queryStr);

    if (req.query.sort) {
      const sortedBy = req.query.sort.split(',').join(' ');
      query = query.sort(sortedBy);
    } else {
      query = query.sort('-createdAt');
    }

    if (req.query.fields) {
      const selectedFields = req.query.fields.split(',').join(' ');

      query = query.select(selectedFields);
    } else {
      query = query.select('-__v');
    }

    const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 1 || 5;

    const skip = (page - 1) * limit;

    if (req.query.page) {
      const numTours = await Tour.countDocuments();
      if (skip >= numTours) throw new Error('Page not exist');
    }

    query = query.skip(skip).limit(limit);

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
      message: error.message,
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
  topFiveCheap,
};
