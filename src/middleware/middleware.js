const jwt = require('jsonwebtoken');
const auth = async function(req, res, next) {
    try {
        let bearer = req.header.authorization;
        if (typeof bearer == "undefined") {
            return res.status(400).send({ status: false, message: "Token is required" });
        }

        let bearerToken = bearer.split(' ');
        let token = bearerToken[1];
        let decodeToken = jwt.verify(token, 'Dharam-digital-task');

        if (!decodeToken) {
            return res.status(400).send({ status: false, msg: "Invalid Token" });
        }

        if (decodeToken) {
            req.userId = decodedToken.userId
            next();
        } else {
            return res.status(400).send({ status: false, message: 'Invalid token' });
        }

    } catch (error) {
        console.log(error)
        return res.status(500).send({ status: false, message: error.message })
    }

}