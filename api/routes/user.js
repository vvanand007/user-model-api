const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const User = require("../models/user");


router.post("/signup", (req, res, next) => {
    if (req.body.password.length < 8) {
        return res.status(400).json({ message: "Password must be at least eight characters in length" })
    }
    User.find({ email: req.body.email })
        .exec()
        .then(user => {
            if (user.length >= 1) {
                res.status(422).json({ message: "user already exist" });
            } else {
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    if (err) {
                        return res.status(500).json({ error: err })
                    }
                    const user = new User({
                        _id: new mongoose.Types.ObjectId(),
                        name: req.body.name,
                        email: req.body.email,
                        password: hash,
                        age: req.body.age,
                        sex: req.body.sex
                    });
                    user.save()
                        .then(result => {
                            res.status(201).json({ message: "user created" });
                        })
                        .catch(err => {
                            res.status(500).json({ error: err });
                        })
                })
            }
        })
})

module.exports = router 