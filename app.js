const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const config = require("./config.json");
const cors = require("cors");
const userRouter = require("./api/routes/user")

require("./db");

// mongoose.connect(config.DB, { useNewUrlParser: true, useUnifiedTopology: true })
// .then(db => console.log("database", db.connections[0].readyState));
// mongoose.Promise = global.Promise;

app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.use('/user', userRouter);

app.use('*', (req, res) => {
    res.status(500).json({ msg: "URL not found" });
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => { console.log(`listening on port ${PORT}`) })

// module.exports = app;