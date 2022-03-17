const jwt = require('jsonwebtoken');
const User = require('../models/user');
require('dotenv').config();

function auth(req, res, next) {
    const authHeader = req.headers.authorization || req.headers.Authorization;
    console.log('authHead', authHeader);
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) return res.sendStatus(403);

    jwt.verify(token, process.env.ACCESS_SECRET, async (err, decoded) => {
        if (err || !decoded?.id) return res.sendStatus(403);
        console.log(decoded.id);
        const user = await User.findOne({id: decoded.id})
        if (!user) return res.sendStatus(403);
        req.user = user;
        next();
    })
}

module.exports = auth;