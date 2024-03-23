const express = require('express');

const {
  deleteTour,
  createTour,
  getAllTours,
  getSingleTour,
  updateTour,
  topFiveCheap,
} = require('./../controllers/toursControllers.js');

const router = express.Router();

// router.param('id', checkValidId);
router.route('/').get(getAllTours).post(createTour);
router.route('/top-five-cheap').get(topFiveCheap, getAllTours);
router.route('/:id').get(getSingleTour).patch(updateTour).delete(deleteTour);

module.exports = router;
