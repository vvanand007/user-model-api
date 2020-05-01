const mongoose = require("mongoose");
const config = require("./config.json");
let isConnected;
// if (isConnected) return Promise.resolve();
mongoose.connect(config.DB, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(db => { isConnected = db.connections[0].readyState, console.log(isConnected) });

mongoose.Promise = global.Promise;