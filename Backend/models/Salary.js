const mongoose = require("mongoose");

const salarySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  employeeId: String,

  basic: Number,
  hra: Number,
  allowance: Number,
  deductions: Number,

  netSalary: Number,

  month: String
}, { timestamps: true });

module.exports = mongoose.model("Salary", salarySchema);
