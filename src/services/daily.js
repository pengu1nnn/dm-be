const Daily = require('../models/daily');

const postDaily = async (req, res, next) => {
  try {
    const { name, role, today, yesterday, issues } = req.body;
    const daily = new Daily({ name, role, today, yesterday, issues });
    await daily.save();
    return res.status(200).json({ message: 'Daily report created successfully', daily });
  } catch (error) {
    next(error);
  }
};

const getDaily = async (req, res, next) => {
  try {
    const { startDate, endDate } = req.query;
    const daily = await Daily.find({
      createdAt: {
        $gte: new Date(startDate),
        $lte: new Date(endDate)
      }
    });
    return res.status(200).json({ message: 'Daily reports fetched successfully', daily });
  } catch (error) {
    next(error);
  }
};

module.exports = { postDaily, getDaily };