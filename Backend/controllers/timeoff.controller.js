const TimeOff = require("../models/TimeOff");

/* EMPLOYEE */
exports.applyLeave = async (req, res) => {
  const leave = await TimeOff.create({
    ...req.body,
    userId: req.user.id,
    employeeId: req.user.employeeId
  });

  res.json({ msg: "Leave applied", leave });
};

exports.myLeaves = async (req, res) => {
  const leaves = await TimeOff.find({ userId: req.user.id });
  res.json(leaves);
};

/* HR */
exports.allLeaves = async (req, res) => {
  const leaves = await TimeOff.find().populate("userId", "name employeeId");
  res.json(leaves);
};

exports.updateLeaveStatus = async (req, res) => {
  const leave = await TimeOff.findByIdAndUpdate(
    req.params.id,
    { status: req.body.status },
    { new: true }
  );
  res.json(leave);
};
