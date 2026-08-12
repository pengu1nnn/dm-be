const mongoose = require('mongoose');

const dailySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    role: { type: String,  required: false, trim: true },
    today: { type: String, required: true, trim: true },
    yesterday: { type: String, required: true, trim: true },
    issues: { type: String, required: false, trim: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Daily', dailySchema);