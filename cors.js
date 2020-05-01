exports.cors = (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Header", "*");
    if (req.method === "OPTIONS") {
        res.header("Access-Control-Allow-Method", "PUT, POST, PATCH, DELETE, GET");
        return res.status(200).json({});
    }
    next();
}