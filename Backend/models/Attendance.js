const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  employeeId: String,
  date: String,
  checkIn: Date,
  checkOut: Date,
  status: {
    type: String,
    enum: ["present", "absent", "half-day", "leave"],
    default: "present"
  }
}, { timestamps: true });

module.exports = mongoose.model("Attendance", attendanceSchema);
