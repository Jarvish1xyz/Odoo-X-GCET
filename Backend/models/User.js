const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  employeeId: { type: String, unique: true, required: true },

  role: {
    type: String,
    enum: ["HR", "EMPLOYEE"],
    default: "EMPLOYEE"
  },

  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },

  firstLogin: { type: Boolean, default: true },

  /* HR FILLED */
  name: String,
  phone: String,
  jobPosition: String,
  department: String,
  manager: String,
  location: String,
  dateOfJoining: Date,

  /* EMPLOYEE FILLED */
  dateOfBirth: Date,
  gender: String,
  maritalStatus: String,
  nationality: String,
  personalEmail: String,
  address: String,

  bankDetails: {
    accountNumber: String,
    bankName: String,
    ifscCode: String
  },

  panNumber: String,
  uanNumber: String,
  profileImage: String
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);
