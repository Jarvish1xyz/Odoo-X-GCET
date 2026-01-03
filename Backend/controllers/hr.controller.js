const User = require("../models/User");
const bcrypt = require("bcrypt");
const { genId, genPass } = require("../utils/generator");
const sendEmail = require("../utils/sendEmail");

exports.createEmployee = async (req, res) => {
  const password = genPass();
  const hashed = await bcrypt.hash(password, 10);

  const user = await User.create({
    ...req.body,
    employeeId: genId(),
    password: hashed,
    role: "employee"
  });

  await sendEmail(user.email, password);

  res.json({ msg: "Employee created", employeeId: user.employeeId });
};

exports.getAllEmployees = async (req, res) => {
  try {
    const employees = await User.find({ role: "Employee" })
      .select("employeeId name designation email phone status");

    const formatted = employees.map(emp => ({
      id: emp.employeeId,
      name: emp.name,
      role: emp.designation,
      email: emp.email,
      phone: emp.phone,
      status: emp.status || "Active"
    }));

    res.json(formatted);
  } catch (err) {
    res.status(500).json({
      message: "Failed to fetch employees",
      error: err.message
    });
  }
};