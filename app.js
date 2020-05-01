const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const config = require("./config.json")

const userRouter = require("./api/routes/user")

mongoose.connect(config.DB, { useNewUrlParser: true, useUnifiedTopology: true })
// .then(db => console.log("database", db.connections[0].readyState));
mongoose.Promise = global.Promise;

app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Header", "*");
    if (req.method === "OPTIONS") {
        res.header("Access-Control-Allow-Method", "PUT, POST, PATCH, DELETE, GET");
        return res.status(200).json({});
    }
    next();
});

app.use('/user', userRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => { console.log(`listening on port ${PORT}`) })

// module.exports = app;