const Attendance = require("../models/Attendance");
const User = require("../models/User");

/**
 * =========================
 * EMPLOYEE CHECK-IN
 * =========================
 */
exports.checkIn = async (req, res) => {
  try {
    const today = new Date().toISOString().slice(0, 10);

    // prevent multiple check-ins
    const existing = await Attendance.findOne({
      userId: req.user.id,
      date: today,
    });

    if (existing && existing.checkIn) {
      return res.status(400).json({
        message: "Already checked in for today",
      });
    }

    const record = await Attendance.findOneAndUpdate(
      { userId: req.user.id, date: today },
      {
        userId: req.user.id,
        employeeId: req.user.employeeId,
        date: today,
        checkIn: new Date(),
      },
      { upsert: true, new: true }
    );

    res.json(record);
  } catch (err) {
    res.status(500).json({ message: "Check-in failed", error: err.message });
  }
};

/**
 * =========================
 * EMPLOYEE CHECK-OUT
 * =========================
 */
exports.checkOut = async (req, res) => {
  try {
    const today = new Date().toISOString().slice(0, 10);

    const record = await Attendance.findOne({
      userId: req.user.id,
      date: today,
    });

    if (!record || !record.checkIn) {
      return res.status(400).json({
        message: "You must check-in before check-out",
      });
    }

    if (record.checkOut) {
      return res.status(400).json({
        message: "Already checked out for today",
      });
    }

    record.checkOut = new Date();
    await record.save();

    res.json(record);
  } catch (err) {
    res.status(500).json({ message: "Check-out failed", error: err.message });
  }
};

/**
 * =========================
 * EMPLOYEE – VIEW OWN ATTENDANCE
 * =========================
 */
exports.getMyAttendance = async (req, res) => {
  try {
    const records = await Attendance.find({
      userId: req.user.id,
    }).sort({ date: -1 });

    const result = records.map((rec) => {
      let workHours = "00:00";
      let extraHours = "00:00";
      let status = "Absent";

      if (rec.checkIn && rec.checkOut) {
        const diff =
          (new Date(rec.checkOut) - new Date(rec.checkIn)) / 1000 / 60;

        const hours = Math.floor(diff / 60);
        const minutes = Math.floor(diff % 60);

        workHours = `${hours.toString().padStart(2, "0")}:${minutes
          .toString()
          .padStart(2, "0")}`;

        status = diff >= 240 ? "Present" : "Half-day";

        if (diff > 480) {
          const extra = diff - 480;
          extraHours = `${Math.floor(extra / 60)
            .toString()
            .padStart(2, "0")}:${Math.floor(extra % 60)
            .toString()
            .padStart(2, "0")}`;
        }
      } else if (rec.status === "Leave") {
        status = "Leave";
      }

      return {
        date: new Date(rec.date).toLocaleDateString("en-US", {
          month: "short",
          day: "2-digit",
          year: "numeric",
        }),
        checkIn: rec.checkIn
          ? new Date(rec.checkIn).toLocaleTimeString()
          : "-",
        checkOut: rec.checkOut
          ? new Date(rec.checkOut).toLocaleTimeString()
          : "-",
        workHours,
        extraHours,
        status,
      };
    });

    res.json(result);
  } catch (err) {
    res.status(500).json({
      message: "Failed to fetch attendance",
      error: err.message,
    });
  }
};


/**
 * =========================
 * HR – VIEW ALL ATTENDANCE (Dashboard)
 * =========================
 */
exports.getAllAttendance = async (req, res) => {
  try {
    const date =
      req.query.date || new Date().toISOString().slice(0, 10);

    const records = await Attendance.find({ date }).populate(
      "userId",
      "name employeeId"
    );

    const result = records.map((rec) => {
      let workHours = "00:00";
      let extraHours = "00:00";
      let status = "Absent";

      if (rec.checkIn && rec.checkOut) {
        const diff =
          (new Date(rec.checkOut) - new Date(rec.checkIn)) / 1000 / 60;

        const hours = Math.floor(diff / 60);
        const minutes = Math.floor(diff % 60);

        workHours = `${hours.toString().padStart(2, "0")}:${minutes
          .toString()
          .padStart(2, "0")}`;

        status = diff >= 240 ? "Present" : "Half-day";

        if (diff > 480) {
          const extra = diff - 480;
          extraHours = `${Math.floor(extra / 60)
            .toString()
            .padStart(2, "0")}:${Math.floor(extra % 60)
            .toString()
            .padStart(2, "0")}`;
        }
      } else if (rec.status === "Leave") {
        status = "Leave";
      }

      return {
        id: rec.userId.employeeId,
        name: rec.userId.name,
        checkIn: rec.checkIn
          ? new Date(rec.checkIn).toLocaleTimeString()
          : "-",
        checkOut: rec.checkOut
          ? new Date(rec.checkOut).toLocaleTimeString()
          : "-",
        workHours,
        extraHours,
        status,
      };
    });

    res.json(result);
  } catch (err) {
    res.status(500).json({
      message: "Failed to fetch attendance data",
      error: err.message,
    });
  }
};
