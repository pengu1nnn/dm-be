const User = require('../models/user');

const postUser = async (req, res, next) => {
  try {
    const { name, role } = req.body;
    const user = new User({ name, role });
    await user.save();
    return res.status(200).json({ message: 'User created successfully', user });
  } catch (error) {
    next(error);
  }
};

const getUserList = async (req, res, next) => {
  try {
    const users = await User.find();
    return res.status(200).json({ message: 'Users fetched successfully', users });
  } catch (error) {
    next(error);
  }
};

module.exports = { postUser, getUserList };
