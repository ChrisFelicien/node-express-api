const express = require('express');

const {
  deleteTour,
  createTour,
  getAllTours,
  getSingleTour,
  updateTour,
} = require('./../controllers/toursControllers.js');

const router = express.Router();

// router.param('id', checkValidId);

router.route('/').get(getAllTours).post(createTour);
router.route('/:id').get(getSingleTour).patch(updateTour).delete(deleteTour);

module.exports = router;
