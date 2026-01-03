require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const authRoute = require('./routes/auth.route')
const hrRoute = require('./routes/hr.route')
const url = process.env.MONGOURL;
const port = process.env.PORT;

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(url).then(() => {
    console.log("Connected to DB");
}).catch((err) => {
    console.log(err);
});

app.use("/api/auth", require("./routes/auth.route"));
app.use("/api/hr", require("./routes/hr.route"));
app.use("/api/profile", require("./routes/profile.route"));
app.use("/api/attendance", require("./routes/attendance.routes"));
app.use("/api/timeoff", require("./routes/timeoff.routes"));
app.use("/api/salary", require("./routes/salary.routes"));
app.use("/api/hr", require("./routes/hr.route"));
app.use("/api/auth", require("./routes/auth.route"));




app.listen(port, () => {
    console.log(`Server is running @ ${port}`);
})
