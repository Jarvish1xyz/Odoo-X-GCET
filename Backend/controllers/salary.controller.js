const Salary = require("../models/Salary");

/* HR */
exports.createSalary = async (req, res) => {
  const { basic, hra, allowance, deductions } = req.body;

  const netSalary = basic + hra + allowance - deductions;

  const salary = await Salary.create({
    ...req.body,
    netSalary
  });

  res.json(salary);
};

exports.allSalaries = async (req, res) => {
  const salaries = await Salary.find().populate("userId", "name employeeId");
  res.json(salaries);
};

/* EMPLOYEE */
exports.mySalary = async (req, res) => {
  const salary = await Salary.find({ userId: req.user.id });
  res.json(salary);
};
