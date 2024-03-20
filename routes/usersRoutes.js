const express = require('express');
const {
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
  getSingleUser,
} = require('./../controllers/usersControllers.js');

const router = express.Router();

router.route('/').get(getAllUsers).post(createUser);
router.route('/:id').get(getSingleUser).patch(updateUser).delete(deleteUser);

module.exports = router;
