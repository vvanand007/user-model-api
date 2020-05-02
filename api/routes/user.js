const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

const checkAuth = require("../middlewares/check-auth");

const User = require("../models/user");
const config = require("../../config.json");

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

router.post("/signin", (req, res, next) => {
    User.find({ email: req.body.email })
        .exec()
        .then(user => {
            if (user.length < 1) {
                return res.status(401).json({ message: "User not registered" })
            }
            bcrypt.compare(req.body.password, user[0].password, (err, result) => {
                if (err) {
                    return res.status(401).json({ message: "Auth Failed" });
                }
                if (result) {
                    const token = jwt.sign(
                        { email: user[0].email, userid: user[0]._id },
                        config.JWT_SECRET,
                        { expiresIn: "1h" }
                    )
                    return res.status(200).json({ message: "Auth Successful", token: token })
                }
                return res.status(401).json({ message: "Password mismatch" });
            })
        })
        .catch(err => {
            res.status(400).json({ error: err });
        })
})

router.get("/", checkAuth, (req, res, next) => {
    // res.status(200).json({ data: req.userData })
    email = req.userData.email;
    User.findOne({ email })
        .exec()
        .then(user => {
            res.status(200).json({ data: user })
        })
        .catch(err => {
            res.status(500).json({ error: err })
        })
})

module.exports = router