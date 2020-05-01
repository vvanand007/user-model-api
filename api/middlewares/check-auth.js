const jwt = require("jsonwebtoken");
const config = require("../../config.json")

module.exports = (req, res, next) => {
    try {
        const token = req.body.authorization;
        const decoded = jwt.verify(token, config.JWT_SECRET);
        req.userData = decoded;
        next();
    } catch (err) {
        res.status(500).json({ message: "Auth Failed" });
    }
}