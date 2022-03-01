const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {

    try {
        const token = req.headers.authorization.replace(/\s+/g, ' ').trim().split('Bearer ')[1];
        const verify = jwt.verify(token, 'This is Check token');
        console.log(token)
        next();
    } catch (error) {
        return res.status(400).json({
            message: 'invalid Toekn'
        })
    }
}