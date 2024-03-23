const Tour = require('../models/toursModel.js');
const APIFeatures = require('./../utils/APIFeatures.js');

const topFiveCheap = (req, res, next) => {
  // limit=5&sort=price,avgRating,name
  req.query.limit = '5';
  req.query.sort = 'price,avgRating,name';
  req.query.fields = 'name,price,avgRating';

  next();
};

const getAllTours = async (req, res) => {
  try {
    const features = new APIFeatures(Tour.find(), req.query)
      .filters()
      .sort()
      .limitFields()
      .paginate();

    const tours = await features.mongoQuery;

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

const getTourStat = async (req, res) => {
  try {
    const stats = await Tour.aggregate([
      {
        $match: {
          avgRating: {
            $gte: 4.5,
          },
        },
      },
      {
        $group: {
          _id: { $toUpper: '$difficulty' },
          avgRating: {
            $avg: '$avgRating',
          },
          numTours: {
            $sum: 1,
          },
          numAvgRatings: {
            $sum: '$ratingsQuantity',
          },
          avgPrice: {
            $avg: '$price',
          },
          minPrice: {
            $min: '$price',
          },
          maxPrice: {
            $max: '$price',
          },
        },
      },
      {
        $sort: {
          numTours: -1,
        },
      },
      // {
      //   $match: {
      //     _id: { $ne: 'EASY' },
      //   },
      // },
    ]);

    res.status(200).json({
      status: 'success',
      data: {
        stats,
      },
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
  getTourStat,
};
