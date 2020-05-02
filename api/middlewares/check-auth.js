const jwt = require("jsonwebtoken");
const config = require("../../config.json")

module.exports = (req, res, next) => {
    // try {
    const token = req.headers.authorization;
    //     const decoded = jwt.verify(token, config.JWT_SECRET);
    //     req.userData = decoded;
    //     next();
    // } catch (err) {
    //     res.status(403).json({ message: "Auth Failed" });
    // }
    jwt.verify(token, config.JWT_SECRET, (err, decoded) => {
        if (err)
            return res.status(403).json(({ msg: "Auth Failed" }));
        req.userData = decoded;
        next()
    })

}