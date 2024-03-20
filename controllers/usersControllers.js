const getAllUsers = (req, res, next) => {
  res.status(200).json({
    status: 'success',
    message: 'All users',
  });
};
const createUser = (req, res, next) => {
  const user = req.body;
  res.status(200).json({
    status: 'success',
    message: 'Create a user',
  });
};
const getSingleUser = (req, res, next) => {
  const { id } = req.params;
  res.status(200).json({
    status: 'success',
    message: 'Single user',
  });
};
const updateUser = (req, res, next) => {
  const { id } = req.params;

  res.status(200).json({
    status: 'success',
    message: 'Update user',
  });
};
const deleteUser = (req, res, next) => {
  const { id } = req.params;

  res.status(200).json({
    status: 'success',
    message: 'Delete user',
  });
};

module.exports = {
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
  getSingleUser,
};
