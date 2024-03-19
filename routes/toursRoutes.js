const express = require('express');

const {
  deleteTour,
  createTour,
  getAllTours,
  getSingleTour,
  updateTour,
} = require('./../controllers/toursControllers.js');

const router = express.Router();

router.route('/').get(getAllTours).post(createTour);
router.route('/:id').get(getSingleTour).patch(updateTour).delete(deleteTour);

module.exports = router;
