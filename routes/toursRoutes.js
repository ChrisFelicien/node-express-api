const express = require('express');

const {
  deleteTour,
  createTour,
  getAllTours,
  getSingleTour,
  updateTour,
  topFiveCheap,
  getTourStat,
  getMonthlyPlan,
} = require('./../controllers/toursControllers.js');

const router = express.Router();

// router.param('id', checkValidId);
router.route('/tours-stats').get(getTourStat);
router.route('/monthly-plan/:year').get(getMonthlyPlan);
router.route('/').get(getAllTours).post(createTour);
router.route('/top-five-cheap').get(topFiveCheap, getAllTours);
router.route('/:id').get(getSingleTour).patch(updateTour).delete(deleteTour);

module.exports = router;
