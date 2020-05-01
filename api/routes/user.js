const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

router.post("/signup", (req, res, next) => {
    res.status(200).json({ msg: "request received" })
})

module.exports = router