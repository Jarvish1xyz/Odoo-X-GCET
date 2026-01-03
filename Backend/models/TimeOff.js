const mongoose = require("mongoose");

const timeOffSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  employeeId: String,

  type: {
    type: String,
    enum: ["Casual", "Sick", "Paid", "Unpaid"],
    required: true
  },

  fromDate: Date,
  toDate: Date,
  reason: String,

  status: {
    type: String,
    enum: ["Pending", "Approved", "Rejected"],
    default: "Pending"
  }
}, { timestamps: true });

module.exports = mongoose.model("TimeOff", timeOffSchema);
