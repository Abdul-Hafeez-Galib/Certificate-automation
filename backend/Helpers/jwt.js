const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');

dotenv.config();

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    console.log(token);
    if (token == null) return res.sendStatus(401)

    jwt.verify(token, "Hisham@20", (err, user) => {
        console.log(err)

        if (err) return res.sendStatus(403)
        req.user = user
        next()
    })
}

function generateAccessToken(user) {
    return jwt.sign({user}, "Hisham@20", { expiresIn: '1h' });
}

module.exports = {
    authenticateToken,
    generateAccessToken
}